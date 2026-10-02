/**
 * MAYAVI CREATIVE-TECH INTERACTIONS & SCRIPT
 * High-performance, lightweight interactions for custom cursor, header scroll,
 * proximity lighting, hero parallax, and modal controls.
 */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     00. PRELOADER DISMISSAL (Smooth fadeout with fail-safe fallback)
     -------------------------------------------------------------------------- */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    const dismissPreloader = () => {
      preloader.style.transition = 'opacity 0.4s ease, visibility 0.4s ease';
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
      setTimeout(() => {
        if (preloader && preloader.parentNode) {
          preloader.remove();
        }
      }, 400);
    };
    window.addEventListener('load', dismissPreloader);
    // Fail-safe timeout in case external scripts stall window.load
    setTimeout(dismissPreloader, 800);
  }

  /* --------------------------------------------------------------------------
     01. HEADER SCROLL EFFECT
     -------------------------------------------------------------------------- */
  const header = document.querySelector('#header');
  if (header) {
    const handleHeaderScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    };
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();
  }

  /* --------------------------------------------------------------------------
     02. CUSTOM CURSOR (Desktop / Pointer fine only)
     -------------------------------------------------------------------------- */
  const isTouchDevice = () => window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  if (!isTouchDevice()) {
    // Create cursor elements if not in DOM
    let cursorDot = document.querySelector('.custom-cursor-dot');
    let cursorRing = document.querySelector('.custom-cursor-ring');

    if (!cursorDot) {
      cursorDot = document.createElement('div');
      cursorDot.className = 'custom-cursor-dot';
      document.body.appendChild(cursorDot);
    }

    if (!cursorRing) {
      cursorRing = document.createElement('div');
      cursorRing.className = 'custom-cursor-ring';
      cursorRing.innerHTML = '<span>VIEW</span>';
      document.body.appendChild(cursorRing);
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isMoving = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;

      if (!isMoving) {
        isMoving = true;
        renderCursor();
      }
    }, { passive: true });

    const renderCursor = () => {
      // Smooth lerp (linear interpolation) for outer ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      if (Math.abs(mouseX - ringX) > 0.1 || Math.abs(mouseY - ringY) > 0.1) {
        requestAnimationFrame(renderCursor);
      } else {
        isMoving = false;
      }
    };

    // Hover interactions
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .nav-link, .tool-card, .btn-primary-glow, .btn-secondary-glass');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });

    // View indicator on Project panels
    const projectCards = document.querySelectorAll('.wing-panel');
    projectCards.forEach((panel) => {
      panel.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-view');
      });
      panel.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-view');
      });
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
    });
  }

  /* --------------------------------------------------------------------------
     03. PROXIMITY SPOTLIGHT EFFECT (Interactive Cards)
     -------------------------------------------------------------------------- */
  const spotlightCards = document.querySelectorAll('.tool-card, .wing-panel, .capability-item');
  spotlightCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }, { passive: true });
  });

  /* --------------------------------------------------------------------------
     04. HERO LOGO 3D TILT / PARALLAX INTERACTION
     -------------------------------------------------------------------------- */
  const heroGraphic = document.querySelector('.hero-logo-container');
  const heroSection = document.querySelector('#hero');

  if (heroGraphic && heroSection && !isTouchDevice()) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const deltaX = (mouseX - centerX) / centerX;
      const deltaY = (mouseY - centerY) / centerY;

      const tiltX = deltaY * -12; // degrees
      const tiltY = deltaX * 12;

      heroGraphic.style.transform = `perspective(800px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      heroGraphic.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  /* --------------------------------------------------------------------------
     05. POPUP MODAL BEHAVIOR
     -------------------------------------------------------------------------- */
  const popup = document.getElementById('popup');
  const closePopupButton = document.getElementById('closePopupButton');

  if (popup && closePopupButton) {
    closePopupButton.removeAttribute('hidden');
    closePopupButton.classList.add('popup-close-btn');

    closePopupButton.addEventListener('click', (e) => {
      e.stopPropagation();
      popup.style.display = 'none';
      popup.classList.remove('active');
    });

    window.addEventListener('click', (event) => {
      if (event.target === popup) {
        popup.style.display = 'none';
        popup.classList.remove('active');
      }
    });
  }

  /* --------------------------------------------------------------------------
     06. SMOOTH SCROLLING FOR INTERNAL ANCHORS
     -------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Specifically wire any .btn-get-started to #constructions
  const getStartedBtns = document.querySelectorAll('.btn-get-started');
  getStartedBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('constructions');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // AOS scroll reveal trigger & fail-safe
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true
    });
    AOS.refresh();
  }
  setTimeout(() => {
    document.querySelectorAll('[data-aos]').forEach(el => {
      el.classList.add('aos-animate');
    });
  }, 600);

});
