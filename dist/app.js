const progressBar = document.querySelector('.scroll-progress span');

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
}

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const filterButtons = [...document.querySelectorAll('.filter')];
const projects = [...document.querySelectorAll('.project')];

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;

    filterButtons.forEach((candidate) => {
      const isSelected = candidate === button;
      candidate.classList.toggle('is-active', isSelected);
      candidate.setAttribute('aria-pressed', String(isSelected));
    });

    projects.forEach((project) => {
      const categories = project.dataset.categories.split(' ');
      project.classList.toggle('is-filtered', selected !== 'all' && !categories.includes(selected));
    });
  });
});
