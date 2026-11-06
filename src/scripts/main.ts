/**
 * Client behavior for the AIVectrix page. Everything here is progressive
 * enhancement: the page is complete and readable without it.
 */
import { STRANDS, strandPath, labelPos } from "./alignment";

const root = document.documentElement;
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const motionOK = () => !motionQuery.matches;

/* ---------------------------------------------------------------- header */
function initHeader() {
  const header = document.querySelector<HTMLElement>("[data-header]");
  if (!header) return;
  let ticking = false;
  const update = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();

  // Highlight the nav link for the section in view.
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".site-nav__link"));
  const sections = links
    .map((a) => document.querySelector<HTMLElement>(a.hash))
    .filter((s): s is HTMLElement => !!s);
  if ("IntersectionObserver" in window && sections.length) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          for (const a of links) {
            const on = a.hash === `#${e.target.id}`;
            a.classList.toggle("is-active", on);
            if (on) a.setAttribute("aria-current", "true");
            else a.removeAttribute("aria-current");
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
  }
}

/* ----------------------------------------------------------- mobile menu */
function initMenu() {
  const header = document.querySelector<HTMLElement>("[data-header]");
  const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const menu = document.querySelector<HTMLElement>("[data-mobile-menu]");
  const label = document.querySelector<HTMLElement>("[data-menu-label]");
  if (!header || !toggle || !menu) return;

  const focusables = () =>
    [toggle, ...Array.from(menu.querySelectorAll<HTMLElement>("a[href]"))].filter(
      (el) => el.offsetParent !== null,
    );

  const setOpen = (open: boolean, restoreFocus = true) => {
    toggle.setAttribute("aria-expanded", String(open));
    if (label) label.textContent = open ? "Close menu" : "Open menu";
    header.classList.toggle("is-open", open);
    menu.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      menu.querySelector<HTMLElement>("a[href]")?.focus();
    } else if (restoreFocus) {
      toggle.focus();
    }
  };

  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));

  menu.querySelectorAll<HTMLAnchorElement>("[data-menu-link]").forEach((a) =>
    a.addEventListener("click", () => setOpen(false, false)),
  );

  document.addEventListener("keydown", (e) => {
    if (menu.hidden) return;
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key === "Tab") {
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Close if the viewport grows past the mobile breakpoint.
  window.matchMedia("(min-width: 961px)").addEventListener("change", (e) => {
    if (e.matches && !menu.hidden) setOpen(false, false);
  });
}

/* ---------------------------------------------------------------- reveal */
function initReveal() {
  const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  if (!("IntersectionObserver" in window) || !motionOK()) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );
  items.forEach((el) => io.observe(el));
}

/* ------------------------------------------------- hero alignment visual */
function initAlignment() {
  const wrap = document.querySelector<HTMLElement>("[data-alignment]");
  const hero = document.querySelector<HTMLElement>(".hero");
  if (!wrap || !hero) return;

  if (!motionOK()) {
    wrap.classList.add("is-ready");
    return; // Static resolved state from the server render.
  }

  const groups = STRANDS.map((s) => {
    const g = wrap.querySelector<SVGGElement>(`[data-strand="${s.id}"]`)!;
    return {
      s,
      lines: Array.from(g.querySelectorAll<SVGPathElement>("path")),
      dot: g.querySelector<SVGCircleElement>("circle")!,
      label: g.querySelector<SVGTextElement>("text")!,
    };
  });

  const render = (p: number, drift: number, phase: number) => {
    for (const { s, lines, dot, label } of groups) {
      const d = strandPath(s, p, drift, phase);
      lines.forEach((l) => l.setAttribute("d", d));
      const [lx, ly] = labelPos(s, p);
      label.setAttribute("x", lx.toFixed(1));
      label.setAttribute("y", ly.toFixed(1));
      const [cx, cy] = [lx - 4, ly + 14];
      dot.setAttribute("cx", cx.toFixed(1));
      dot.setAttribute("cy", cy.toFixed(1));
    }
  };

  const isSmall = window.matchMedia("(max-width: 1100px)").matches;

  // Mobile and tablet: one short, one-time resolve. No scroll linkage.
  if (isSmall) {
    render(0, 0, 0);
    wrap.classList.add("is-ready");
    const start = performance.now();
    const dur = 1600;
    const step = (now: number) => {
      const t = Math.min(1, (now - start - 300) / dur);
      render(Math.max(0, t), 0, 0);
      if (t < 1) requestAnimationFrame(step);
      else wrap.classList.add("is-resolved");
    };
    requestAnimationFrame(step);
    return;
  }

  // Desktop: progress follows scroll from hero toward the approach section.
  // A small ambient drift fades out over a few seconds and then stops.
  const START_P = 0.08;
  const DRIFT = 10;
  const DRIFT_MS = 5000;
  const t0 = performance.now();
  let visible = true;
  let raf = 0;
  let lastP = -1;
  let resolvedOnce = false;

  let heroH = hero.offsetHeight || window.innerHeight;
  window.addEventListener("resize", () => (heroH = hero.offsetHeight || window.innerHeight), { passive: true });
  const progress = () => {
    const h = heroH;
    return Math.min(1, START_P + (window.scrollY / (h * 0.45)) * (1 - START_P));
  };

  const frame = (now: number) => {
    raf = 0;
    const p = progress();
    const age = now - t0;
    const drift = age < DRIFT_MS ? DRIFT * (1 - age / DRIFT_MS) * (1 - p) : 0;
    render(p, drift, age / 900);
    lastP = p;
    if (p >= 0.999 && !resolvedOnce) {
      resolvedOnce = true;
      wrap.classList.add("is-resolved");
    }
    // Keep animating only while the drift is still settling.
    if (drift > 0 && visible && !document.hidden) schedule();
  };
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(frame);
  };

  render(START_P, 0, 0);
  wrap.classList.add("is-ready");
  schedule();

  window.addEventListener(
    "scroll",
    () => {
      if (visible && Math.abs(progress() - lastP) > 0.001) schedule();
    },
    { passive: true },
  );
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && visible) schedule();
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
      if (visible) schedule();
    }).observe(wrap);
  }
}

/* --------------------------------------------------- AI section visual */
function initAIVisual() {
  const el = document.querySelector<HTMLElement>("[data-ai-visual]");
  if (!el) return;
  if (!("IntersectionObserver" in window) || !motionOK()) {
    el.classList.add("is-in");
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        el.classList.add("is-in");
        io.disconnect();
      }
    },
    { threshold: 0.4 },
  );
  io.observe(el);
}

/* ------------------------------------------------------------ copy email */
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy path */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

function initCopy() {
  document.querySelectorAll<HTMLButtonElement>("[data-copy-email]").forEach((btn) => {
    const email = btn.dataset.copyEmail ?? "";
    const status = btn.parentElement?.querySelector<HTMLElement>("[data-copy-status]");
    btn.hidden = false;
    let timer = 0;
    btn.addEventListener("click", async () => {
      const ok = await copyText(email);
      if (status) {
        status.textContent = ok
          ? "Email address copied."
          : `Couldn’t copy automatically. Select the address above to copy it: ${email}`;
        window.clearTimeout(timer);
        if (ok) timer = window.setTimeout(() => (status.textContent = ""), 4000);
      }
    });
  });
}

/* ------------------------------------------------------------------ year */
function initYear() {
  const y = String(new Date().getFullYear());
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = y));
}

initHeader();
initMenu();
initReveal();
initAlignment();
initAIVisual();
initCopy();
initYear();
root.classList.add("is-enhanced");
