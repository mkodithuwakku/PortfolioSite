const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

const projectLinks = new Map(
  [...document.querySelectorAll('.project-register a[href^="#"]')].map((link) => [
    link.getAttribute('href').slice(1),
    link,
  ])
);

if ('IntersectionObserver' in window && projectLinks.size) {
  const projectObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        projectLinks.forEach((link) => link.removeAttribute('aria-current'));
        projectLinks.get(entry.target.id)?.setAttribute('aria-current', 'true');
      });
    },
    { rootMargin: '-28% 0px -58% 0px' }
  );

  projectLinks.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) projectObserver.observe(section);
  });
}
