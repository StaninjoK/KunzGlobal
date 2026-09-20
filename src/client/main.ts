// The whole client side of kunzglobal.com: no framework, progressive enhancement only.
import "@fontsource-variable/inter-tight/wght.css";
import "@fontsource/instrument-serif/400-italic.css";
import "../styles/tokens.css";
import "../styles/base.css";
import "../styles/sections.css";
import "../styles/motion.css";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

/* ---------- header ---------- */
function initHeader(): void {
  const header = document.querySelector<HTMLElement>("[data-header]");
  if (!header) return;
  const update = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
  update();
  window.addEventListener("scroll", update, { passive: true });

  const langMenu = document.querySelector<HTMLDetailsElement>("[data-lang-menu]");
  if (langMenu) {
    document.addEventListener("click", (event) => {
      if (langMenu.open && !langMenu.contains(event.target as Node)) langMenu.open = false;
    });
    langMenu.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        langMenu.open = false;
        langMenu.querySelector("summary")?.focus();
      }
    });
  }
}

/* ---------- mobile menu ---------- */
function initMobileMenu(): void {
  const burger = document.querySelector<HTMLButtonElement>("[data-burger]");
  const menu = document.querySelector<HTMLElement>("[data-mobile-menu]");
  if (!burger || !menu) return;
  const label = burger.querySelector<HTMLElement>(".sr-only");

  const setOpen = (open: boolean) => {
    menu.hidden = !open;
    burger.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
    if (label) label.textContent = (open ? burger.dataset.labelClose : burger.dataset.labelOpen) ?? "";
    if (open) menu.querySelector<HTMLAnchorElement>("a")?.focus();
  };

  burger.addEventListener("click", () => setOpen(menu.hidden));
  menu.addEventListener("click", (event) => {
    if ((event.target as HTMLElement).closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      setOpen(false);
      burger.focus();
    }
    // keep focus inside the open menu (burger + menu links)
    if (event.key === "Tab" && !menu.hidden) {
      const items = [burger, ...menu.querySelectorAll<HTMLElement>("a")];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  window.matchMedia("(min-width: 960px)").addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}

/* ---------- scroll reveals ---------- */
function initReveals(): void {
  const targets = document.querySelectorAll<HTMLElement>("[data-reveal], [data-eco]");
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-in"));
    return;
  }
  // siblings revealed together get a small stagger
  const groups = new Map<Element, number>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const parent = el.parentElement;
        if (parent && !el.style.getPropertyValue("--i")) {
          const index = groups.get(parent) ?? 0;
          el.style.setProperty("--reveal-i", String(Math.min(index, 4)));
          groups.set(parent, index + 1);
          window.setTimeout(() => groups.delete(parent), 400);
        }
        el.classList.add("is-in");
        observer.unobserve(el);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );
  targets.forEach((el) => observer.observe(el));
}

/* ---------- ecosystem hover / focus ---------- */
function initEcosystem(): void {
  const eco = document.querySelector<HTMLElement>("[data-eco]");
  const panel = eco?.querySelector<HTMLElement>("[data-eco-panel]");
  if (!eco || !panel) return;
  const title = panel.querySelector<HTMLElement>("[data-eco-panel-title]")!;
  const category = panel.querySelector<HTMLElement>("[data-eco-panel-category]")!;
  const text = panel.querySelector<HTMLElement>("[data-eco-panel-text]")!;
  let swap = 0;

  const show = (node: HTMLElement | null) => {
    eco.classList.toggle("has-active", !!node);
    eco.querySelectorAll(".is-active").forEach((el) => el.classList.remove("is-active"));
    if (node) {
      node.classList.add("is-active");
      eco.querySelector(`[data-eco-line="${node.dataset.ecoNode}"]`)?.classList.add("is-active");
    }
    const next = {
      title: node?.dataset.ecoTitle ?? panel.dataset.defaultTitle ?? "",
      category: node?.dataset.ecoCategory ?? panel.dataset.defaultCategory ?? "",
      text: node?.dataset.ecoText ?? panel.dataset.defaultText ?? "",
    };
    if (title.textContent === next.title) return;
    window.clearTimeout(swap);
    panel.classList.add("is-swapping");
    swap = window.setTimeout(
      () => {
        title.textContent = next.title;
        category.textContent = next.category;
        text.textContent = next.text;
        panel.classList.remove("is-swapping");
      },
      reducedMotion.matches ? 0 : 180
    );
  };

  eco.querySelectorAll<HTMLElement>("[data-eco-node]").forEach((node) => {
    node.addEventListener("pointerenter", () => show(node));
    node.addEventListener("focus", () => show(node));
    node.addEventListener("pointerleave", () => show(null));
    node.addEventListener("blur", () => show(null));
  });
}

/* ---------- parallax (desktop, fine pointer, motion allowed) ---------- */
function initParallax(): void {
  if (reducedMotion.matches || !finePointer.matches) return;

  const images = Array.from(document.querySelectorAll<HTMLElement>(".parallax"));
  if (images.length) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      for (const el of images) {
        const frame = el.parentElement!.getBoundingClientRect();
        if (frame.bottom < 0 || frame.top > vh) continue;
        const progress = (frame.top + frame.height / 2 - vh / 2) / vh; // -0.5 … 0.5 around the centre
        el.style.setProperty("--shift", (progress * -frame.height * 0.12).toFixed(1));
      }
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    update();
  }

  const net = document.querySelector<SVGElement>("[data-parallax-pointer]");
  const hero = net?.closest<HTMLElement>(".hero");
  if (net && hero) {
    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      net.style.setProperty("--px", (((event.clientX - rect.left) / rect.width - 0.5) * -18).toFixed(1));
      net.style.setProperty("--py", (((event.clientY - rect.top) / rect.height - 0.5) * -14).toFixed(1));
    });
  }
}

