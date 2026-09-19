const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.primary-nav');

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  const srOnly = menuButton.querySelector('.sr-only');
  if (srOnly) srOnly.textContent = '메뉴 열기';
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(willOpen));
    navigation.classList.toggle('is-open', willOpen);
    const srOnly = menuButton.querySelector('.sr-only');
    if (srOnly) srOnly.textContent = willOpen ? '메뉴 닫기' : '메뉴 열기';
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1180) closeMenu();
  });
}

// Language selector
const headerInner = document.querySelector('.header-inner');

if (headerInner && !headerInner.querySelector('.language-switcher')) {
  const languages = [
    ['en', 'us', 'English'], ['ja', 'jp', '日本語'], ['zh-CN', 'cn', '简体中文'],
    ['zh-TW', 'tw', '繁體中文'], ['de', 'de', 'Deutsch'], ['fr', 'fr', 'français'],
    ['it', 'it', 'italiano'], ['es', 'es', 'español'], ['pt', 'br', 'Português'],
    ['nl', 'nl', 'Nederlands'], ['pl', 'pl', 'polski'], ['ru', 'ru', 'Русский'],
    ['vi', 'vn', 'Tiếng Việt'], ['id', 'id', 'Bahasa Indonesia'], ['tr', 'tr', 'Türkçe'],
    ['th', 'th', 'ไทย']
  ];

  const flagSvg = (countryCode) => {
    const flags = {
      kr: '<rect width="30" height="20" fill="#fff"/><path d="M15 5.6a4.4 4.4 0 0 1 0 8.8 2.2 2.2 0 0 0 0-4.4 2.2 2.2 0 0 1 0-4.4Z" fill="#c60c30"/><path d="M15 14.4a4.4 4.4 0 0 1 0-8.8 2.2 2.2 0 0 0 0 4.4 2.2 2.2 0 0 1 0 4.4Z" fill="#003478"/><g fill="#111"><rect x="4" y="4" width="5" height="1" transform="rotate(-34 4 4)"/><rect x="4.7" y="5.4" width="5" height="1" transform="rotate(-34 4.7 5.4)"/><rect x="21" y="14.5" width="5" height="1" transform="rotate(-34 21 14.5)"/><rect x="20.3" y="13.1" width="5" height="1" transform="rotate(-34 20.3 13.1)"/><rect x="21" y="4" width="5" height="1" transform="rotate(34 21 4)"/><rect x="20.3" y="5.4" width="5" height="1" transform="rotate(34 20.3 5.4)"/><rect x="4" y="14.5" width="5" height="1" transform="rotate(34 4 14.5)"/><rect x="4.7" y="13.1" width="5" height="1" transform="rotate(34 4.7 13.1)"/></g>',
      us: '<rect width="30" height="20" fill="#fff"/><g fill="#b22234"><rect width="30" height="1.55"/><rect width="30" height="1.55" y="3.08"/><rect width="30" height="1.55" y="6.16"/><rect width="30" height="1.55" y="9.24"/><rect width="30" height="1.55" y="12.32"/><rect width="30" height="1.55" y="15.4"/><rect width="30" height="1.55" y="18.45"/></g><rect width="13" height="10.8" fill="#3c3b6e"/><g fill="#fff"><circle cx="2" cy="2" r=".6"/><circle cx="5" cy="2" r=".6"/><circle cx="8" cy="2" r=".6"/><circle cx="11" cy="2" r=".6"/><circle cx="3.5" cy="4.3" r=".6"/><circle cx="6.5" cy="4.3" r=".6"/><circle cx="9.5" cy="4.3" r=".6"/><circle cx="2" cy="6.6" r=".6"/><circle cx="5" cy="6.6" r=".6"/><circle cx="8" cy="6.6" r=".6"/><circle cx="11" cy="6.6" r=".6"/></g>',
      jp: '<rect width="30" height="20" fill="#fff"/><circle cx="15" cy="10" r="5.2" fill="#bc002d"/>',
      cn: '<rect width="30" height="20" fill="#de2910"/><path d="m5 3 .7 2.1h2.2L6.1 6.4l.7 2.1L5 7.2 3.2 8.5l.7-2.1-1.8-1.3h2.2Z" fill="#ffde00"/><circle cx="10" cy="3.3" r=".7" fill="#ffde00"/><circle cx="11.6" cy="5.4" r=".7" fill="#ffde00"/><circle cx="11.2" cy="8" r=".7" fill="#ffde00"/><circle cx="9.1" cy="9.6" r=".7" fill="#ffde00"/>',
      tw: '<rect width="30" height="20" fill="#fe0000"/><rect width="15" height="10" fill="#000095"/><circle cx="7.5" cy="5" r="3.2" fill="#fff"/>',
      de: '<rect width="30" height="6.67" fill="#000"/><rect width="30" height="6.67" y="6.67" fill="#dd0000"/><rect width="30" height="6.66" y="13.34" fill="#ffce00"/>',
      fr: '<rect width="10" height="20" fill="#0055a4"/><rect width="10" height="20" x="10" fill="#fff"/><rect width="10" height="20" x="20" fill="#ef4135"/>',
      it: '<rect width="10" height="20" fill="#009246"/><rect width="10" height="20" x="10" fill="#fff"/><rect width="10" height="20" x="20" fill="#ce2b37"/>',
      es: '<rect width="30" height="5" fill="#aa151b"/><rect width="30" height="10" y="5" fill="#f1bf00"/><rect width="30" height="5" y="15" fill="#aa151b"/>',
      br: '<rect width="30" height="20" fill="#009c3b"/><path d="M15 2.8 27 10 15 17.2 3 10Z" fill="#ffdf00"/><circle cx="15" cy="10" r="4.8" fill="#002776"/>',
      nl: '<rect width="30" height="6.67" fill="#ae1c28"/><rect width="30" height="6.67" y="6.67" fill="#fff"/><rect width="30" height="6.66" y="13.34" fill="#21468b"/>',
      pl: '<rect width="30" height="10" fill="#fff"/><rect width="30" height="10" y="10" fill="#dc143c"/>',
      ru: '<rect width="30" height="6.67" fill="#fff"/><rect width="30" height="6.67" y="6.67" fill="#0039a6"/><rect width="30" height="6.66" y="13.34" fill="#d52b1e"/>',
      vn: '<rect width="30" height="20" fill="#da251d"/><path d="m15 4.5 1.3 4h4.2l-3.4 2.5 1.3 4-3.4-2.5-3.4 2.5 1.3-4-3.4-2.5h4.2Z" fill="#ff0"/>',
      id: '<rect width="30" height="10" fill="#ce1126"/><rect width="30" height="10" y="10" fill="#fff"/>',
      tr: '<rect width="30" height="20" fill="#e30a17"/><circle cx="12" cy="10" r="5" fill="#fff"/><circle cx="13.8" cy="10" r="4" fill="#e30a17"/><path d="m18.4 7.3.8 2.2 2.3.1-1.8 1.4.6 2.3-1.9-1.3-1.9 1.3.6-2.3-1.8-1.4 2.3-.1Z" fill="#fff"/>',
      th: '<rect width="30" height="3.3" fill="#a51931"/><rect width="30" height="3.3" y="3.3" fill="#fff"/><rect width="30" height="6.8" y="6.6" fill="#2d2a4a"/><rect width="30" height="3.3" y="13.4" fill="#fff"/><rect width="30" height="3.3" y="16.7" fill="#a51931"/>'
    };
    return `<svg class="language-flag" viewBox="0 0 30 20" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${flags[countryCode] || ''}</svg>`;
  };

  const languageSwitcher = document.createElement('div');
  languageSwitcher.className = 'language-switcher';
  languageSwitcher.innerHTML = `
    <button class="language-button" type="button" aria-expanded="false" aria-haspopup="true" aria-label="언어 선택">
      ${flagSvg('kr')}<span class="language-caret" aria-hidden="true">▾</span>
    </button>
    <div class="language-menu" role="menu" aria-label="언어 선택 메뉴" hidden></div>`;

  const languageMenu = languageSwitcher.querySelector('.language-menu');
  const languageButton = languageSwitcher.querySelector('.language-button');

  languages.forEach(([code, countryCode, label]) => {
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'language-option';
    option.setAttribute('role', 'menuitem');
    option.setAttribute('lang', code);
    option.innerHTML = `${flagSvg(countryCode)}<span>${label}</span>`;
    option.addEventListener('click', () => {
      languageMenu.hidden = true;
      languageButton.setAttribute('aria-expanded', 'false');
      const translateUrl = `https://translate.google.com/translate?sl=ko&tl=${encodeURIComponent(code)}&u=${encodeURIComponent(window.location.href)}`;
      window.open(translateUrl, '_blank', 'noopener,noreferrer');
    });
    languageMenu.appendChild(option);
  });

  languageButton.addEventListener('click', (event) => {
    event.stopPropagation();
    const willOpen = languageMenu.hidden;
    languageMenu.hidden = !willOpen;
    languageButton.setAttribute('aria-expanded', String(willOpen));
  });

  document.addEventListener('click', (event) => {
    if (!languageSwitcher.contains(event.target)) {
      languageMenu.hidden = true;
      languageButton.setAttribute('aria-expanded', 'false');
    }
  });

  headerInner.appendChild(languageSwitcher);
}

