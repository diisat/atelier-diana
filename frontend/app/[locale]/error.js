"use client";
import { useTranslations } from "next-intl";
export default function ErrorPage({ reset }) {
  const t = useTranslations("error");
  return (
    <main id="main" className="wrap page-intro">
      <h1>{t("title")}</h1>
      <p>{t("text")}</p>
      <button className="button primary" onClick={reset}>
        {t("retry")}
      </button>
    </main>
  );
}
