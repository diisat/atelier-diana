import { getRequestConfig } from "next-intl/server";
import { messages, locales } from "../lib/messages";
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = locales.includes(requested) ? requested : "en";
  return { locale, messages: messages[locale], timeZone: "Europe/Paris" };
});
