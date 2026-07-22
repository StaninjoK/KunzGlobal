import { useState } from "react";
import { Leaf, Mail, Phone, MapPin, ArrowUpRight, Instagram, Facebook } from "lucide-react";
import { navigate } from "../lib/router";
import { useLanguage } from "../i18n";

interface FooterProps {
  onHome?: () => void;
}

function FooterLogo() {
  const [imgFailed, setImgFailed] = useState(false);
  if (imgFailed) {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-600/30 transition-transform group-hover:scale-105">
        <Leaf className="h-5 w-5" strokeWidth={2.2} />
      </span>
    );
  }
  return (
    <img
      src="/images/logo.png"
      alt="Kunz Global Logo"
      onError={() => setImgFailed(true)}
      className="h-10 w-10 rounded-xl object-cover shadow-lg shadow-emerald-600/30 transition-transform group-hover:scale-105"
    />
  );
}

export function Footer({ onHome }: FooterProps) {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-600/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <button onClick={onHome} className="flex items-center gap-2.5 group">
              <FooterLogo />
              <span className="text-xl font-semibold text-white">
                Kunz <span className="font-light text-emerald-400">Global</span>
              </span>
            </button>
            <p className="mt-5 text-sm leading-relaxed text-slate-400 max-w-xs">{t.footer.tagline}</p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.instagram.com/kunzsourcing"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:bg-emerald-600 hover:text-white transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/share/1ELX6g9reX/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:bg-emerald-600 hover:text-white transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/message/FDT6WPLEOMFAE1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:bg-emerald-600 hover:text-white transition-colors text-[11px] font-semibold"
              >
                WA
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">{t.footer.subsidiariesTitle}</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <button
                  onClick={() => navigate("agrotech")}
                  className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  {t.companies.agrotech.name} <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </li>
              <li>
                <a
                  href="https://kunzagrotech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-emerald-400 transition-colors text-xs pl-0.5"
                >
                  kunzagrotech.com ↗
                </a>
              </li>
              <li>
                <button
                  onClick={() => navigate("fleisch")}
                  className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  {t.companies.sourcing.name} <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </li>
              <li>
                <a
                  href="https://kunzsourcing.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-emerald-400 transition-colors text-xs pl-0.5"
                >
                  kunzsourcing.com ↗
                </a>
              </li>
              <li className="text-slate-500 flex items-center gap-1.5 pt-1">
                {t.future.projects.solar.name} <span className="text-xs text-slate-600">{t.footer.soon}</span>
              </li>
              <li className="text-slate-500 flex items-center gap-1.5">
                {t.future.projects.recycling.name} <span className="text-xs text-slate-600">{t.footer.soon}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">{t.footer.navTitle}</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <button onClick={onHome} className="text-slate-400 hover:text-emerald-400 transition-colors">{t.nav.home}</button>
              </li>
              <li>
                <a href="#/#ueber-uns" className="text-slate-400 hover:text-emerald-400 transition-colors">{t.nav.about}</a>
              </li>
              <li>
                <a href="#/#kontakt" className="text-slate-400 hover:text-emerald-400 transition-colors">{t.nav.contact}</a>
              </li>
              <li className="pt-2 mt-2 border-t border-slate-800">
                <button onClick={() => navigate("impressum")} className="text-slate-400 hover:text-emerald-400 transition-colors">{t.footer.impressum}</button>
              </li>
              <li>
                <button onClick={() => navigate("datenschutz")} className="text-slate-400 hover:text-emerald-400 transition-colors">{t.footer.datenschutz}</button>
              </li>
              <li>
                <button onClick={() => navigate("agb")} className="text-slate-400 hover:text-emerald-400 transition-colors">{t.footer.agb}</button>
              </li>
            </ul>
          </div>

          <div id="kontakt">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">{t.footer.contactTitle}</h4>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-slate-400">
                  {t.footer.addressLines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < t.footer.addressLines.length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-400 shrink-0" />
                <a href="mailto:Stan@kunzglobal.com" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Stan@kunzglobal.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-400 shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+59892800358" className="text-slate-400 hover:text-emerald-400 transition-colors">
                    +598 92 800 358
                  </a>
                  <a href="tel:+4963449269681" className="text-slate-400 hover:text-emerald-400 transition-colors">
                    +49 6344 9269681
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Kunz Global. {t.footer.rights}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <button onClick={() => navigate("impressum")} className="hover:text-emerald-400 transition-colors">{t.footer.impressum}</button>
            <button onClick={() => navigate("datenschutz")} className="hover:text-emerald-400 transition-colors">{t.footer.datenschutzShort}</button>
            <button onClick={() => navigate("agb")} className="hover:text-emerald-400 transition-colors">{t.footer.agb}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
