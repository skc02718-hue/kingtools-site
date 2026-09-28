/* =========================================================
   KINGTOOLS script.js
   공통 인터랙션 / HERO 슬라이더 / 상품 상세 연결
   ========================================================= */

/* =========================================================
   01. 킹플레이어 상세 페이지 연결
   메인 메뉴와 프로그램 카드의 #kingplayer 링크를 전용 페이지로 이동
   ========================================================= */
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href="#kingplayer"]');
  if (!link) return;

  const isKingPlayerNav = link.closest('.primary-nav');
  const isKingPlayerCard = link.closest('#kingplayer');
  if (!isKingPlayerNav && !isKingPlayerCard) return;

  event.preventDefault();
  window.location.href = './kingplayer.html';
});

/* =========================================================
   02. 모바일 메뉴
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
   04. HERO 3페이지 슬라이더
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

  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    countCurrent.textContent = String(currentSlide + 1);
  }

  function restartAuto() {
    window.clearInterval(autoTimer);
    if (!isPaused) autoTimer = window.setInterval(() => showSlide(currentSlide + 1), 6500);
  }

  prevButton.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    restartAuto();
  });

  nextButton.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    restartAuto();
  });

  pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? '▶' : 'Ⅱ';
    pauseButton.setAttribute('aria-label', isPaused ? '자동 넘김 재생' : '자동 넘김 일시정지');
    restartAuto();
  });

  viewport.addEventListener('pointerdown', (event) => {
    pointerStartX = event.clientX;
  });

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

  showSlide(0);
  restartAuto();
}
