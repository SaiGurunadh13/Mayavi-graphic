/**
 * Integration wrapper for protected source file: files/experimental-ui.js
 * Enables seamless loading when referenced via assets/js/experimental-ui.js
 */
(function () {
  "use strict";
  var script = document.createElement("script");
  // Check if loaded from /files/ or root
  var basePath = window.location.pathname.includes("/files/") ? "./experimental-ui.js" : "./files/experimental-ui.js";
  script.src = basePath;
  script.defer = true;
  document.head.appendChild(script);
})();
