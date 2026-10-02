/**
 * MAYAVI PREMIUM MOTION SCRIPT
 * High-end cinematic scroll reveals, text splitting, and physics-based interactions.
 */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------------------
     1. TYPOGRAPHY TEXT SPLITTER
     Wraps characters in spans for staggered cinematic reveals.
     -------------------------------------------------------------------------- */
  const splitTexts = document.querySelectorAll('[data-premium-split]');
  
  if (!prefersReducedMotion) {
    splitTexts.forEach(el => {
      // Don't split if already parsed
      if (el.classList.contains('is-parsed')) return;
      
      const text = el.innerText;
      // Preserve original HTML if it contains important tags (like gradient spans)
      // For this implementation, we assume text-only or we extract text.
      // To support inner spans, a more complex parser is needed.
      // We will handle spans manually in HTML if needed, but for general headlines:
      
      // Basic text splitter:
      let newHTML = '';
      const words = text.split(' ');
      
      words.forEach((word, wordIdx) => {
        newHTML += `<span class="split-word">`;
        word.split('').forEach((char, charIdx) => {
          // Stagger calculation: words delay + chars delay
          const delay = (wordIdx * 60) + (charIdx * 25);
          newHTML += `<span class="split-char" style="transition-delay: ${delay}ms">${char}</span>`;
        });
        newHTML += `</span>`;
        if (wordIdx < words.length - 1) {
          newHTML += '&nbsp;';
        }
      });
      
      el.innerHTML = newHTML;
      el.classList.add('premium-split-text', 'is-parsed');
    });
  } else {
    // Fallback for reduced motion
    splitTexts.forEach(el => el.classList.add('premium-split-text', 'is-parsed', 'is-revealed'));
  }

  /* --------------------------------------------------------------------------
     2. INTERSECTION OBSERVER FOR SCROLL REVEALS
     -------------------------------------------------------------------------- */
  const revealOptions = {
    root: null,
    rootMargin: '0px 0px -15% 0px', // Trigger slightly before element comes into view
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target); // Play once
      }
    });
  }, revealOptions);

  const revealElements = document.querySelectorAll('.premium-reveal-up, .premium-reveal-fade, .premium-split-text');
  revealElements.forEach(el => revealObserver.observe(el));

  /* --------------------------------------------------------------------------
     3. CINEMATIC HERO ENTRANCE
     Triggers immediately after load for the hero section.
     -------------------------------------------------------------------------- */
  setTimeout(() => {
    const heroElements = document.querySelectorAll('#hero .premium-split-text, #hero .premium-reveal-up, #hero .premium-reveal-fade');
    heroElements.forEach(el => {
      el.classList.add('is-revealed');
    });
  }, 100); // Short delay to ensure DOM and CSS are ready

  /* --------------------------------------------------------------------------
     4. PARALLAX SCROLL ENGINE
     Smooth hardware-accelerated parallax for specific elements.
     -------------------------------------------------------------------------- */
  if (!prefersReducedMotion && window.innerWidth > 768) {
    const parallaxElements = document.querySelectorAll('[data-premium-parallax]');
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateParallax = () => {
      parallaxElements.forEach(el => {
        // Get custom speed or default to 0.2
        const speed = parseFloat(el.getAttribute('data-premium-parallax')) || 0.2;
        
        // Calculate offset based on scroll position and bounding rect
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Only compute if element is roughly in view
        if (rect.top < viewportHeight && rect.bottom > 0) {
          // Center-based calculation (0 when center of element is center of screen)
          const elementCenter = rect.top + (rect.height / 2);
          const viewportCenter = viewportHeight / 2;
          const distanceToCenter = elementCenter - viewportCenter;
          
          const yPos = distanceToCenter * speed;
          el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
      });
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
    
    // Initial call
    updateParallax();
  }
});
