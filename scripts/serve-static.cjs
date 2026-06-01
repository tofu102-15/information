const http = require('http');
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const port = Number(process.env.PORT || 5173);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.md': 'text/plain; charset=utf-8',
};

http
  .createServer((req, res) => {
    let pathname = decodeURIComponent(req.url.split('?')[0]);
    if (pathname === '/') pathname = '/index.html';
    let file = path.normalize(path.join(root, pathname));

    if (!file.toLowerCase().startsWith(root.toLowerCase())) {
      res.writeHead(403);
      res.end('forbidden');
      return;
    }

    const sendFile = (targetFile) => fs.readFile(targetFile, (error, body) => {
      if (error) {
        const publicFile = path.normalize(path.join(root, 'public', pathname));
        if (targetFile === file && publicFile.toLowerCase().startsWith(root.toLowerCase())) {
          sendFile(publicFile);
          return;
        }
        res.writeHead(404);
        res.end('not found');
        return;
      }

      res.writeHead(200, {
        'Content-Type': types[path.extname(targetFile)] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      res.end(body);
    });

    sendFile(file);
  })
  .listen(port, '127.0.0.1', () => {
    console.log(`Preview server: http://127.0.0.1:${port}/`);
  });
