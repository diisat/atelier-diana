"use client";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
export default function NotFound() {
  const t = useTranslations("error");
  const locale = useLocale();
  return (
    <main id="main" className="wrap page-intro">
      <p className="eyebrow">404</p>
      <h1>{t("missing")}</h1>
      <Link href={`/${locale}`} className="button primary">
        {t("back")}
      </Link>
    </main>
  );
}
