
(function () {
  const root = document.documentElement;
  const storageKey = "theme";

  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem(storageKey);
  } catch (error) {
    // Continue without saved preferences if storage is unavailable.
  }

  const systemPrefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  root.dataset.theme =
    savedTheme || (systemPrefersDark ? "dark" : "light");

  document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("theme-toggle");

    if (!toggle) return;

    toggle.addEventListener("click", function () {
      const nextTheme =
        root.dataset.theme === "dark" ? "light" : "dark";

      root.dataset.theme = nextTheme;

      try {
        localStorage.setItem(storageKey, nextTheme);
      } catch (error) {
        // Theme switching still works for the current page.
      }

      toggle.setAttribute(
        "aria-label",
        nextTheme === "dark"
          ? "Switch to light theme"
          : "Switch to dark theme"
      );
    });

    toggle.setAttribute(
      "aria-label",
      root.dataset.theme === "dark"
        ? "Switch to light theme"
        : "Switch to dark theme"
    );
  });
})();
