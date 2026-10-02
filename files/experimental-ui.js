/* ==========================================================================
   MAYAVI — EXPERIMENTAL GRAPHICAL UI LAYER
   Self-contained: does not read from or depend on main.js / creative-tech.js.
   Respects prefers-reduced-motion and coarse/touch pointers throughout.
   ========================================================================== */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------------------------------------------------------------------
     1. Mouse-reactive spotlight on wings / tools / capability cards
     --------------------------------------------------------------------- */
  var spotlightEls = document.querySelectorAll(".wing-panel, .tool-card, .capability-item");
  if (isFinePointer) {
    spotlightEls.forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var rect = el.getBoundingClientRect();
        el.style.setProperty("--mouse-x", (e.clientX - rect.left) + "px");
        el.style.setProperty("--mouse-y", (e.clientY - rect.top) + "px");
      });
    });
  }

  /* ---------------------------------------------------------------------
     2. Tilt effect on [data-tilt] elements
     --------------------------------------------------------------------- */
  var tiltEls = document.querySelectorAll("[data-tilt]");
  if (isFinePointer && !prefersReducedMotion) {
    tiltEls.forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var rect = el.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.setProperty("--ry", (px * 12).toFixed(2) + "deg");
        el.style.setProperty("--rx", (py * -12).toFixed(2) + "deg");
      });
      el.addEventListener("mouseleave", function () {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      });
    });
  }

  /* ---------------------------------------------------------------------
     3. Magnetic buttons
     --------------------------------------------------------------------- */
  var magneticEls = document.querySelectorAll(".btn-primary-glow, .btn-secondary-glass");
  if (isFinePointer && !prefersReducedMotion) {
    magneticEls.forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var rect = el.getBoundingClientRect();
        var x = (e.clientX - rect.left - rect.width / 2) * 0.22;
        var y = (e.clientY - rect.top - rect.height / 2) * 0.32;
        el.style.transform = "translate(" + x.toFixed(1) + "px, " + y.toFixed(1) + "px)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "";
      });
    });
  }

  /* ---------------------------------------------------------------------
     4. Ambient particle network inside the hero (decorative only)
     --------------------------------------------------------------------- */
  var canvas = document.getElementById("heroNetworkCanvas");
  var hero = document.getElementById("hero");

  if (canvas && hero && !prefersReducedMotion) {
    var ctx = canvas.getContext("2d");
    var particles = [];
    var rafId = null;
    var running = true;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      var rect = hero.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seedParticles() {
      var rect = hero.getBoundingClientRect();
      var count = Math.max(18, Math.min(46, Math.round((rect.width * rect.height) / 28000)));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22
        });
      }
    }

    function tick() {
      if (!running) { return; }
      var rect = hero.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x <= 0 || p.x >= rect.width) { p.vx *= -1; }
        if (p.y <= 0 || p.y >= rect.height) { p.vy *= -1; }
      }

      for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
          var dx = particles[a].x - particles[b].x;
          var dy = particles[a].y - particles[b].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.strokeStyle = "rgba(168, 85, 247, " + (0.14 * (1 - dist / 130)).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(0, 240, 255, 0.55)";
        ctx.beginPath();
        ctx.arc(particles[a].x, particles[a].y, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = window.requestAnimationFrame(tick);
    }

    resize();
    seedParticles();
    tick();

    var resizeTimer = null;
    window.addEventListener("resize", function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        resize();
        seedParticles();
      }, 150);
    });

    document.addEventListener("visibilitychange", function () {
      running = !document.hidden;
      if (running) {
        tick();
      } else if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    });
  }
})();
