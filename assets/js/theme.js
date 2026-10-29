
(() => {
  const root = document.documentElement;
  const button = document.getElementById("theme-toggle");
  const storageKey = "hasan-site-theme";

  function getSavedTheme() {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === "light" || saved === "dark") return saved;
    } catch (error) {
      // Storage may be unavailable in some browser settings.
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;

    if (!button) return;

    const isDark = theme === "dark";

    button.innerHTML = isDark
      ? `<svg class="theme-icon" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
           <circle cx="12" cy="12" r="4"/>
           <path d="M12 2v2 M12 20v2 M4.93 4.93l1.42 1.42
                    M17.65 17.65l1.42 1.42 M2 12h2 M20 12h2
                    M4.93 19.07l1.42-1.42 M17.65 6.35l1.42-1.42"/>
         </svg>`
      : `<svg class="theme-icon" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
           <path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5
                    8.5 8.5 0 1 0 20.5 15.5Z"/>
         </svg>`;

    button.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
    button.title = isDark ? "Switch to light mode" : "Switch to dark mode";
  }

  applyTheme(getSavedTheme());

  if (button) {
    button.addEventListener("click", () => {
      const nextTheme =
        root.dataset.theme === "dark" ? "light" : "dark";

      try {
        localStorage.setItem(storageKey, nextTheme);
      } catch (error) {
        // The toggle still works on the current page if storage is blocked.
      }

      applyTheme(nextTheme);
    });
  }
})();