// 3-page hero slider
const heroBanner = document.querySelector('.hero-banner');

if (heroBanner && !heroBanner.querySelector('.hero-slider-viewport')) {
  const originalNodes = Array.from(heroBanner.children);
  const viewport = document.createElement('div');
  viewport.className = 'hero-slider-viewport';
  const track = document.createElement('div');
  track.className = 'hero-slider-track';

  const mainSlide = document.createElement('section');
  mainSlide.className = 'hero-slide hero-slide-main';
  mainSlide.setAttribute('aria-label', '강력한 기능의 무료 소프트웨어');
  originalNodes.forEach((node) => mainSlide.appendChild(node));

  const licenseSlide = document.createElement('section');
  licenseSlide.className = 'hero-slide hero-slide-license';
  licenseSlide.setAttribute('aria-label', '라이선스 프리웨어');
  licenseSlide.innerHTML = `
    <div class="hero-copy hero-copy-special">
      <span class="eyebrow eyebrow-light">KINGTOOLS LICENSE</span>
      <h1>라이선스:<br />프리웨어</h1>
      <p class="hero-special-desc">개인 · 기업 · 학교 · 기관 누구나 무료입니다.<br />어떠한 라이선스 비용도 요구하지 않습니다.</p>
      <div class="hero-special-points">
        <span>개인 무료</span><span>기업 무료</span><span>학교·기관 무료</span>
      </div>
    </div>
    <div class="hero-feature-visual hero-license-visual" aria-hidden="true">
      <div class="feature-orbit feature-orbit-license"></div>
      <div class="feature-icon-card feature-icon-license">
        <svg viewBox="0 0 64 64" fill="none"><path d="M32 9v40M18 18h28M15 18 7 34h16L15 18Zm34 0-8 16h16L49 18Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 34c1 7 13 7 14 0M42 34c1 7 13 7 14 0M21 52h22" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>
      </div>
      <div class="feature-floating feature-floating-a">FREE</div>
      <div class="feature-floating feature-floating-b">0₩</div>
      <div class="feature-caption"><strong>FREEWARE</strong><span>누구나 자유롭게</span></div>
    </div>`;

  const cleanSlide = document.createElement('section');
  cleanSlide.className = 'hero-slide hero-slide-clean';
  cleanSlide.setAttribute('aria-label', '100% 클린 설치');
  cleanSlide.innerHTML = `
    <div class="hero-copy hero-copy-special">
      <span class="eyebrow eyebrow-light">KINGTOOLS PROMISE</span>
      <h1>100%<br />클린 설치</h1>
      <p class="hero-special-desc">킹툴즈 모든 프로그램은 타사 제휴 소프트웨어를<br />끼워 설치하지 않습니다.</p>
      <div class="hero-special-points hero-clean-points">
        <span>✓ 제휴 설치 없음</span><span>✓ 광고 없음</span><span>✓ 개인정보 수집 없음</span>
      </div>
    </div>
    <div class="hero-feature-visual hero-clean-visual" aria-hidden="true">
      <div class="feature-orbit feature-orbit-clean"></div>
      <div class="feature-icon-card feature-icon-clean">
        <svg viewBox="0 0 64 64" fill="none"><path d="M32 7 11 15v15c0 13 8 24 21 29 13-5 21-16 21-29V15L32 7Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/><path d="m22 32 7 7 14-16" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="feature-floating feature-floating-a clean-chip">NO BUNDLE</div>
      <div class="feature-floating feature-floating-b clean-chip">NO ADS</div>
      <div class="feature-caption"><strong>100% CLEAN</strong><span>안심하고 설치</span></div>
    </div>`;

  track.append(mainSlide, licenseSlide, cleanSlide);
  viewport.appendChild(track);
  heroBanner.appendChild(viewport);

  const controls = document.createElement('div');
  controls.className = 'hero-slider-controls';
  controls.innerHTML = `
    <button class="hero-slider-prev" type="button" aria-label="이전 배너">‹</button>
    <span class="hero-slider-count"><b>1</b><em>/</em>3</span>
    <button class="hero-slider-next" type="button" aria-label="다음 배너">›</button>
    <button class="hero-slider-pause" type="button" aria-label="자동 넘김 일시정지">Ⅱ</button>`;
  heroBanner.appendChild(controls);

  const prevButton = controls.querySelector('.hero-slider-prev');
  const nextButton = controls.querySelector('.hero-slider-next');
  const pauseButton = controls.querySelector('.hero-slider-pause');
  const countCurrent = controls.querySelector('.hero-slider-count b');
  let currentSlide = 0;
  let isPaused = false;
  let autoTimer = null;
  let pointerStartX = null;

  function showSlide(index) {
    currentSlide = (index + 3) % 3;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    countCurrent.textContent = String(currentSlide + 1);
  }

  function restartAuto() {
    window.clearInterval(autoTimer);
    if (!isPaused) autoTimer = window.setInterval(() => showSlide(currentSlide + 1), 6500);
  }

  prevButton.addEventListener('click', () => { showSlide(currentSlide - 1); restartAuto(); });
  nextButton.addEventListener('click', () => { showSlide(currentSlide + 1); restartAuto(); });
  pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? '▶' : 'Ⅱ';
    pauseButton.setAttribute('aria-label', isPaused ? '자동 넘김 재생' : '자동 넘김 일시정지');
    restartAuto();
  });

  viewport.addEventListener('pointerdown', (event) => { pointerStartX = event.clientX; });
  viewport.addEventListener('pointerup', (event) => {
    if (pointerStartX === null) return;
    const delta = event.clientX - pointerStartX;
    pointerStartX = null;
    if (Math.abs(delta) > 45) {
      showSlide(delta < 0 ? currentSlide + 1 : currentSlide - 1);
      restartAuto();
    }
  });
  viewport.addEventListener('pointercancel', () => { pointerStartX = null; });

  showSlide(0);
  restartAuto();
}

