/*
 * Simple client-side enrollment gate for the ISE demo pages.
 * Update ENROLLMENT_KEY before publishing.
 */
(function () {
  var ENROLLMENT_KEY = "GELciscoISE";
  var GATE_VERSION = "2026-06-21";
  var STORAGE_KEY = "ise_demo_unlocked_" + GATE_VERSION;

  function normalize(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
  }

  function isUnlocked() {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch (err) {
      return false;
    }
  }

  function unlock() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch (err) {
      // Ignore storage write failures.
    }
  }

  function injectStyles() {
    var style = document.createElement("style");
    style.type = "text/css";
    style.textContent = [
      ".enroll-gate-overlay {",
      "  position: fixed;",
      "  inset: 0;",
      "  z-index: 99999;",
      "  background: rgba(0, 0, 0, 0.7);",
      "  display: grid;",
      "  place-items: center;",
      "  padding: 24px;",
      "}",
      ".enroll-gate-card {",
      "  width: min(560px, 100%);",
      "  background: #ffffff;",
      "  color: #14213d;",
      "  border-radius: 12px;",
      "  padding: 24px;",
      "  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.28);",
      "  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;",
      "}",
      ".enroll-gate-title {",
      "  margin: 0 0 10px;",
      "  font-size: 1.3rem;",
      "  line-height: 1.2;",
      "}",
      ".enroll-gate-copy {",
      "  margin: 0 0 16px;",
      "  color: #2c3e50;",
      "}",
      ".enroll-gate-form {",
      "  display: flex;",
      "  flex-direction: column;",
      "  gap: 10px;",
      "}",
      ".enroll-gate-input {",
      "  width: 100%;",
      "  border: 1px solid #cbd5e1;",
      "  border-radius: 8px;",
      "  padding: 10px 12px;",
      "  font-size: 1rem;",
      "}",
      ".enroll-gate-button {",
      "  border: 0;",
      "  border-radius: 8px;",
      "  padding: 10px 14px;",
      "  font-size: 0.98rem;",
      "  font-weight: 600;",
      "  background: #0066cc;",
      "  color: #ffffff;",
      "  cursor: pointer;",
      "}",
      ".enroll-gate-button:hover {",
      "  background: #0058b1;",
      "}",
      ".enroll-gate-error {",
      "  min-height: 1.1em;",
      "  color: #c1121f;",
      "  font-size: 0.92rem;",
      "}",
      ".enroll-gate-hint {",
      "  margin-top: 10px;",
      "  color: #51606f;",
      "  font-size: 0.86rem;",
      "}",
    ].join("\n");
    document.head.appendChild(style);
  }

  function renderGate() {
    var overlay = document.createElement("div");
    overlay.className = "enroll-gate-overlay";
    overlay.innerHTML = [
      '<div class="enroll-gate-card" role="dialog" aria-modal="true" aria-label="Enrollment key required">',
      '  <h2 class="enroll-gate-title">Enrollment Key Required</h2>',
      '  <p class="enroll-gate-copy">Enter today\'s enrollment key to unlock this ISE demo course.</p>',
      '  <form class="enroll-gate-form">',
      '    <input class="enroll-gate-input" type="text" autocomplete="off" placeholder="Company name" required>',
      '    <button class="enroll-gate-button" type="submit">Unlock Course</button>',
      '    <div class="enroll-gate-error" aria-live="polite"></div>',
      "  </form>",
      '  <div class="enroll-gate-hint">Tip: You can rotate the key by changing ENROLLMENT_KEY and GATE_VERSION in enrollment-gate.js.</div>',
      "</div>",
    ].join("\n");

    var form = overlay.querySelector(".enroll-gate-form");
    var input = overlay.querySelector(".enroll-gate-input");
    var error = overlay.querySelector(".enroll-gate-error");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (normalize(input.value) === normalize(ENROLLMENT_KEY)) {
        unlock();
        overlay.remove();
        return;
      }
      error.textContent = "Invalid enrollment key. Please try again.";
      input.focus();
      input.select();
    });

    document.body.appendChild(overlay);
    input.focus();
  }

  if (isUnlocked()) {
    return;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      injectStyles();
      renderGate();
    });
    return;
  }

  injectStyles();
  renderGate();
})();