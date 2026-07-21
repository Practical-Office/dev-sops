(() => {
  const THEME_KEY = "dev-sops-theme";
  const toggle = () => {
    const current = document.documentElement.getAttribute("data-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = current === "dark" || (!current && prefersDark);
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(THEME_KEY, next);
  };
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "dark" || stored === "light") {
    document.documentElement.setAttribute("data-theme", stored);
  }
  document.getElementById("themeToggle")?.addEventListener("click", toggle);
  document.getElementById("menuBtn")?.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
  });
  document.getElementById("navOverlay")?.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
  });
})();
