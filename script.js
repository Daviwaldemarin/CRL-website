/* =========================================================
   CRL RETROVISORES — site logic
   ========================================================= */

/* ---------- Mobile menu toggle ---------- */
(() => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
})();

/* ---------- Reveal on scroll ---------- */
(() => {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) return; // graceful: items already visible by default

  // Mark the root so CSS knows to hide initially
  document.documentElement.classList.add("js-anim");

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: "0px 0px -40px 0px" });
  items.forEach(i => io.observe(i));

  // Safety: anything in viewport on load is revealed; everything still hidden after 4s gets revealed
  setTimeout(() => {
    document.querySelectorAll(".reveal:not(.visible)").forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) el.classList.add("visible");
    });
  }, 100);
  setTimeout(() => {
    document.querySelectorAll(".reveal:not(.visible)").forEach(el => el.classList.add("visible"));
  }, 4000);
})();

/* =========================================================
   PRODUCT CATALOG DATA
   Extraído do catálogo CRL v2 (PDF oficial)
   S/C = sem controle | C/C = com controle
   LD = lado direito | LE = lado esquerdo
   ========================================================= */

const PRODUTOS = [
  // ===== LINHA FIAT =====
  { brand: "Fiat", model: "Fiorino 91/97", codes: ["RF-310 LD S/C", "RF-311 LE S/C"] },
  { brand: "Fiat", model: "Fiorino 97/11", codes: ["RF-330 LD S/C", "RF-331 LE S/C", "RF-332 LD C/C", "RF-333 LE C/C"] },
  { brand: "Fiat", model: "Fiorino 11/14", codes: ["RF-340 LD S/C", "RF-341 LE S/C", "RF-342 LD C/C", "RF-343 LE C/C"] },
  { brand: "Fiat", model: "Fiorino 2015/...", codes: ["RE-360 LD S/C", "RE-361 LE S/C", "RF-362 LD C/C", "RF-363 LE C/C"] },
  { brand: "Fiat", model: "Uno 85/91 (2/4 portas)", codes: ["RU-550 LD S/C", "RU-551 LE S/C"] },
  { brand: "Fiat", model: "Uno/Elba 89/ Fiorino Pickup", codes: ["RU-560 LD S/C", "RU-561 LE S/C", "RU-562 LD C/C", "RU-563 LE C/C"] },
  { brand: "Fiat", model: "Uno EP/SX/Young Smart 96/2004", codes: ["RU-580 LD S/C", "RU-581 LE S/C", "RU-582 LD C/C", "RU-583 LE C/C"] },
  { brand: "Fiat", model: "Uno Mille 85/95", codes: ["RU-590 LD S/C", "RU-591 LE S/C", "RU-592 LD C/C", "RU-593 LE C/C"] },
  { brand: "Fiat", model: "Uno Fire 01/04 (2 portas)", codes: ["RU-540 LD S/C", "RU-541 LE S/C", "RU-542 LD C/C", "RU-543 LE C/C"] },
  { brand: "Fiat", model: "Uno Fire 01/04 (4 portas)", codes: ["RU-570 LD S/C", "RU-571 LE S/C", "RU-572 LD C/C", "RU-573 LE C/C"] },
  { brand: "Fiat", model: "Uno Fire Flex 2005/2010 (2 portas)", codes: ["RU-640 LD S/C", "RU-641 LE S/C", "RU-642 LD C/C", "RU-643 LE C/C"] },
  { brand: "Fiat", model: "Uno Fire Flex 2005/2010 (4 portas)", codes: ["RU-644 LD S/C", "RU-645 LE S/C", "RU-646 LD C/C", "RU-647 LE C/C"] },
  { brand: "Fiat", model: "Uno Economy 2009/2012 (2 portas)", codes: ["RU-610 LD S/C", "RU-611 LE S/C", "RU-612 LD C/C", "RU-613 LE C/C"] },
  { brand: "Fiat", model: "Uno Economy 2009/2012 (4 portas)", codes: ["RU-614 LD S/C", "RU-615 LE S/C", "RU-616 LD C/C", "RU-617 LE C/C"] },
  { brand: "Fiat", model: "Uno Vivace 2010/... (2 portas)", codes: ["RU-552 LD S/C", "RU-553 LE S/C", "RU-554 LD C/C", "RU-555 LE C/C"] },
  { brand: "Fiat", model: "Uno Vivace 2010/... (4 portas)", codes: ["RU-556 LD S/C", "RU-557 LE S/C", "RU-558 LD C/C", "RU-558 LE C/C"] },
  { brand: "Fiat", model: "Palio 96/2000 (2 portas)", codes: ["RP-520 LD S/C", "RP-521 LE S/C", "RP-522 LD C/C", "RP-523 LE C/C"] },
  { brand: "Fiat", model: "Palio 96/2000 (4 portas)", codes: ["RP-530 LD S/C", "RP-531 LE S/C", "RP-532 LD C/C", "RP-533 LE C/C"] },
  { brand: "Fiat", model: "Palio Fire Strada 2001/2003 (2 portas)", codes: ["RP-620 LD S/C", "RP-621 LE S/C", "RP-622 LD C/C", "RP-623 LE C/C"] },
  { brand: "Fiat", model: "Palio/Weekend/Fire 2001/2003 (4 portas)", codes: ["RP-630 LD S/C", "RP-631 LE S/C", "RP-632 LD C/C", "RP-633 LE C/C"] },
  { brand: "Fiat", model: "Palio/Strada 04/07 (2 portas)", codes: ["RP-660 LD S/C", "RP-661 LE S/C", "RP-662 LD C/C", "RP-663 LE C/C"] },
  { brand: "Fiat", model: "Palio/Siena/Weekend 04/07 (4 portas)", codes: ["RP-664 LD S/C", "RP-665 LE S/C", "RP-666 LD C/C", "RP-667 LE C/C"] },
  { brand: "Fiat", model: "Palio Fire Economy Strada 2011/... (2 portas)", codes: ["RP-670 LD S/C", "RP-671 LE S/C", "RP-672 LD C/C", "RP-673 LE C/C"] },
  { brand: "Fiat", model: "Palio Fire Economy/Weekend/Atrative/Essence 2011/... (4 portas)", codes: ["RP-674 LD S/C", "RP-675 LE S/C", "RP-676 LD C/C", "RP-677 LE C/C"] },
  { brand: "Fiat", model: "Palio/Strada 2008/... (2 portas)", codes: ["RP-680 LD S/C", "RP-681 LE S/C", "RP-682 LD C/C", "RP-683 LE C/C"] },
  { brand: "Fiat", model: "Palio/Weekend 2008/... (4 portas)", codes: ["RP-684 LD S/C", "RP-685 LE S/C", "RP-686 LD C/C", "RP-687 LE C/C"] },
  { brand: "Fiat", model: "Palio/Strada Attractive/Essence 2011/... (2 portas)", codes: ["RP-690 LD S/C", "RP-691 LE S/C", "RP-692 LD C/C", "RP-693 LE C/C"] },
  { brand: "Fiat", model: "Palio/Weekend/Siena Attractive/Essence 2011/... (4 portas)", codes: ["RP-694 LD S/C", "RP-695 LE S/C", "RP-696 LD C/C", "RP-697 LE C/C"] },

  // ===== LINHA GM =====
  { brand: "GM", model: "D-20 85/91 (base em ferro)", codes: ["RD-450 LD S/C", "RD-451 LE S/C"] },
  { brand: "GM", model: "D-20 91/95 (base em ferro)", codes: ["RD-400 LD S/C", "RD-401 LE S/C"] },
  { brand: "GM", model: "D-20 Bojuda (base em ferro)", codes: ["RD-500 LD S/C", "RD-501 LE S/C"] },
  { brand: "GM", model: "Corsa 94/... (2/4 portas)", codes: ["RC-650 LD S/C", "RC-651 LE S/C", "RC-652 LD C/C", "RC-653 LE C/C"] },
  { brand: "GM", model: "Celta 00/06 (2/4 portas)", codes: ["RC-250 LD S/C", "RC-251 LE S/C", "RC-252 LD C/C", "RC-253 LE C/C"] },
  { brand: "GM", model: "Celta/Prisma 07/... (2/4 portas)", codes: ["RC-260 LD S/C", "RC-261 LE S/C", "RC-262 LD C/C", "RC-263 LE C/C"] },
  { brand: "GM", model: "Monza 85/90 (2/4 portas)", codes: ["RM-700 LD S/C", "RM-701 LE S/C", "RM-702 LD C/C", "RM-703 LE C/C"] },
  { brand: "GM", model: "Monza 91/93 (2/4 portas)", codes: ["RM-720 LD S/C", "RM-721 LE S/C", "RM-722 LD C/C", "RM-723 LE C/C"] },
  { brand: "GM", model: "Monza 94/... (2/4 portas)", codes: ["RM-750 LD S/C", "RM-751 LE S/C", "RM-752 LD C/C", "RM-753 LE C/C"] },
  { brand: "GM", model: "Kadett 89/...", codes: ["RK-850 LD S/C", "RK-851 LE S/C"] },
  { brand: "GM", model: "S10 95/2010", codes: ["RS-390 LD S/C", "RS-391 LE S/C"] },
  { brand: "GM", model: "Corsa/Montana 2002/... (2/4 portas)", codes: ["RC-240 LD S/C", "RC-241 LE S/C", "RC-242 LD C/C", "RC-243 LE C/C"] },
  { brand: "GM", model: "Meriva 2002/...", codes: ["RM-730 LD S/C", "RM-731 LE S/C", "RM-732 LD C/C", "RM-733 LE C/C"] },

  // ===== LINHA VW =====
  { brand: "VW", model: "Gol/Parati/Voyage 88/04", codes: ["RP-350 LD S/C", "RP-351 LE S/C", "RP-352 LD C/C", "RP-353 LE C/C"] },
  { brand: "VW", model: "Gol Bola 95/99 (2 portas)", codes: ["RG-950 LD S/C", "RG-951 LE S/C", "RG-952 LD C/C", "RG-953 LE C/C"] },
  { brand: "VW", model: "Gol Bola 95/99 (4 portas)", codes: ["RG-954 LD S/C", "RG-955 LE S/C", "RG-956 LD C/C", "RG-957 LE C/C"] },
  { brand: "VW", model: "Gol G3 00/14 (2 portas)", codes: ["RG-910 LD S/C", "RG-911 LE S/C", "RG-912 LD C/C", "RG-913 LE C/C"] },
  { brand: "VW", model: "Gol G3/Saveiro/Parati 00/14 (4 portas)", codes: ["RG-914 LD S/C", "RG-915 LE S/C", "RG-916 LD C/C", "RG-917 LE C/C"] },
  { brand: "VW", model: "Gol City G3 00/14 (2 portas)", codes: ["RG-920 LD S/C", "RG-921 LE S/C", "RG-922 LD C/C", "RG-923 LE C/C"] },
  { brand: "VW", model: "Gol City G3 00/14 (4 portas)", codes: ["RG-924 LD S/C", "RG-925 LE S/C", "RG-926 LD C/C", "RG-927 LE C/C"] },
  { brand: "VW", model: "Santana 97/... (2/4 portas)", codes: ["RS-380 LD S/C", "RS-381 LE S/C", "RS-382 LD C/C", "RS-383 LE C/C"] },
  { brand: "VW", model: "Gol G5 2009/2013", codes: ["RG-940 LD S/C", "RG-941 LE S/C", "RG-942 LD C/C", "RG-943 LE C/C"] },
  { brand: "VW", model: "Gol/Voyage G6 2013/2016", codes: ["RG-960 LD S/C", "RG-961 LE S/C", "RG-962 LD C/C", "RG-963 LE C/C"] },
  { brand: "VW", model: "Kombi Cliper 76/96 (pé de ferro)", codes: ["RK-301 LD S/C"] },
  { brand: "VW", model: "Kombi Nova 97/... (pé de ferro)", codes: ["RK-600 LD S/C", "RK-601 LE S/C"] },
  { brand: "VW", model: "Fox 2003/2010", codes: ["RF-280 LD S/C", "RF-281 LE S/C", "RF-282 LD C/C", "RF-283 LE C/C"] },

  // ===== LINHA FORD =====
  { brand: "Ford", model: "Pampa 84/91", codes: ["RK-304 LD S/C"] },
  { brand: "Ford", model: "Pampa 92/97 / Scalla / Del Rey 85/92", codes: ["RP-404 LD S/C", "RP-405 LE S/C"] },
  { brand: "Ford", model: "Corcel II / Belina 78/88 / Del Rey 81/88 (2/4 portas)", codes: ["RC-900 LD S/C", "RC-901 LE S/C"] },
  { brand: "Ford", model: "Escort 87/92 (2/4 portas)", codes: ["RE-420 LD S/C", "RE-421 LE S/C", "RE-422 LD C/C", "RE-423 LE C/C"] },
  { brand: "Ford", model: "Courier Pick-up (todas)", codes: ["RC-430 LD S/C", "RC-431 LE S/C"] },
  { brand: "Ford", model: "F1000 88/92 (base ferro c/ kit fixação)", codes: ["RF-800 LD S/C", "RF-801 LE S/C"] },
  { brand: "Ford", model: "F1000 93/98 (base ferro c/ kit fixação)", codes: ["RF-802 LD S/C", "RF-803 LE S/C"] },
  { brand: "Ford", model: "Ford Ka 2008/2014 (2/4 portas)", codes: ["RK-220 LD S/C", "RK-221 LE S/C", "RK-222 LD C/C", "RK-223 LE C/C"] },
  { brand: "Ford", model: "Ford Fiesta 96/01 / Fiesta Street 03/05 (2/4 portas)", codes: ["RF-210 LD S/C", "RF-211 LE S/C", "RF-212 LD C/C", "RF-213 LE C/C"] },
  { brand: "Ford", model: "Ford Fiesta 2002/2013 (2/4 portas)", codes: ["RF-230 LD S/C", "RF-231 LE S/C", "RF-232 LD C/C", "RF-233 LE C/C"] },
  { brand: "Ford", model: "Ford Ka 97/2007 (2/4 portas)", codes: ["RK-270 LD S/C", "RK-271 LE S/C", "RK-272 LD C/C", "RK-273 LE C/C"] },

  // ===== LINHA UNIVERSAL =====
  { brand: "Universal", model: "Renove Preto", codes: ["R-200 LD S/C"] },
  { brand: "Universal", model: "Renove Cromado", codes: ["R-202 LD S/C"] },
  { brand: "Universal", model: "Blick Preto", codes: ["R-100 LD S/C"] },
  { brand: "Universal", model: "F.Indy Preto", codes: ["RY-1000 LD S/C", "RY-1001 LE S/C"] },
  { brand: "Universal", model: "F.Indy Cromado", codes: ["RY-2000 LD S/C", "RY-2001 LE S/C"] },
];

