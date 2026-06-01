# とうふ□のリベ活動案内所

リベシティ会員「とうふ□」の個人活動案内ページです。ノウハウ図書館の記事、スキルマーケットOnlineの商品、オフ会・交流イベント、リベシティ内プロフィールへの入口をまとめています。

このサイトはリベシティ公式サイトではありません。

## ローカル確認

```bash
npm install
npm run dev
```

ビルド確認:

```bash
npm run build
npm run preview
```

## 画像の差し替え

キャラクター画像は `public/images/tofu-cat-hero.png` に配置します。背景透過PNGで、とうふ□と猫が一緒にいるユーザー提供素材を使用してください。本番公開前にこの画像が配置されている必要があります。

将来的なOGP画像は `public/images/ogp.png` に配置できます。配置後、`index.html` に `og:image` と `twitter:image` を追加してください。

## 掲載情報の更新

記事、サービス、イベント、プロフィールURLは `src/data/site-data.js` にまとめています。

- 記事を追加する場合は `knowledgeArticles` に項目を追加します。
- サービス説明文は `skillServices` の `description` を修正します。
- イベントを開催済みにする場合は `event.status` を変更します。
- リンクは指定URLを確認したうえで、各 `url` を修正します。

表記ルールとして、サイト名と運営者名は `とうふ□`、イベント名のみ `10/2「とうふ⬜️の日」イベント` を使用します。原記事タイトル内の `とうふ` は変更しないでください。

## Cloudflare Pages

公開時の想定設定:

```text
Build command: npm run build
Build output directory: dist
```

公開方式は、Cloudflare PagesのGit連携またはDirect Uploadのどちらにするかを公開前に選択してください。継続更新する場合はGit連携も検討できますが、この制作作業では本番公開、GitHubへのpush、Cloudflare設定変更、DNS設定は行っていません。

## 公開前チェックリスト

- `public/images/tofu-cat-hero.png` が配置済み
- OGP画像 `public/images/ogp.png` を用意するか判断済み
- リンク切れがない
- `とうふ□` と `10/2「とうふ⬜️の日」イベント` の表記揺れがない
- スマホ表示を確認済み
- 非公式表記とログイン案内が表示されている
- 本名、顔写真、勤務先、他会員情報、公式素材が入っていない
- 検索エンジンへ表示させるか判断済み
- Cloudflare Pagesの公開方式を決定済み
