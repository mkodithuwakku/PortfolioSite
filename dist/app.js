const carousel = document.querySelector('[data-project-carousel]');

if (carousel) {
  const track = carousel.querySelector('[data-project-track]');
  const cards = [...track.querySelectorAll('.project-card')];
  const previousButton = carousel.querySelector('[data-project-previous]');
  const nextButton = carousel.querySelector('[data-project-next]');
  const counter = carousel.querySelector('[data-project-counter]');
  const dots = [...carousel.querySelectorAll('[data-project-index]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let currentIndex = 0;
  let frame;

  function updateControls(index) {
    currentIndex = Math.max(0, Math.min(cards.length - 1, index));
    counter.value = `${currentIndex + 1} / ${cards.length}`;
    counter.textContent = counter.value;
    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === cards.length - 1;

    dots.forEach((dot, dotIndex) => {
      if (dotIndex === currentIndex) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }

  function goToProject(index) {
    const nextIndex = Math.max(0, Math.min(cards.length - 1, index));
    track.scrollTo({
      left: cards[nextIndex].offsetLeft - track.offsetLeft,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
    updateControls(nextIndex);
  }

  previousButton.addEventListener('click', () => goToProject(currentIndex - 1));
  nextButton.addEventListener('click', () => goToProject(currentIndex + 1));
  dots.forEach((dot) => dot.addEventListener('click', () => goToProject(Number(dot.dataset.projectIndex))));

  track.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToProject(currentIndex - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToProject(currentIndex + 1);
    }
  });

  track.addEventListener('scroll', () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const closestIndex = cards.reduce((closest, card, index) => {
        const distance = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft);
        const closestDistance = Math.abs(cards[closest].offsetLeft - track.offsetLeft - track.scrollLeft);
        return distance < closestDistance ? index : closest;
      }, 0);
      updateControls(closestIndex);
    });
  }, { passive: true });

  updateControls(0);
}
