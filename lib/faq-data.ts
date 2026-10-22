import type { Locale } from "@/lib/services-data";
import { PACKAGES_BY_GROUP_AND_LOCALE, type PackageGroup } from "@/lib/packages-data";

export type FaqItem = { q: string; a: string };

/** Package price without the "From/Nga/Ab" prefix, so FAQ answers always match the packages. */
function price(locale: Locale, group: PackageGroup, index: number): string {
  const raw = PACKAGES_BY_GROUP_AND_LOCALE[locale][group][index]?.price ?? "";
  return raw.replace(/^(Nga|From|Ab)\s+/i, "");
}

function buildFaq(locale: Locale): FaqItem[] {
  const landing = price(locale, "websiteLanding", 0);
  const business = price(locale, "websiteLanding", 1);
  const premium = price(locale, "websiteLanding", 2);
  const shop = price(locale, "ecommerce", 0);
  const shopStandard = price(locale, "ecommerce", 1);
  const maintenance = price(locale, "maintenance", 0);

  if (locale === "sq") {
    return [
      { q: "Sa kushton krijimi i një website?", a: `Landing page nga ${landing}, website biznesi (deri 5–7 faqe) nga ${business}, website premium me dizajn unik nga ${premium}. Çmimi final varet nga scope-i; ju dërgojmë ofertë të personalizuar pas bisedës fillestare.` },
      { q: "Sa kohë duhet për ndërtimin e një website?", a: "Landing page: 1–2 javë. Website me disa faqe: 2–4 javë. Dyqan online: 4–8 javë. Afatet e sakta përcaktohen në ofertë." },
      { q: "A mund të krijoni dyqan online (webshop)?", a: `Po: katalog produktesh, pagesë online, transport dhe inventar. Basic Shop (deri 30 produkte) nga ${shop}, Standard Shop (deri 150 produkte) nga ${shopStandard}.` },
      { q: "A përfshihet buxheti i reklamave në çmimin e menaxhimit të reklamave?", a: "Jo. Tarifa e menaxhimit nuk përfshin buxhetin që paguhet te Meta ose Google. Buxhetin e vendosni ju; ne e menaxhojmë dhe e optimizojmë." },
      { q: "A e bëni edhe SEO për website?", a: "Çdo website përfshin SEO bazë: meta tags, strukturë headings dhe faqe mobile-friendly. Optimizimi i avancuar SEO ofrohet veçmas." },
      { q: "A ofroni mirëmbajtje mujore për website?", a: `Po, nga ${maintenance}: përditësime, backups, siguri bazë dhe monitorim. Paketat më të plota përfshijnë optimizim shpejtësie dhe raportim mujor.` },
      { q: "Si funksionon procesi i punës?", a: "Bisedë fillestare për qëllimet → propozim për strukturën dhe ofertën → zhvillim me aprovime nga ju → testim dhe lansim. Komunikojmë hap pas hapi." },
      { q: "Sa shpejt na ktheni përgjigje dhe kur mund të fillojmë?", a: "Ju kthejmë përgjigje brenda 24 orëve. Fillimi varet nga lloji i projektit; disa projekte nisin brenda 1–2 javëve." },
      { q: "Si paguhet?", a: "Oferta përfshin çmimin dhe kushtet e pagesës. Zakonisht kërkohet një depozitë fillestare dhe pjesa tjetër pas përfundimit ose sipas fazave." },
      { q: "A punoni me biznese të vogla dhe me klientë jashtë Shqipërisë?", a: "Po. Punojmë me startup-e, biznese të vogla dhe kompani, në Shqipëri dhe jashtë saj. Komunikojmë në shqip, anglisht dhe gjermanisht." },
      { q: "A mund të bëni website në disa gjuhë?", a: "Po. Ndërtojmë website shumëgjuhëshe (p.sh. shqip, anglisht, gjermanisht), sipas nevojës së biznesit tuaj." },
      { q: "A ofroni trajnime për ekipe?", a: "Po. Trajnime praktike për social media marketing, në grup ose 1:1. Kursi Web Developer do të hapet së shpejti." },
    ];
  }

  if (locale === "de") {
    return [
      { q: "Was kostet eine Website?", a: `Landingpage ab ${landing}, Business-Website (bis 5–7 Seiten) ab ${business}, Premium-Website mit individuellem Design ab ${premium}. Der Endpreis hängt vom Umfang ab; Sie erhalten nach dem Erstgespräch ein individuelles Angebot.` },
      { q: "Wie lange dauert die Erstellung einer Website?", a: "Landingpage: 1–2 Wochen. Mehrseitige Website: 2–4 Wochen. Online-Shop: 4–8 Wochen. Die genauen Zeiten stehen im Angebot." },
      { q: "Können Sie einen Online-Shop erstellen?", a: `Ja: Produktkatalog, Online-Zahlung, Versand und Lagerverwaltung. Basic Shop (bis 30 Produkte) ab ${shop}, Standard Shop (bis 150 Produkte) ab ${shopStandard}.` },
      { q: "Ist das Werbebudget im Preis für Ads Management enthalten?", a: "Nein. Die Management-Gebühr enthält nicht das Budget, das an Meta oder Google gezahlt wird. Sie legen das Budget fest; wir verwalten und optimieren es." },
      { q: "Ist SEO enthalten?", a: "Jede Website enthält Basis-SEO: Meta-Tags, saubere Überschriften-Struktur und mobilfreundliche Seiten. Fortgeschrittene SEO-Optimierung bieten wir separat an." },
      { q: "Bieten Sie monatliche Website-Wartung an?", a: `Ja, ab ${maintenance}: Updates, Backups, Basis-Sicherheit und Monitoring. Größere Pakete enthalten Geschwindigkeitsoptimierung und monatliches Reporting.` },
      { q: "Wie läuft die Zusammenarbeit ab?", a: "Erstgespräch zu Zielen → Vorschlag für Struktur und Angebot → Umsetzung mit Ihren Freigaben → Test und Launch. Wir kommunizieren Schritt für Schritt." },
      { q: "Wie schnell antworten Sie und wann können wir starten?", a: "Wir melden uns innerhalb von 24 Stunden. Der Start hängt vom Projekttyp ab; manche Projekte beginnen innerhalb von 1–2 Wochen." },
      { q: "Wie funktioniert die Zahlung?", a: "Das Angebot enthält Preis und Zahlungsbedingungen. Üblich ist eine Anzahlung, der Rest bei Fertigstellung oder nach Projektphasen." },
      { q: "Arbeiten Sie mit kleinen Unternehmen und Kunden außerhalb Albaniens?", a: "Ja. Wir arbeiten mit Startups, kleinen Unternehmen und Firmen in Albanien und im Ausland. Wir kommunizieren auf Albanisch, Englisch und Deutsch." },
      { q: "Können Sie mehrsprachige Websites erstellen?", a: "Ja. Wir erstellen mehrsprachige Websites (z. B. Albanisch, Englisch, Deutsch), je nach Bedarf Ihres Unternehmens." },
      { q: "Bieten Sie Schulungen für Teams an?", a: "Ja. Praxisnahe Social-Media-Marketing-Trainings, in der Gruppe oder 1:1. Der Web-Entwickler-Kurs startet demnächst." },
    ];
  }

  return [
    { q: "How much does a website cost?", a: `Landing page from ${landing}, business website (up to 5–7 pages) from ${business}, premium website with a unique design from ${premium}. The final price depends on scope; you receive a tailored quote after an initial conversation.` },
    { q: "How long does it take to build a website?", a: "Landing page: 1–2 weeks. Multi-page website: 2–4 weeks. Online store: 4–8 weeks. Exact timelines are set out in the quote." },
    { q: "Can you build an online store?", a: `Yes: product catalogue, online payment, shipping and inventory. Basic Shop (up to 30 products) from ${shop}, Standard Shop (up to 150 products) from ${shopStandard}.` },
    { q: "Is ad spend included in the ads management price?", a: "No. The management fee does not include the budget paid to Meta or Google. You set the budget; we manage and optimise it." },
    { q: "Is SEO included?", a: "Every website includes basic SEO: meta tags, a clean heading structure and mobile-friendly pages. Advanced SEO optimisation is offered separately." },
    { q: "Do you offer monthly website maintenance?", a: `Yes, from ${maintenance}: updates, backups, basic security and monitoring. Larger plans add speed optimisation and monthly reporting.` },
    { q: "What does the process look like?", a: "Initial call about your goals → proposal for structure and scope → build with your approvals → testing and launch. We keep you updated at every step." },
    { q: "How quickly do you reply, and when can we start?", a: "We reply within 24 hours. The start date depends on the project type; some projects begin within 1–2 weeks." },
    { q: "How is payment handled?", a: "The quote includes the price and payment terms. Usually an initial deposit is required, with the rest on completion or by project phase." },
    { q: "Do you work with small businesses and clients outside Albania?", a: "Yes. We work with startups, small businesses and larger companies in Albania and abroad. We communicate in Albanian, English and German." },
    { q: "Can you build a multilingual website?", a: "Yes. We build multilingual websites (for example Albanian, English and German), depending on what your business needs." },
    { q: "Do you offer training for teams?", a: "Yes. Practical social media marketing training, in groups or 1:1. The Web Developer course is coming soon." },
  ];
}

export const FAQ_BY_LOCALE: Record<Locale, FaqItem[]> = {
  sq: buildFaq("sq"),
  en: buildFaq("en"),
  de: buildFaq("de"),
};

/** Number of questions shown in the homepage preview (full list on /faq). */
export const HOME_FAQ_COUNT = 6;
