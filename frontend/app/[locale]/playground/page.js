import { messages } from "../../../lib/messages";
import HobbyGame from "../../../components/HobbyGame";
export default async function Playground({ params }) {
  const { locale } = await params;
  const t = messages[locale].play;
  return (
    <main id="main" className="wrap playground-page">
      <section className="page-intro">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
      </section>
      <HobbyGame />
    </main>
  );
}
