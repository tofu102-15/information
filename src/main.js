import { siteData } from './data/site-data.js';

const externalAttrs = 'target="_blank" rel="noopener noreferrer"';

const linkButton = (href, label, variant = 'secondary') => `
  <a class="button button--${variant}" href="${href}" ${href.startsWith('http') ? externalAttrs : ''}>${label}</a>
`;

const cardLink = (href, label) => `
  <a class="card-link" href="${href}" ${externalAttrs} aria-label="${label}を新しいタブで開く">
    詳しく見る
    <span aria-hidden="true">↗</span>
  </a>
`;

const renderHeroImage = (small = false) => {
  if (!small) {
    return `
      <div class="character-wrap" aria-label="とうふ□と猫のキャラクター">
        <img
          class="hero-cat"
          src="${siteData.catImage}"
          alt=""
          width="800"
          height="800"
          aria-hidden="true"
          onerror="this.hidden=true; this.parentElement.querySelector('.character-placeholder').hidden=false;"
        />
        <img
          class="hero-tofu"
          src="${siteData.tofuImage}"
          alt="とうふ□と猫のキャラクター"
          width="800"
          height="800"
          onerror="this.hidden=true; this.parentElement.querySelector('.character-placeholder').hidden=false;"
        />
        <div class="character-placeholder" hidden>
          <span>キャラクター画像差し替え予定</span>
        </div>
      </div>
    `;
  }

  return `
  <div class="small-character">
    <img
      src="${siteData.iconImage}"
      alt="とうふ□と猫のキャラクター"
      width="2000"
      height="2000"
      onerror="this.hidden=true; this.nextElementSibling.hidden=false;"
    />
    <div class="character-placeholder" hidden>
      <span>キャラクター画像差し替え予定</span>
    </div>
  </div>
`;
};

const app = document.querySelector('#app');

app.innerHTML = `
  <header class="site-header">
    <a class="brand" href="#" aria-label="${siteData.siteTitle} トップへ">
      <img src="/images/header-sign.svg" alt="${siteData.siteTitle}" width="520" height="112" />
    </a>
    <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-nav">メニュー</button>
    <nav class="site-nav" id="site-nav" aria-label="ページ内ナビゲーション">
      <a href="#knowledge-library">ノウハウ図書館</a>
      <a href="#skill-market">スキルマーケットOnline</a>
      <a href="#events">オフ会</a>
      <a href="#about">とうふ□について</a>
    </nav>
  </header>

  <main id="main">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__visual">
        <div class="shop-scene" aria-label="とうふ□の小さなのれん">
          <div class="noren" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <b class="noren-label">とうふ□</b>
          </div>
          ${renderHeroImage()}
          <p class="speech">いらっしゃいませ♪</p>
        </div>
      </div>
      <div class="hero__content">
        <p class="eyebrow">リベシティで活動中</p>
        <h1 id="hero-title">${siteData.siteTitle}</h1>
        <p class="hero-copy"><span>ようこそ、小さな案内所へ。</span></p>
        <p class="hero-text">リベで書いた記事、出品しているサービス、開催予定のオフ会など、とうふ□の活動をまとめてご案内しています。</p>
        <p class="hero-text">気になるものがあれば、ゆっくりのぞいてみてください。</p>
        <div class="button-row">
          ${linkButton('#knowledge-library', 'ノウハウ図書館を見る', 'primary')}
          ${linkButton('#skill-market', 'スキルマーケットOnlineを見る')}
          ${linkButton('#events', 'オフ会を見る')}
        </div>
      </div>
    </section>

    <section class="section" id="knowledge-library" aria-labelledby="knowledge-title">
      <div class="section-heading">
        <p class="section-label">店先のおすすめ</p>
        <h2 id="knowledge-title">ノウハウ図書館</h2>
        <p>まず読んでいただきやすい記事を、3つだけ置いています。</p>
        <p class="section-note">※記事の続きの閲覧には、リベシティへのログインが必要な場合があります。</p>
      </div>
      <div class="card-grid">
        ${siteData.knowledgeArticles
          .map(
            (article) => `
              <article class="info-card ${article.isFeatured ? 'info-card--featured' : ''}">
                <div class="card-topline">
                  <span class="tag">${article.label}</span>
                </div>
                <h3>${article.title}</h3>
                <a class="thumb-link" href="${article.url}" ${externalAttrs} aria-label="${article.title}を画像から開く">
                  <img class="article-thumb" src="${article.thumbnail}" alt="" width="1280" height="670" loading="lazy" />
                </a>
                <p>${article.description}</p>
                ${cardLink(article.url, article.title)}
              </article>
            `,
          )
          .join('')}
      </div>
    </section>

    <section class="section section--tint" id="skill-market" aria-labelledby="skill-title">
      <div class="section-inner">
        <div class="section-heading">
          <p class="section-label">できることの案内札</p>
          <h2 id="skill-title">スキルマーケットOnline</h2>
          <p>とうふ□がリベシティ内で案内しているサービスです。</p>
          <p class="section-note">※商品ページの閲覧には、リベシティへのログインが必要な場合があります。</p>
        </div>
        <div class="card-grid card-grid--two">
          ${siteData.skillServices
            .map(
              (service) => `
                <article class="info-card">
                  <div class="card-topline">
                  <span class="tag tag--wood">${service.guideLabel}</span>
                </div>
                <h3>${service.title}</h3>
                <a class="thumb-link" href="${service.url}" ${externalAttrs} aria-label="${service.title}を画像から開く">
                  <img class="service-thumb" src="${service.thumbnail}" alt="" width="660" height="440" loading="lazy" />
                </a>
                <p>${service.description}</p>
                ${cardLink(service.url, service.title)}
              </article>
              `,
            )
            .join('')}
        </div>
      </div>
    </section>

    <section class="section" id="events" aria-labelledby="events-title">
      <div class="section-heading">
        <p class="section-label">交流イベント</p>
        <h2 id="events-title">オフ会</h2>
        <p>リベシティ内での交流イベントの案内です。</p>
      </div>
      <article class="event-card">
        <div class="event-card__body">
          <span class="status">${siteData.event.status}</span>
          <p class="event-date">${siteData.event.date}</p>
          <p class="event-countdown" data-event-date="2026-10-02T20:00:00">2026年10月2日まで あと--日 --時間 --分 --秒</p>
          <h3>${siteData.event.title}</h3>
          <p>${siteData.event.description}</p>
          ${linkButton(siteData.event.url, 'イベント案内を見る', 'primary')}
        </div>
        <a class="thumb-link thumb-link--event" href="${siteData.event.url}" ${externalAttrs} aria-label="${siteData.event.title}を画像から開く">
          <img class="event-thumb" src="${siteData.event.thumbnail}" alt="10/2「とうふ⬜️の日」イベントの案内画像" width="1004" height="591" loading="lazy" />
        </a>
      </article>
    </section>

    <section class="section section--about" id="about" aria-labelledby="about-title">
      <div class="about-panel">
        <div>
          <p class="section-label">この案内所について</p>
          <h2 id="about-title">とうふ□について</h2>
          <p>詳しいプロフィールや最新の活動は、リベシティ内プロフィールにまとめています。</p>
          <p>気になった方は、リベ内でのぞいていただけたらうれしいです。</p>
          <div class="button-row">
            ${linkButton(siteData.profileUrl, 'とうふ□のプロフィールを見る', 'primary')}
          </div>
        </div>
        ${renderHeroImage(true)}
      </div>
    </section>

    <section class="closing" aria-labelledby="closing-title">
      <p class="section-label">またのぞいてください</p>
      <h2 id="closing-title">気になる入口から、ゆっくりどうぞ。</h2>
      <div class="button-row button-row--center">
        ${linkButton(siteData.profileUrl, 'とうふ□のプロフィールを見る', 'primary')}
        ${linkButton(siteData.knowledgeCreatorUrl, 'ノウハウ図書館を見る')}
        ${linkButton(siteData.skillSellerUrl, 'スキルマーケットOnlineを見る')}
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>© ${siteData.siteTitle}</p>
    <p>${siteData.disclaimerText}</p>
    <p>${siteData.loginNoticeText}</p>
  </footer>
`;

