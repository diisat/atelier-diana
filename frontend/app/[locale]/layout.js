import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { messages, locales } from "../../lib/messages";
import { Header, Footer } from "../../components/Shell";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = messages[locale] || messages.en;
  return {
    title: {
      default: "Diana Torres — L’Atelier",
      template: "%s · Diana Torres",
    },
    description: m.home.intro,
    robots: { index: true, follow: true },
    icons: { icon: "/icon.svg" },
  };
}
export default async function Layout({ children, params }) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider
          locale={locale}
          messages={messages[locale]}
          timeZone="Europe/Paris"
        >
          <a className="skip-link" href="#main">
            {messages[locale].nav.skip}
          </a>
          <Header locale={locale} />
          {children}
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
