"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowUpRight, ArrowUp, Menu, X } from "lucide-react";

export function Header({ locale }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navigation = [
    ["work", `/${locale}/work`],
    ["journey", `/${locale}/#journey`],
    ["about", `/${locale}/about`],
    ["play", `/${locale}/playground`],
  ];
  return (
    <header className="site-header wrap" id="top">
      <Link
        className="wordmark"
        href={`/${locale}`}
        aria-label={`Diana Torres · ${t("home")}`}
      >
        diana torres<span>.</span>
      </Link>
      <nav
        className={`main-nav ${open ? "is-open" : ""}`}
        aria-label="Portfolio"
      >
        {navigation.map(([key, url]) => (
          <Link
            key={key}
            href={url}
            onClick={() => setOpen(false)}
            aria-current={pathname === url ? "page" : undefined}
          >
            {t(key)}
          </Link>
        ))}
      </nav>
      <div className="header-right">
        <div
          className="language-switch"
          role="group"
          aria-label={t("language")}
        >
          {["en", "fr", "es"].map((lang) => (
            <a
              key={lang}
              href={pathname.replace(/^\/(en|fr|es)(?=\/|$)/, `/${lang}`)}
              onClick={(e) => {
                if (window.location.hash)
                  e.currentTarget.href += window.location.hash;
                setOpen(false);
              }}
              aria-current={locale === lang ? "true" : undefined}
              lang={lang}
              hrefLang={lang}
            >
              {lang.toUpperCase()}
            </a>
          ))}
        </div>
        <a className="contact-link" href="mailto:dianatorresrojas4@gmail.com">
          {t("contact")}
          <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={t(open ? "close" : "menu")}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
export function Footer({ locale }) {
  const t = useTranslations("footer");
  return (
    <footer className="footer wrap">
      <div className="footer-top">
        <div>
          <p className="eyebrow">L’ATELIER DE DIANA</p>
          <h2>{t("title")}</h2>
          <p>{t("text")}</p>
        </div>
        <a
          className="circle-link"
          href="mailto:dianatorresrojas4@gmail.com"
          aria-label={t("email")}
        >
          <ArrowUpRight strokeWidth={1} size={44} />
        </a>
      </div>
      <div className="footer-links">
        <a href="mailto:dianatorresrojas4@gmail.com">
          {t("email")} <ArrowUpRight size={15} />
        </a>
        <a
          href="https://www.linkedin.com/in/dianaitr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("linkedin")} <ArrowUpRight size={15} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Diana Torres</span>
        <span>{t("made")}</span>
        <a href="#top" aria-label={t("top")}>
          <ArrowUp size={18} />
        </a>
      </div>
    </footer>
  );
}
