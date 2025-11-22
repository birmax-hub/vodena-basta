export function scrollToHash(hash: string) {
  if (typeof document === "undefined") return;

  const target = document.querySelector(hash);
  if (!target) return;

  // Wrap DOM reads in requestAnimationFrame to avoid forced reflow
  requestAnimationFrame(() => {
    const navHeightValue = getComputedStyle(document.documentElement).getPropertyValue("--nav-height");
    const navHeight = parseFloat(navHeightValue) || 0;
    const rect = target.getBoundingClientRect();
    const offsetTop = rect.top + window.scrollY - navHeight - 12;

    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  });
}