/* ---------- Render product cards ---------- */
function renderProducts(filterBrand = "all", searchQuery = "") {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  const q = searchQuery.trim().toLowerCase();
  const filtered = PRODUTOS.filter(p => {
    const matchBrand = filterBrand === "all" || p.brand === filterBrand;
    const matchSearch = !q
      || p.model.toLowerCase().includes(q)
      || p.brand.toLowerCase().includes(q)
      || p.codes.some(c => c.toLowerCase().includes(q));
    return matchBrand && matchSearch;
  });

  if (!filtered.length) {
    grid.innerHTML = `<div class="no-results">
      <p>Nenhum produto encontrado para "${escapeHtml(searchQuery)}".</p>
      <p style="font-size:14px;">Tente outro termo ou entre em contato pelo nosso comercial.</p>
    </div>`;
    return;
  }

  // simple inline SVG of a side-mirror to use as illustration
  const mirrorSvg = `<svg viewBox="0 0 200 150" class="product-icon" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M30 70 L30 60 Q30 35 55 30 L150 25 Q175 25 178 50 L178 95 Q178 115 158 118 L60 125 Q35 125 30 105 Z" fill="currentColor" opacity="0.9"/>
    <path d="M55 50 L150 45 Q165 45 165 60 L165 90 Q165 105 150 105 L60 110 Q45 110 45 95 L45 60 Q45 50 55 50 Z" fill="white" opacity="0.92"/>
    <path d="M58 58 L155 53 L160 88 L62 95 Z" fill="currentColor" opacity="0.18"/>
    <path d="M28 65 L18 75 L22 88 L32 80 Z" fill="currentColor" opacity="0.85"/>
  </svg>`;

  grid.innerHTML = filtered.map(p => `
    <article class="product-card">
      <div class="product-image">${mirrorSvg}</div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <h3 class="product-name">${escapeHtml(p.model)}</h3>
        <div class="product-codes">
          ${p.codes.map(c => {
            const isCC = c.includes("C/C");
            return `<span class="code-tag${isCC ? " cc" : ""}">${escapeHtml(c)}</span>`;
          }).join("")}
        </div>
      </div>
    </article>
  `).join("");
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ---------- Filter + search wiring ---------- */
(() => {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  let activeBrand = "all";
  let searchQuery = "";

  const brandBtns = document.querySelectorAll(".filter-btn");
  brandBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      brandBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeBrand = btn.dataset.brand;
      renderProducts(activeBrand, searchQuery);
    });
  });

  const searchInput = document.getElementById("filter-search");
  if (searchInput) {
    let to;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(to);
      to = setTimeout(() => {
        searchQuery = e.target.value;
        renderProducts(activeBrand, searchQuery);
      }, 150);
    });
  }

  // initial render
  renderProducts(activeBrand, searchQuery);
})();

