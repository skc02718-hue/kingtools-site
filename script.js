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
    ['en', 'us', 'English'],
    ['ja', 'jp', '日本語'],
    ['zh-CN', 'cn', '简体中文'],
    ['zh-TW', 'tw', '繁體中文'],
    ['de', 'de', 'Deutsch'],
    ['fr', 'fr', 'français'],
    ['it', 'it', 'italiano'],
    ['es', 'es', 'español'],
    ['pt', 'br', 'Português'],
    ['nl', 'nl', 'Nederlands'],
    ['pl', 'pl', 'polski'],
    ['ru', 'ru', 'Русский'],
    ['vi', 'vn', 'Tiếng Việt'],
    ['id', 'id', 'Bahasa Indonesia'],
    ['tr', 'tr', 'Türkçe'],
    ['th', 'th', 'ไทย'],
  ];

  const flagImg = (countryCode, alt = '') => `
    <img
      class="language-flag"
      src="https://flagcdn.com/w40/${countryCode}.png"
      srcset="https://flagcdn.com/w80/${countryCode}.png 2x"
      width="22"
      alt="${alt}"
      loading="lazy"
    />
  `;

  const languageSwitcher = document.createElement('div');
  languageSwitcher.className = 'language-switcher';
  languageSwitcher.innerHTML = `
    <button class="language-button" type="button" aria-expanded="false" aria-haspopup="true" aria-label="언어 선택">
      ${flagImg('kr', '대한민국')}
      <span class="language-caret" aria-hidden="true">▾</span>
    </button>
    <div class="language-menu" role="menu" aria-label="언어 선택 메뉴" hidden></div>
  `;

  const languageMenu = languageSwitcher.querySelector('.language-menu');
  const languageButton = languageSwitcher.querySelector('.language-button');

  languages.forEach(([code, countryCode, label]) => {
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'language-option';
    option.setAttribute('role', 'menuitem');
    option.setAttribute('lang', code);
    option.innerHTML = `${flagImg(countryCode, '')}<span>${label}</span>`;

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
      padding: 0 8px;
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

    .language-flag {
      width: 22px;
      height: 15px;
      display: block;
      flex: 0 0 22px;
      object-fit: cover;
      border-radius: 1px;
      box-shadow: 0 0 0 1px rgba(16, 24, 40, 0.06);
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
