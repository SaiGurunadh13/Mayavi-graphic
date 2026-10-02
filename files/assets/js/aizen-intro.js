/**
 * MAYAVI CINEMATIC INTRO: VIDEO DRIVEN
 * Premium GSAP choreographed opening sequence based on video event.
 */
document.addEventListener("DOMContentLoaded", () => {
  'use strict';

  const introWrap = document.getElementById("aizen-intro");
  if (!introWrap) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const video = document.getElementById("aizen-video");

  // Function to end intro and reveal main site
  const endIntro = () => {
    introWrap.style.display = "none";
    document.body.style.overflow = ""; // Restore scroll
  };

  // If user prefers reduced motion, skip entirely for accessibility
  if (prefersReducedMotion) {
    endIntro();
    return;
  }

  // Lock scroll during intro
  document.body.style.overflow = "hidden";

  // Replay Intro Button Logic (bind to anything with id 'replay-aizen-intro')
  const replayBtn = document.getElementById("replay-aizen-intro");
  if (replayBtn) {
    replayBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.reload(); // Since it plays every time, just reload
    });
  }

  // Setup GSAP Exit Transition
  const triggerExitTransition = () => {
    if (typeof gsap !== "undefined") {
      gsap.to(introWrap, {
        opacity: 0,
        scale: 1.05,
        filter: "blur(12px)",
        duration: 2.5,
        ease: "power2.inOut",
        onComplete: endIntro
      });
    } else {
      endIntro();
    }
  };

  // Wait for the video to naturally finish playing
  if (video) {
    video.addEventListener("ended", () => {
      triggerExitTransition();
    });

    // Fallback: If video fails to load or play, skip after 12 seconds
    let hasPlayed = false;
    video.addEventListener("playing", () => { hasPlayed = true; });
    setTimeout(() => {
      if (!hasPlayed || video.currentTime === 0) {
        triggerExitTransition();
      }
    }, 12000);
  } else {
    // No video found, just skip
    endIntro();
  }

  // Skip Intro functionality
  const skipBtn = introWrap.querySelector(".aizen-skip-btn");
  if (skipBtn) {
    skipBtn.addEventListener("click", () => {
      if (typeof gsap !== "undefined") {
        gsap.to(introWrap, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: endIntro
        });
      } else {
        endIntro();
      }
    });
  }
});