const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('.site-nav');
const speech = document.querySelector('.speech');
const eventCountdown = document.querySelector('.event-countdown');
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];

const speechMessages = [
  'いらっしゃいませ♪',
  'ゆっくりしていってね♪',
  '気になる入口からどうぞ',
  '記事もサービスもご案内中です',
  'とうふ□の活動をのぞいてみてね',
];

if (speech && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let speechIndex = 0;

  window.setInterval(() => {
    speechIndex = (speechIndex + 1) % speechMessages.length;
    speech.classList.add('is-changing');

    window.setTimeout(() => {
      speech.textContent = speechMessages[speechIndex];
      speech.classList.remove('is-changing');
    }, 260);
  }, 9000);
}

if (eventCountdown) {
  const targetDate = new Date(eventCountdown.dataset.eventDate);

  const updateEventCountdown = () => {
    const remaining = targetDate - new Date();

    eventCountdown.classList.remove('is-today', 'is-finished');

    if (remaining > 0) {
      const days = Math.floor(remaining / 86400000);
      const hours = Math.floor((remaining % 86400000) / 3600000);
      const minutes = Math.floor((remaining % 3600000) / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);

      eventCountdown.textContent = `2026年10月2日まで あと${days}日 ${hours}時間 ${minutes}分 ${seconds}秒`;
    } else {
      const now = new Date();
      const isEventDay =
        now.getFullYear() === targetDate.getFullYear() &&
        now.getMonth() === targetDate.getMonth() &&
        now.getDate() === targetDate.getDate();

      eventCountdown.textContent = isEventDay ? '本日開催です' : '開催終了しました';
      eventCountdown.classList.add(isEventDay ? 'is-today' : 'is-finished');
    }
  };

  updateEventCountdown();
  window.setInterval(updateEventCountdown, 1000);
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  siteNav.classList.toggle('is-open', !isOpen);
});

siteNav.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    menuButton.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('is-open');
  }
});

const sectionIds = navLinks.map((link) => link.getAttribute('href')).filter(Boolean);
const sections = sectionIds
  .map((id) => document.querySelector(id))
  .filter(Boolean);

const setActiveNav = (id) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('is-active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

if (sections.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleEntries[0]) {
        setActiveNav(visibleEntries[0].target.id);
      }
    },
    {
      rootMargin: '-24% 0px -58% 0px',
      threshold: [0.1, 0.25, 0.45, 0.65],
    },
  );

  sections.forEach((section) => navObserver.observe(section));
}