/* ---------- Footer year ---------- */
(() => {
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();

/* ---------- Animated dot grid (shared across dark sections) ---------- */
function initDotGrid(svg) {
  if (!svg) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const SPACING = 24;
  const DOT_RADIUS = 1.2;
  let dots = [];
  let cols = 0, rows = 0;
  let activeGlow = new Set();
  let cycleTimer = null;

  function buildGrid() {
    const rect = svg.parentElement.getBoundingClientRect();
    const w = Math.ceil(rect.width);
    const h = Math.ceil(rect.height);
    if (w === 0 || h === 0) return;

    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.setAttribute("width", w);
    svg.setAttribute("height", h);

    cols = Math.floor(w / SPACING) + 1;
    rows = Math.floor(h / SPACING) + 1;

    let html = "";
    const offsetX = (w - (cols - 1) * SPACING) / 2;
    const offsetY = (h - (rows - 1) * SPACING) / 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = offsetX + c * SPACING;
        const cy = offsetY + r * SPACING;
        html += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${DOT_RADIUS}"/>`;
      }
    }
    svg.innerHTML = html;
    dots = svg.querySelectorAll("circle");
    activeGlow.clear();
  }

  function addGlows() {
    if (!dots.length) return;
    const centers = Math.max(4, Math.floor(cols / 8));
    for (let i = 0; i < centers; i++) {
      const cIdx = Math.floor(Math.random() * cols);
      const rIdx = Math.floor(Math.random() * rows);
      const radius = 3 + Math.floor(Math.random() * 3);
      for (let dr = -radius; dr <= radius; dr++) {
        for (let dc = -radius; dc <= radius; dc++) {
          const distSq = dr * dr + dc * dc;
          if (distSq > radius * radius) continue;
          const r2 = rIdx + dr;
          const c2 = cIdx + dc;
          if (r2 < 0 || r2 >= rows || c2 < 0 || c2 >= cols) continue;
          const idx = r2 * cols + c2;
          const dot = dots[idx];
          if (!dot) continue;
          if (distSq <= 2) dot.classList.add("glow-2");
          else if (distSq <= 9) dot.classList.add("glow-1");
          activeGlow.add(dot);
        }
      }
    }
  }

  function cycle() {
    activeGlow.forEach(d => { d.classList.remove("glow-1", "glow-2"); });
    activeGlow.clear();
    cycleTimer = setTimeout(() => {
      addGlows();
      cycleTimer = setTimeout(cycle, 3000);
    }, 2000);
  }

  buildGrid();
  if (!reduce) {
    addGlows();
    cycleTimer = setTimeout(cycle, 3000);
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (cycleTimer) { clearTimeout(cycleTimer); cycleTimer = null; }
      buildGrid();
      if (!reduce) { addGlows(); cycleTimer = setTimeout(cycle, 3000); }
    }, 200);
  });
}

document.querySelectorAll(".hero-bg svg").forEach(svg => initDotGrid(svg));

/* ---------- Contact form (front-end only — replace with backend integration) ---------- */
(() => {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    // Compose WhatsApp message (15 3461-1074 for primary)
    const msg = `Olá! Vim pelo site CRL.\n\nNome: ${data.nome}\nEmpresa: ${data.empresa || "-"}\nE-mail: ${data.email}\nTelefone: ${data.telefone || "-"}\nAssunto: ${data.assunto}\n\n${data.mensagem}`;
    const url = `https://wa.me/551534611074?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener");
    const note = document.querySelector(".form-note");
    if (note) {
      note.textContent = "Abrindo o WhatsApp com sua mensagem…";
      note.style.color = "var(--navy-700)";
    }
  });
})();
