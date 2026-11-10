/* Dapur Sabana — site behaviour
   Progressive enhancement: everything works without JS except the
   gallery filter/lightbox and inline form feedback. */

(function () {
  'use strict';

  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Sticky header ---------------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------- Mobile navigation ---------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  if (navToggle && nav) {
    const setNav = (open) => {
      body.classList.toggle('nav-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    };

    navToggle.addEventListener('click', () => {
      setNav(!body.classList.contains('nav-open'));
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) setNav(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && body.classList.contains('nav-open')) {
        setNav(false);
        navToggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) setNav(false);
    });
  }

  /* ---------------- Reveal on scroll ---------------- */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('is-in'));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
      );
      revealEls.forEach((el) => io.observe(el));
    }
  }

  /* ---------------- Gallery filter ---------------- */
  const filterBar = document.querySelector('[data-gallery-filters]');
  const galleryItems = Array.from(document.querySelectorAll('[data-gallery-item]'));
  const galleryCount = document.querySelector('[data-gallery-count]');

  if (filterBar && galleryItems.length) {
    const buttons = Array.from(filterBar.querySelectorAll('[data-filter]'));

    const applyFilter = (value) => {
      let visible = 0;

      galleryItems.forEach((item) => {
        const match = value === 'all' || item.dataset.category === value;
        item.hidden = !match;
        if (match) visible += 1;
      });

      buttons.forEach((btn) => {
        btn.setAttribute('aria-pressed', String(btn.dataset.filter === value));
      });

      if (galleryCount) {
        galleryCount.textContent = visible + ' proyek ditampilkan';
      }
    };

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
    });

    applyFilter('all');
  }

  /* ---------------- Lightbox ---------------- */
  const lightbox = document.querySelector('[data-lightbox]');

  if (lightbox && galleryItems.length) {
    const imgEl = lightbox.querySelector('[data-lightbox-img]');
    const titleEl = lightbox.querySelector('[data-lightbox-title]');
    const metaEl = lightbox.querySelector('[data-lightbox-meta]');
    let lastFocused = null;

    const open = (trigger) => {
      const img = trigger.querySelector('img');
      if (!img) return;

      lastFocused = trigger;
      imgEl.src = img.currentSrc || img.src;
      imgEl.alt = img.alt;
      titleEl.textContent = trigger.dataset.title || img.alt;
      metaEl.textContent = trigger.dataset.meta || '';

      if (typeof lightbox.showModal === 'function') {
        lightbox.showModal();
      } else {
        lightbox.setAttribute('open', '');
      }
      body.style.overflow = 'hidden';
    };

    const close = () => {
      if (typeof lightbox.close === 'function' && lightbox.open) {
        lightbox.close();
      } else {
        lightbox.removeAttribute('open');
      }
    };

    galleryItems.forEach((item) => {
      item.addEventListener('click', () => open(item));
    });

    lightbox.addEventListener('close', () => {
      body.style.overflow = '';
      imgEl.removeAttribute('src');
      if (lastFocused) lastFocused.focus();
    });

    lightbox.addEventListener('click', (event) => {
      // Close when clicking the backdrop, not the inner card.
      if (event.target === lightbox) close();
    });

    const closeBtn = lightbox.querySelector('[data-lightbox-close]');
    if (closeBtn) closeBtn.addEventListener('click', close);
  }

  /* ---------------- Forms ---------------- */
  const forms = document.querySelectorAll('form[data-demo-form]');

  forms.forEach((form) => {
    const status = form.querySelector('[data-form-status]');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (status) {
        const nameField = form.elements.namedItem('name');
        const firstName = nameField ? nameField.value.trim().split(' ')[0] : '';
        status.textContent =
          'Terima kasih' +
          (firstName ? ', ' + firstName : '') +
          '. Permintaan Anda sudah kami catat — ini website demo, jadi data tidak dikirim ke mana pun.';
        status.classList.add('is-visible');
        status.setAttribute('role', 'status');
        status.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
      }

      form.reset();
    });
  });

  /* ---------------- Footer year ---------------- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
