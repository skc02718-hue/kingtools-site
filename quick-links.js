(() => {
  const hero = document.querySelector('.hero');
  if (!hero || document.querySelector('.program-quick-section')) return;

  const items = [
    {
      id: 'kingcapture',
      name: '킹캡처',
      sub: '캡처 · 녹화',
      tone: 'blue',
      badge: 'NEW',
      icon: '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="12" y="16" width="40" height="32" rx="9"/><path d="M22 16l4-6h12l4 6M24 32h16M32 24v16"/></svg>'
    },
    {
      id: 'kingplayer',
      name: '킹플레이어',
      sub: '영상 · 음악',
      tone: 'violet',
      icon: '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="22"/><path d="M27 22l16 10-16 10z"/></svg>'
    },
    {
      id: 'kingzip',
      name: '킹집',
      sub: '압축 · 해제',
      tone: 'mint',
      icon: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M18 10h28l8 10v34H10V20z"/><path d="M27 10v12h10V10M27 31h10M27 40h10"/></svg>'
    },
    {
      id: 'kingview',
      name: '킹뷰',
      sub: '이미지 보기',
      tone: 'cyan',
      icon: '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="10" y="13" width="44" height="38" rx="8"/><circle cx="23" cy="25" r="4"/><path d="M15 44l12-12 8 8 6-6 8 10"/></svg>'
    },
    {
      id: 'kingmemo',
      name: '킹메모',
      sub: '빠른 메모',
      tone: 'yellow',
      icon: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M16 9h32v46H16z"/><path d="M24 22h16M24 32h16M24 42h10"/></svg>'
    },
    {
      id: 'kingcam',
      name: '킹캠',
      sub: '화면 · 게임 녹화',
      tone: 'rose',
      badge: 'NEW',
      icon: '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="10" y="15" width="34" height="34" rx="9"/><path d="M44 26l10-6v24l-10-6z"/><circle cx="27" cy="32" r="8"/></svg>'
    },
    {
      id: 'kingcut',
      name: '킹컷',
      sub: '영상 자르기',
      tone: 'indigo',
      icon: '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="18" cy="20" r="8"/><circle cx="18" cy="44" r="8"/><path d="M24 25l30 19M24 39l30-19"/></svg>'
    },
    {
      id: 'kingpdf',
      name: '킹PDF',
      sub: 'PDF 도구',
      tone: 'red',
      badge: 'SOON',
      icon: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M18 8h22l10 10v38H18z"/><path d="M40 8v12h12M24 32h20M24 42h15"/></svg>'
    }
  ];

  const section = document.createElement('section');
  section.className = 'program-quick-section';
  section.setAttribute('aria-labelledby', 'program-quick-title');

  section.innerHTML = `
    <div class="section-shell program-quick-inner">
      <div class="program-quick-heading">
        <div>
          <span class="program-quick-kicker">KINGTOOLS AT A GLANCE</span>
          <h2 id="program-quick-title">한눈에 보는 킹툴즈</h2>
        </div>
        <p>원하는 프로그램을 바로 선택하세요.</p>
      </div>
      <div class="program-quick-grid">
        ${items.map((item, index) => `
          <a class="program-quick-card ${index === 0 ? 'is-featured' : ''}" href="#${item.id}" aria-label="${item.name} 바로가기">
            ${item.badge ? `<span class="program-quick-badge">${item.badge}</span>` : ''}
            <span class="program-quick-icon tone-${item.tone}">${item.icon}</span>
            <span class="program-quick-name">${item.name}</span>
            <span class="program-quick-sub">${item.sub}</span>
            ${index === 0 ? '<span class="program-quick-go">바로 보기 <i>→</i></span>' : ''}
          </a>
        `).join('')}
      </div>
    </div>`;

  hero.insertAdjacentElement('afterend', section);
})();
