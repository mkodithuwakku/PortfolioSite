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

const sectionLinks = new Map(
  [...document.querySelectorAll('.site-header nav a[href^="#"]')].map((link) => [
    link.getAttribute('href').slice(1),
    link,
  ])
);

if ('IntersectionObserver' in window && sectionLinks.size) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        sectionLinks.forEach((link) => link.removeAttribute('aria-current'));
        sectionLinks.get(entry.target.id)?.setAttribute('aria-current', 'true');
      });
    },
    { rootMargin: '-28% 0px -58% 0px' }
  );

  sectionLinks.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
  });
}
