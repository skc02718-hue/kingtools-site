// Final page-frame adjustments based on the approved full-page reference.
(() => {
  const hero = document.querySelector('.hero');
  const popularCard = document.querySelector('.popular-card');
  const newsCard = document.querySelector('.news-card');
  const newsSection = document.querySelector('.news-section');
  const quickSection = document.querySelector('.program-quick-section');

  if (hero && newsCard) {
    newsCard.classList.add('hero-news-card');
    if (popularCard && popularCard.parentElement === hero) {
      popularCard.replaceWith(newsCard);
    } else if (!hero.contains(newsCard)) {
      hero.appendChild(newsCard);
    }
  }

  if (quickSection) quickSection.remove();
  if (newsSection) newsSection.remove();
})();
