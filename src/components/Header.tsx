import { useEffect, useState } from "react";
import { Menu, X, Leaf } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "../i18n";

interface HeaderProps {
  onHome?: () => void;
}

/**
 * Logo: legt eine Datei unter /public/images/logo.png ab, um dieses Icon zu
 * ersetzen. Solange keine eigene Datei vorhanden ist, wird automatisch auf
 * das Blatt-Icon zurueckgefallen (kein kaputtes Bild-Symbol).
 */
function Logo() {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-600/20 transition-transform group-hover:scale-105">
        <Leaf className="h-5 w-5" strokeWidth={2.2} />
      </span>
    );
  }

  return (
    <img
      src="/images/logo.png"
      alt="Kunz Global Logo"
      onError={() => setImgFailed(true)}
      className="h-10 w-10 rounded-xl object-cover shadow-lg shadow-emerald-600/20 transition-transform group-hover:scale-105"
    />
  );
}

export function Header({ onHome }: HeaderProps) {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t.nav.home, href: "#/" },
    { label: t.nav.about, href: "#/#ueber-uns" },
    { label: t.nav.contact, href: "#/#kontakt" },
  ];

  const handleNav = (href: string) => {
    setOpen(false);
    if (href === "#/" && onHome) {
      onHome();
      return;
    }
    if (href.startsWith("#/#")) {
      const id = href.slice(2);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 60);
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-slate-200/70 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex h-20 items-center justify-between">
          <button
            onClick={() => handleNav("#/")}
            className="group flex items-center gap-2.5"
            aria-label="Kunz Global Startseite"
          >
            <Logo />
            <span
              className={`text-xl font-semibold tracking-tight transition-colors ${
                scrolled ? "text-slate-900" : "text-white"
              }`}
            >
              Kunz <span className="font-light text-emerald-500">Global</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            <nav className="flex items-center gap-1">
              {links.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    scrolled
                      ? "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="ml-2 pl-2 border-l border-current/10">
              <LanguageSwitcher scrolled={scrolled} />
            </div>
          </div>

          <div className="md:hidden flex items-center gap-1">
            <LanguageSwitcher scrolled={scrolled} />
            <button
              className={`p-2 rounded-lg transition-colors ${
                scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
              }`}
              onClick={() => setOpen((v) => !v)}
              aria-label="Menü umschalten"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4 pt-2 border-t border-slate-200/70">
            <div className="flex flex-col gap-1 bg-white rounded-xl p-2 shadow-lg">
              {links.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="px-4 py-3 text-left text-sm font-medium text-slate-700 rounded-lg hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
