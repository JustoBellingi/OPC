// OPC — comportamiento compartido de todas las páginas
document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Menú móvil
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  // Único momento de entrada orquestado para el hero
  const hero = document.querySelector('.hero');
  if (hero && !prefersReducedMotion) {
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(10px)';
    hero.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
      });
    });
  }

  // Sombra en el header al hacer scroll
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Aparición sutil de las secciones al llegar al viewport
  const revealTargets = document.querySelectorAll('main section:not(.hero)');
  if (revealTargets.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
    revealTargets.forEach(el => el.classList.add('reveal'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  // Formulario de contacto: arma el mensaje y lo envía por WhatsApp
  const waForm = document.getElementById('whatsapp-form');
  if (waForm) {
    const waStatus = document.getElementById('whatsapp-form-status');
    waForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!waForm.checkValidity()) {
        waForm.reportValidity();
        return;
      }

      const nombre = waForm.nombre.value.trim();
      const telefono = waForm.telefono.value.trim();
      const email = waForm.email.value.trim();
      const consulta = waForm.consulta.value.trim();

      const mensaje =
        `Hola OPC, mi nombre es ${nombre}.\n` +
        `Teléfono: ${telefono}\n` +
        `Email: ${email}\n` +
        `Consulta: ${consulta}`;

      const url = `https://wa.me/5491140282252?text=${encodeURIComponent(mensaje)}`;
      window.open(url, '_blank', 'noopener');

      if (waStatus) waStatus.classList.add('is-visible');
      waForm.reset();
    });
  }
});