const enhancementStyles = document.createElement('style');
enhancementStyles.textContent = `
  .language-switcher{position:relative;flex:0 0 auto;margin-left:-28px;z-index:1000}.language-button{width:52px;height:40px;display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:0 8px;border:1px solid #e1e5ea;border-radius:9px;background:#fff;color:#344054;cursor:pointer}.language-button:hover{background:#f8fafc}.language-flag{width:22px;height:15px;display:block;flex:0 0 22px;border-radius:1px;box-shadow:0 0 0 1px rgba(16,24,40,.08)}.language-caret{font-size:11px;color:#667085}.language-menu{position:absolute;top:calc(100% + 6px);right:0;width:186px;max-height:525px;overflow-y:auto;padding:7px 0;border:1px solid #dfe3e8;border-radius:7px;background:#fff;box-shadow:0 8px 24px rgba(15,23,42,.12)}.language-menu[hidden]{display:none}.language-option{width:100%;height:32px;display:flex;align-items:center;gap:10px;padding:0 14px;border:0;background:transparent;color:#263044;text-align:left;white-space:nowrap;cursor:pointer;font:inherit;font-size:14px}.language-option:hover{background:#f5f7fa}

  .hero-banner{display:block!important;padding:0!important;position:relative!important;overflow:hidden!important}.hero-banner::after{pointer-events:none;z-index:0}.hero-slider-viewport{position:relative;z-index:1;width:100%;overflow:hidden;border-radius:inherit;touch-action:pan-y}.hero-slider-track{display:flex;width:100%;transition:transform .55s cubic-bezier(.22,.8,.24,1);will-change:transform}.hero-slide{flex:0 0 100%;min-width:100%;min-height:508px;display:grid;grid-template-columns:1.05fr .95fr;align-items:center;gap:14px;padding:clamp(48px,5.4vw,76px);position:relative;overflow:hidden}.hero-slide-main{background:radial-gradient(circle at 83% 21%,rgba(96,165,250,.52),transparent 26%),linear-gradient(135deg,#0b3fd1 0%,#155eef 56%,#1743c2 100%)}.hero-slide-license{background:radial-gradient(circle at 83% 20%,rgba(255,255,255,.22),transparent 24%),linear-gradient(135deg,#d97706 0%,#f59e0b 46%,#b45309 100%)}.hero-slide-clean{background:radial-gradient(circle at 83% 20%,rgba(167,243,208,.32),transparent 26%),linear-gradient(135deg,#047857 0%,#059669 48%,#065f46 100%)}
  .hero-copy-special{max-width:580px;z-index:2}.hero-copy-special h1{font-size:clamp(52px,5vw,76px)!important;line-height:1.05!important;letter-spacing:-.055em!important}.hero-special-desc{margin:26px 0 0!important;color:rgba(255,255,255,.94)!important;font-size:19px!important;line-height:1.65!important}.hero-special-points{display:flex;flex-wrap:wrap;gap:12px;margin-top:34px}.hero-special-points span{display:inline-flex;align-items:center;min-height:44px;padding:9px 16px;border:1px solid rgba(255,255,255,.28);border-radius:999px;background:rgba(255,255,255,.12);box-shadow:inset 0 1px rgba(255,255,255,.12),0 10px 24px rgba(0,0,0,.08);color:#fff;font-size:14px;font-weight:800;backdrop-filter:blur(8px)}
  .hero-feature-visual{position:relative;min-height:390px;align-self:center}.feature-orbit{position:absolute;width:330px;height:330px;right:14px;top:18px;border-radius:50%;box-shadow:inset -30px -24px 58px rgba(0,0,0,.14),0 34px 62px rgba(0,0,0,.17)}.feature-orbit-license{background:linear-gradient(145deg,rgba(255,255,255,.94),rgba(254,215,170,.32))}.feature-orbit-clean{background:linear-gradient(145deg,rgba(255,255,255,.96),rgba(167,243,208,.3))}.feature-icon-card{position:absolute;z-index:2;width:172px;height:172px;right:86px;top:92px;display:grid;place-items:center;border-radius:42px;background:#fff;box-shadow:0 28px 52px rgba(0,0,0,.19);transform:rotate(5deg)}.feature-icon-card svg{width:88px;height:88px}.feature-icon-license{color:#d97706}.feature-icon-clean{color:#059669;transform:rotate(-5deg)}.feature-floating{position:absolute;z-index:3;display:flex;align-items:center;justify-content:center;min-width:108px;height:46px;padding:0 16px;border-radius:999px;background:rgba(255,255,255,.96);box-shadow:0 16px 28px rgba(0,0,0,.16);font-size:14px;font-weight:900;letter-spacing:.02em}.feature-floating-a{left:8px;top:88px}.feature-floating-b{right:0;bottom:84px}.hero-license-visual .feature-floating{color:#b45309}.hero-clean-visual .feature-floating{color:#047857}.feature-caption{position:absolute;right:62px;bottom:2px;z-index:3;display:grid;text-align:center;color:#fff}.feature-caption strong{font-size:30px;line-height:1.05;letter-spacing:-.02em}.feature-caption span{margin-top:7px;color:rgba(255,255,255,.82);font-size:14px}
  .hero-slider-controls{position:absolute;z-index:8;right:24px;bottom:22px;height:52px;display:inline-flex;align-items:center;gap:6px;padding:6px 9px;border-radius:999px;background:rgba(7,26,61,.82);box-shadow:0 16px 32px rgba(0,0,0,.2);backdrop-filter:blur(10px)}.hero-slider-controls button{width:36px;height:36px;display:grid;place-items:center;padding:0;border:0;border-radius:50%;color:#fff;background:transparent;cursor:pointer;font-size:22px;line-height:1}.hero-slider-controls button:hover{background:rgba(255,255,255,.14)}.hero-slider-count{min-width:56px;text-align:center;color:rgba(255,255,255,.7);font-size:14px;font-weight:700}.hero-slider-count b{color:#fff;font-size:15px}.hero-slider-count em{padding:0 5px;font-style:normal}.hero-slider-pause{font-size:12px!important}

  @media (min-width:1181px){body{zoom:.8}.hero{padding-top:36px}.site-header{position:sticky}}
  @media (max-width:1180px){.language-switcher{margin-left:-28px}.hero-slide{min-height:470px}.hero-feature-visual{min-height:340px}}
  @media (max-width:760px){.hero-slide{min-height:650px;grid-template-columns:1fr;align-content:space-between;padding:34px 28px}.hero-copy-special h1{font-size:clamp(46px,12vw,60px)!important}.hero-special-desc{font-size:16px!important}.hero-special-points{margin-top:24px;gap:8px}.hero-special-points span{min-height:38px;padding:7px 12px;font-size:12px}.hero-feature-visual{width:min(100%,340px);min-height:280px;justify-self:center}.feature-orbit{width:220px;height:220px;right:24px;top:26px}.feature-icon-card{width:126px;height:126px;right:70px;top:68px;border-radius:30px}.feature-icon-card svg{width:64px;height:64px}.feature-floating{min-width:86px;height:38px;padding:0 12px;font-size:11px}.feature-floating-a{left:8px;top:46px}.feature-floating-b{right:0;bottom:50px}.feature-caption{right:42px;bottom:-2px}.feature-caption strong{font-size:22px}.hero-slider-controls{right:14px;bottom:14px;height:46px}.hero-slider-controls button{width:32px;height:32px;font-size:20px}.hero-slider-count{min-width:48px;font-size:12px}}
`;
document.head.appendChild(enhancementStyles);
