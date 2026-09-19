const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.primary-nav');

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  menuButton.querySelector('.sr-only').textContent = '메뉴 열기';
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(willOpen));
    navigation.classList.toggle('is-open', willOpen);
    menuButton.querySelector('.sr-only').textContent = willOpen ? '메뉴 닫기' : '메뉴 열기';
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

if (headerInner) {
  const languages = [
    ['ko', '🇰🇷', '한국어'],
    ['en', '🇺🇸', 'English'],
    ['ja', '🇯🇵', '日本語'],
    ['zh-CN', '🇨🇳', '简体中文'],
    ['zh-TW', '🇹🇼', '繁體中文'],
    ['de', '🇩🇪', 'Deutsch'],
    ['fr', '🇫🇷', 'français'],
    ['it', '🇮🇹', 'italiano'],
    ['es', '🇪🇸', 'español'],
    ['pt', '🇧🇷', 'Português'],
    ['nl', '🇳🇱', 'Nederlands'],
    ['pl', '🇵🇱', 'polski'],
    ['ru', '🇷🇺', 'Русский'],
    ['vi', '🇻🇳', 'Tiếng Việt'],
    ['id', '🇮🇩', 'Bahasa Indonesia'],
    ['tr', '🇹🇷', 'Türkçe'],
    ['th', '🇹🇭', 'ไทย'],
  ];

  const languageSwitcher = document.createElement('div');
  languageSwitcher.className = 'language-switcher';
  languageSwitcher.innerHTML = `
    <button class="language-button" type="button" aria-expanded="false" aria-haspopup="true" aria-label="언어 선택">
      <span class="language-current-flag" aria-hidden="true">🇰🇷</span>
      <span class="language-caret" aria-hidden="true">▾</span>
    </button>
    <div class="language-menu" role="menu" aria-label="언어 선택 메뉴" hidden></div>
  `;

  const languageMenu = languageSwitcher.querySelector('.language-menu');
  const languageButton = languageSwitcher.querySelector('.language-button');

  languages.forEach(([code, flag, label]) => {
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'language-option';
    option.setAttribute('role', 'menuitem');
    option.innerHTML = `<span class="language-flag" aria-hidden="true">${flag}</span><span>${label}</span>`;

    option.addEventListener('click', () => {
      languageMenu.hidden = true;
      languageButton.setAttribute('aria-expanded', 'false');

      if (code === 'ko') return;

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

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      languageMenu.hidden = true;
      languageButton.setAttribute('aria-expanded', 'false');
    }
  });

  headerInner.appendChild(languageSwitcher);

  const languageStyles = document.createElement('style');
  languageStyles.textContent = `
    .language-switcher {
      position: relative;
      flex: 0 0 auto;
      margin-left: -28px;
      z-index: 1000;
    }

    .language-button {
      width: 52px;
      height: 40px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 0 9px;
      border: 1px solid #e1e5ea;
      border-radius: 9px;
      background: #fff;
      color: #344054;
      box-shadow: 0 1px 2px rgba(16, 24, 40, 0.03);
      cursor: pointer;
      font: inherit;
    }

    .language-button:hover,
    .language-button:focus-visible {
      background: #f8fafc;
      border-color: #d0d5dd;
    }

    .language-current-flag,
    .language-flag {
      font-size: 18px;
      line-height: 1;
      flex: 0 0 auto;
    }

    .language-caret {
      font-size: 11px;
      color: #667085;
      transform: translateY(-1px);
    }

    .language-menu {
      position: absolute;
      top: calc(100% + 6px);
      right: 0;
      width: 186px;
      max-height: 525px;
      overflow-y: auto;
      padding: 7px 0;
      border: 1px solid #dfe3e8;
      border-radius: 7px;
      background: #fff;
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);
    }

    .language-menu[hidden] {
      display: none;
    }

    .language-option {
      width: 100%;
      height: 32px;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0 14px;
      border: 0;
      background: transparent;
      color: #263044;
      text-align: left;
      white-space: nowrap;
      cursor: pointer;
      font: inherit;
      font-size: 14px;
      font-weight: 400;
    }

    .language-option:hover,
    .language-option:focus-visible {
      background: #f5f7fa;
      outline: none;
    }

    @media (max-width: 1180px) {
      .language-switcher {
        margin-left: -28px;
        margin-right: 0;
      }

      .language-menu {
        right: 0;
        max-height: min(525px, calc(100vh - 90px));
      }
    }

    @media (max-width: 520px) {
      .language-button {
        width: 48px;
        height: 40px;
      }

      .language-menu {
        width: 184px;
      }
    }
  `;

  document.head.appendChild(languageStyles);
}
