/* Renders the home page from data/profile.js */
(function () {
  const P = window.PROFILE;
  const $ = (id) => document.getElementById(id);

  // ---------- header & hero ----------
  document.title = `${P.name} · Remote sensing & GeoLLMs`;
  $("brand").textContent = P.name;
  $("name").textContent = P.name;
  $("footer-name").textContent = P.name;
  $("year").textContent = new Date().getFullYear();
  $("role").textContent = P.role;
  $("tagline").textContent = P.tagline;
  if (P.cv) $("cv-btn").href = P.cv; else $("cv-btn").remove();

  // ---------- globe ----------
  let globe;
  function initGlobe() {
    globe = new maplibregl.Map({
      container: "globe",
      style: {
        version: 8, projection: { type: "globe" },
        sources: { base: BASEMAPS.s2(2020) },
        layers: [
          { id: "ocean", type: "background", paint: { "background-color": "#1d3f5e" } },
          { id: "base", type: "raster", source: "base" }
        ]
      },
      center: [30, 8],
      zoom: 1.6,
      minZoom: 1,
      maxZoom: 12,
      attributionControl: { compact: true }
    });
    globe.scrollZoom.disable();         // don't hijack page scrolling
    globe.on("click", () => globe.scrollZoom.enable());
    globe.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    const fmt = (ll) => {
      const lat = `${Math.abs(ll.lat).toFixed(2)}° ${ll.lat >= 0 ? "N" : "S"}`;
      const lon = `${Math.abs(ll.lng).toFixed(2)}° ${ll.lng >= 0 ? "E" : "W"}`;
      return `${lat}, ${lon}`;
    };
    globe.on("mousemove", (e) => { $("coords").textContent = fmt(e.lngLat); });
    globe.on("move", () => { if (!globe._hovered) $("coords").textContent = fmt(globe.getCenter()); });
    globe.getCanvasContainer().addEventListener("mouseenter", () => (globe._hovered = true));
    globe.getCanvasContainer().addEventListener("mouseleave", () => (globe._hovered = false));

    // project markers
    P.projects.forEach((p) => {
      const el = document.createElement("button");
      el.className = "site-marker";
      el.type = "button";
      el.setAttribute("aria-label", `Project: ${p.title}, ${p.site}`);
      const popup = new maplibregl.Popup({ offset: 14, closeButton: false })
        .setHTML(`<strong>${esc(p.title)}</strong><br><span style="color:#4a5868">${esc(p.site)}</span><br><a href="${esc(p.page)}">Open project</a>`);
      new maplibregl.Marker({ element: el }).setLngLat([p.lon, p.lat]).setPopup(popup).addTo(globe);
    });

    // slow auto-rotation that pauses while the visitor interacts
    let spinning = !reducedMotion, resumeTimer;
    const pause = () => { spinning = false; clearTimeout(resumeTimer); resumeTimer = setTimeout(() => (spinning = !reducedMotion && globe.getZoom() < 3), 6000); };
    ["mousedown", "touchstart", "wheel"].forEach((ev) => globe.getCanvasContainer().addEventListener(ev, pause, { passive: true }));
    let last = performance.now();
    function spin(now) {
      const dt = now - last; last = now;
      if (spinning && !globe.isMoving()) {
        const c = globe.getCenter();
        globe.setCenter([c.lng + dt * 0.004, c.lat]);
      }
      requestAnimationFrame(spin);
    }
    requestAnimationFrame(spin);
    globe._pause = pause;
  }
  try { initGlobe(); } catch (e) { console.warn("Globe could not start:", e); $("globe").textContent = "Your browser can't show the interactive globe."; }

  window.flyToSite = function (i) {
    const p = P.projects[i];
    if (!globe) return;
    globe._pause();
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    globe.flyTo({ center: [p.lon, p.lat], zoom: 9, duration: reducedMotion ? 0 : 4000, essential: true });
  };

  // ---------- projects ----------
  const allTags = ["All", ...new Set(P.projects.flatMap((p) => p.tags).filter((t) => t !== "GeoLLM"))];
  let activeTag = "All";
  function renderProjects() {
    $("project-list").innerHTML = P.projects
      .map((p, i) => ({ p, i }))
      .filter(({ p }) => activeTag === "All" || p.tags.includes(activeTag))
      .map(({ p, i }) => `
        <li class="project">
          <a class="thumb" href="${esc(p.page)}" tabindex="-1" aria-hidden="true"><img src="${esc(p.thumb)}" alt="" loading="lazy"></a>
          <div>
            <h3><a href="${esc(p.page)}">${esc(p.title)}</a></h3>
            <p class="muted" style="margin:0">${esc(p.summary)}</p>
            <div class="tags">${p.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
          </div>
          <div class="site">
            <div>${esc(p.site)}</div>
            <div class="num">${Math.abs(p.lat).toFixed(2)}° ${p.lat >= 0 ? "N" : "S"}, ${Math.abs(p.lon).toFixed(2)}° ${p.lon >= 0 ? "E" : "W"}</div>
            <button class="btn small" type="button" onclick="flyToSite(${i})">Show on globe</button>
          </div>
        </li>`).join("");
  }
  $("project-filters").innerHTML = allTags.map((t) => `<button class="filter" type="button" aria-pressed="${t === activeTag}" data-tag="${esc(t)}">${esc(t)}</button>`).join("");
  $("project-filters").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    activeTag = b.dataset.tag;
    $("project-filters").querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    renderProjects();
  });
  renderProjects();

  // ---------- about ----------
  $("about-text").innerHTML = P.about.map((t) => `<p>${esc(t)}</p>`).join("");
  $("skills").innerHTML = Object.entries(P.skills)
    .map(([k, v]) => `<dt>${esc(k)}</dt><dd>${v.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</dd>`).join("");

  // ---------- experience ----------
  $("timeline").innerHTML = P.experience.map((j) => `
    <li class="tl-item">
      <div class="tl-date">${esc(j.start)}–${esc(j.end)}</div>
      <div class="tl-body">
        <h3>${esc(j.title)}</h3>
        <div class="tl-org">${esc(j.org)}${j.place ? `, ${esc(j.place)}` : ""}</div>
        <ul>${(j.points || []).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </div>
    </li>`).join("");
  $("education").innerHTML = P.education.map((e) => `
    <div><strong>${esc(e.degree)}</strong><br><span class="muted">${esc(e.org)}, <span class="num">${esc(e.start)}–${esc(e.end)}</span></span>
    ${e.note ? `<br><span>${esc(e.note)}</span>` : ""}</div>`).join("");

  // ---------- publications ----------
  const pubFilters = [["all", "All"], ["selected", "Selected"], ["journal", "Journal"], ["conference", "Conference"], ["preprint", "Preprint"]];
  let pubFilter = "all", query = "";
  const typeLabel = { journal: "Journal", conference: "Conference", preprint: "Preprint", thesis: "Thesis", other: "Other" };
  $("pub-filters").innerHTML = pubFilters.map(([k, l]) => `<button class="filter" type="button" data-f="${k}" aria-pressed="${k === pubFilter}">${l}</button>`).join("");
  $("pub-filters").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    pubFilter = b.dataset.f;
    $("pub-filters").querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    renderPubs();
  });
  $("pub-search").addEventListener("input", (e) => { query = e.target.value.toLowerCase().trim(); renderPubs(); });

  function highlightMe(authors) {
    const safe = esc(authors);
    const me = esc(P.name);
    return me ? safe.split(me).join(`<strong>${me}</strong>`) : safe;
  }
  function renderPubs() {
    const list = P.publications
      .map((p, i) => ({ ...p, i }))
      .filter((p) => pubFilter === "all" || (pubFilter === "selected" ? p.selected : p.type === pubFilter))
      .filter((p) => !query || `${p.title} ${p.authors} ${p.venue} ${p.year}`.toLowerCase().includes(query))
      .sort((a, b) => b.year - a.year);
    $("pub-count").textContent = `${list.length} of ${P.publications.length}`;
    if (!list.length) { $("pub-list").innerHTML = `<p class="empty">No publications match “${esc(query)}”. Clear the search or pick another filter.</p>`; return; }
    let html = "", year = null;
    list.forEach((p) => {
      if (p.year !== year) { year = p.year; html += `<div class="pub-year">${year}</div>`; }
      html += `
        <article class="pub" id="pub-${p.i}">
          <div class="pub-title">${esc(p.title)}<span class="pub-type">${typeLabel[p.type] || "Other"}</span></div>
          <div class="pub-meta">${highlightMe(p.authors)}. <em>${esc(p.venue)}</em>, ${p.year}.</div>
          <div class="pub-actions">
            ${p.abstract ? `<button class="btn small" type="button" data-act="abs" data-i="${p.i}" aria-expanded="false">Abstract</button>` : ""}
            ${p.pdf ? `<a class="btn small" href="${esc(p.pdf)}" target="_blank" rel="noopener">PDF</a>` : ""}
            ${p.doi ? `<a class="btn small" href="https://doi.org/${esc(p.doi)}" target="_blank" rel="noopener">DOI</a>` : ""}
            ${p.code ? `<a class="btn small" href="${esc(p.code)}" target="_blank" rel="noopener">Code</a>` : ""}
            ${p.bibtex ? `<button class="btn small" type="button" data-act="bib" data-i="${p.i}" aria-expanded="false">BibTeX</button>` : ""}
          </div>
          ${p.abstract ? `<div class="pub-abstract"><p>${esc(p.abstract)}</p></div>` : ""}
          ${p.bibtex ? `<div class="pub-bib"><pre>${esc(p.bibtex)}</pre><button class="btn small" type="button" data-act="copy" data-i="${p.i}">Copy BibTeX</button></div>` : ""}
        </article>`;
    });
    $("pub-list").innerHTML = html;
  }
  $("pub-list").addEventListener("click", async (e) => {
    const b = e.target.closest("button[data-act]"); if (!b) return;
    const card = $(`pub-${b.dataset.i}`);
    if (b.dataset.act === "abs" || b.dataset.act === "bib") {
      const cls = b.dataset.act === "abs" ? "show-abs" : "show-bib";
      const open = card.classList.toggle(cls);
      b.setAttribute("aria-expanded", open);
    } else if (b.dataset.act === "copy") {
      try { await navigator.clipboard.writeText(P.publications[b.dataset.i].bibtex); b.textContent = "Copied"; }
      catch { b.textContent = "Select the text above to copy"; }
      setTimeout(() => (b.textContent = "Copy BibTeX"), 2000);
    }
  });
  renderPubs();

  // ---------- contact ----------
  const L = P.links || {};
  const contacts = [
    P.email && ["Email me", `mailto:${P.email}`, true],
    L.github && ["GitHub", L.github],
    L.scholar && ["Google Scholar", L.scholar],
    L.linkedin && ["LinkedIn", L.linkedin],
    L.orcid && ["ORCID", L.orcid]
  ].filter(Boolean);
  $("contact-links").innerHTML = contacts.map(([l, h, primary]) =>
    `<a class="btn${primary ? " primary" : ""}" href="${esc(h)}" ${h.startsWith("mailto") ? "" : 'target="_blank" rel="noopener"'}>${l}</a>`).join("");

  // ---------- nav highlight ----------
  const links = [...document.querySelectorAll(".nav a")];
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${en.target.id}`)); });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => obs.observe(s));
})();
