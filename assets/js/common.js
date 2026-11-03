/* Shared helpers: theme toggle, basemaps, small utilities. */
(function () {
  // ----- theme -----
  const stored = (() => { try { return localStorage.getItem("theme"); } catch (e) { return null; } })();
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.theme = stored || (prefersDark ? "dark" : "light");

  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".theme-btn");
    if (!btn) return;
    const paint = () => {
      const dark = document.documentElement.dataset.theme === "dark";
      btn.textContent = dark ? "☀" : "☾";
      btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    };
    paint();
    btn.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
      paint();
    });
  });
})();

// ----- basemaps (free, no API key) -----
window.BASEMAPS = {
  esri: {
    type: "raster", tileSize: 256, maxzoom: 19,
    tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
    attribution: "Imagery © Esri, Maxar, Earthstar Geographics"
  },
  // Sentinel-2 cloudless annual mosaics by EOX (https://s2maps.eu)
  s2: (year) => ({
    type: "raster", tileSize: 256, maxzoom: 14,
    tiles: [`https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-${year}_3857/default/g/{z}/{y}/{x}.jpg`],
    attribution: `<a href="https://s2maps.eu" target="_blank" rel="noopener">Sentinel-2 cloudless ${year}</a> by EOX IT Services GmbH (contains modified Copernicus Sentinel data ${year})`
  })
};

window.rasterStyle = function (source, extra) {
  return Object.assign({
    version: 8,
    sources: { base: source },
    layers: [{ id: "base", type: "raster", source: "base" }]
  }, extra || {});
};

window.sleep = (ms) => new Promise((r) => setTimeout(r, ms));
window.reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Type text into an element like a streaming LLM response.
window.typeInto = async function (el, text, speed = 12) {
  el.classList.add("cursor-blink");
  if (window.reducedMotion) { el.textContent = text; el.classList.remove("cursor-blink"); return; }
  el.textContent = "";
  const words = text.split(/(\s+)/);
  for (const w of words) { el.textContent += w; await sleep(speed + Math.random() * speed * 2); }
  el.classList.remove("cursor-blink");
};

window.esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Deterministic random numbers so demo data looks the same on every visit.
window.rng = function (seed) {
  let s = seed >>> 0;
  return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
};
