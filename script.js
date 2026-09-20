/* =========================================================
   KINGTOOLS script.js
   기능 동작만 이 파일에서 수정합니다.
   디자인은 styles.css / 문구와 구조는 index.html에서 수정합니다.
   ========================================================= */

/* =========================================================
   01. 모바일 메뉴
   햄버거 메뉴 열기 / 닫기 / ESC / 화면 크기 변경 처리
   ========================================================= */
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

/* =========================================================
   02. 언어 선택
   오른쪽 국기 버튼 / 언어 목록 / Google 번역 링크
   ========================================================= */
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

  /* 각 나라 국기 SVG */
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

  /* 언어 선택 버튼 만들기 */
  const languageSwitcher = document.createElement('div');
  languageSwitcher.className = 'language-switcher';
  languageSwitcher.innerHTML = `
    <button class="language-button" type="button" aria-expanded="false" aria-haspopup="true" aria-label="언어 선택">
      ${flagSvg('kr')}<span class="language-caret" aria-hidden="true">▾</span>
    </button>
    <div class="language-menu" role="menu" aria-label="언어 선택 메뉴" hidden></div>`;

  const languageMenu = languageSwitcher.querySelector('.language-menu');
  const languageButton = languageSwitcher.querySelector('.language-button');

  /* 언어 목록 만들기 */
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

  /* 국기 버튼 클릭 시 언어 목록 열기/닫기 */
  languageButton.addEventListener('click', (event) => {
    event.stopPropagation();
    const willOpen = languageMenu.hidden;
    languageMenu.hidden = !willOpen;
    languageButton.setAttribute('aria-expanded', String(willOpen));
  });

  /* 메뉴 바깥을 누르면 언어 목록 닫기 */
  document.addEventListener('click', (event) => {
    if (!languageSwitcher.contains(event.target)) {
      languageMenu.hidden = true;
      languageButton.setAttribute('aria-expanded', 'false');
    }
  });

  headerInner.appendChild(languageSwitcher);
}

/* =========================================================
   03. HERO 3페이지 슬라이더 동작
   1번 메인 / 2번 라이선스 / 3번 클린 설치
   문구 = index.html
   디자인 = styles.css
   움직임 = 여기 script.js
   ========================================================= */
const track = document.querySelector('.hero-slider-track');
const viewport = document.querySelector('.hero-slider-viewport');
const prevButton = document.querySelector('.hero-slider-prev');
const nextButton = document.querySelector('.hero-slider-next');
const pauseButton = document.querySelector('.hero-slider-pause');
const countCurrent = document.querySelector('.hero-slider-count b');
const slides = Array.from(document.querySelectorAll('.hero-slide'));

if (track && viewport && prevButton && nextButton && pauseButton && countCurrent && slides.length) {
  let currentSlide = 0;
  let isPaused = false;
  let autoTimer = null;
  let pointerStartX = null;

  /* 원하는 슬라이드 번호로 이동 */
  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    countCurrent.textContent = String(currentSlide + 1);
  }

  /* ★ 자동으로 넘어가는 시간 ★
     6500 = 6.5초 / 10000 = 10초 */
  function restartAuto() {
    window.clearInterval(autoTimer);
    if (!isPaused) autoTimer = window.setInterval(() => showSlide(currentSlide + 1), 6500);
  }

  /* 이전 버튼 */
  prevButton.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    restartAuto();
  });

  /* 다음 버튼 */
  nextButton.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    restartAuto();
  });

  /* 일시정지 / 다시 재생 버튼 */
  pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? '▶' : 'Ⅱ';
    pauseButton.setAttribute('aria-label', isPaused ? '자동 넘김 재생' : '자동 넘김 일시정지');
    restartAuto();
  });

  /* 마우스/손가락으로 좌우 밀기 시작 */
  viewport.addEventListener('pointerdown', (event) => {
    pointerStartX = event.clientX;
  });

  /* 좌우로 45px 이상 밀면 이전/다음 슬라이드로 이동 */
  viewport.addEventListener('pointerup', (event) => {
    if (pointerStartX === null) return;
    const delta = event.clientX - pointerStartX;
    pointerStartX = null;
    if (Math.abs(delta) > 45) {
      showSlide(delta < 0 ? currentSlide + 1 : currentSlide - 1);
      restartAuto();
    }
  });

  viewport.addEventListener('pointercancel', () => {
    pointerStartX = null;
  });

  /* 처음에는 1번 슬라이드에서 시작 */
  showSlide(0);
  restartAuto();
}