/* ---------- contact form: sends to the configured endpoint, otherwise prepares an e-mail ---------- */
function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>("[data-contact-form]");
  if (!form) return;
  const success = form.querySelector<HTMLElement>("[data-form-success]");
  const failure = form.querySelector<HTMLElement>("[data-form-failure]");
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const buttonLabel = form.querySelector<HTMLElement>("[data-form-label]");
  const loadedAt = Date.now();
  let busy = false;

  const setError = (field: HTMLInputElement | HTMLTextAreaElement, message: string) => {
    field.setAttribute("aria-invalid", message ? "true" : "false");
    const target = document.getElementById(`${field.id}-error`);
    if (target) target.textContent = message;
  };

  const validate = (field: HTMLInputElement | HTMLTextAreaElement): boolean => {
    const value = field.value.trim();
    if (field.required && !value) {
      setError(field, form.dataset.errorRequired ?? "");
      return false;
    }
    if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError(field, form.dataset.errorEmail ?? "");
      return false;
    }
    setError(field, "");
    return true;
  };

  const fields = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea")).filter((field) => field.name !== "website");
  fields.forEach((field) => field.addEventListener("blur", () => field.value && validate(field)));

  const show = (el: HTMLElement | null, visible: boolean) => {
    if (!el) return;
    el.hidden = !visible;
    if (visible) el.focus();
  };

  /** Posts form-encoded data (a simple CORS request, no preflight) and resolves only on a confirmed delivery. */
  const send = async (endpoint: string, data: FormData): Promise<void> => {
    const body = new URLSearchParams();
    for (const key of ["name", "company", "email", "area", "message", "website"]) body.set(key, String(data.get(key) ?? "").trim());
    body.set("lang", form.dataset.lang ?? "en");
    body.set("t", String(Date.now() - loadedAt));
    const response = await fetch(endpoint, { method: "POST", body });
    const result = (await response.json()) as { ok?: boolean };
    if (!response.ok || !result.ok) throw new Error("rejected");
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (busy) return;
    const invalid = fields.filter((field) => !validate(field));
    if (invalid.length) {
      invalid[0].focus();
      return;
    }
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    const endpoint = form.dataset.endpoint;
    if (endpoint) {
      const idleLabel = buttonLabel?.textContent ?? "";
      busy = true;
      if (button) button.disabled = true;
      if (buttonLabel) buttonLabel.textContent = form.dataset.sending ?? idleLabel;
      show(success, false);
      show(failure, false);
      send(endpoint, data)
        .then(() => {
          form.reset();
          show(success, true);
        })
        .catch(() => show(failure, true))
        .finally(() => {
          busy = false;
          if (button) button.disabled = false;
          if (buttonLabel) buttonLabel.textContent = idleLabel;
        });
      return;
    }
    const label = (name: string) => form.querySelector(`label[for="cf-${name}"]`)?.firstChild?.textContent?.trim() ?? name;
    const lines = [
      get("message"),
      "",
      "—",
      `${label("name")}: ${get("name")}`,
      get("company") ? `${label("company")}: ${get("company")}` : "",
      `${label("email")}: ${get("email")}`,
      `${label("area")}: ${get("area")}`,
    ].filter((line, i) => line || i === 1);
    const subject = `${form.dataset.subject} — ${get("area")}`;
    window.location.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    if (success) {
      success.hidden = false;
      success.focus?.();
    }
  });
}

initHeader();
initMobileMenu();
initReveals();
initEcosystem();
initParallax();
initContactForm();
