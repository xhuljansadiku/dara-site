import type { Locale } from "@/lib/services-data";

export const GOOGLE_MAPS_PLACE_URL = "https://www.google.com/maps/place/DARA+MARKETING+AGENCY/@41.3226095,19.8161564,847m/data=!3m2!1e3!4b1!4m6!3m5!1s0x135031966872c267:0x3d7b8d966cb7b655!8m2!3d41.3226055!4d19.8187313!16s%2Fg%2F11tff8h77t?entry=ttu";

/**
 * Public Google reviews, translated. `source` separates agency clients from training
 * participants so the two are never presented as the same kind of proof.
 */
export type GoogleReview = {
  firstName: string;
  lastName?: string;
  rating: number;
  source: "client" | "training";
  text: Record<Locale, string>;
};

export function formatReviewerName(firstName: string, lastName?: string): string {
  if (!lastName) return firstName;
  const initial = lastName.charAt(0).toUpperCase();
  const first = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  return `${first} ${initial}.`;
}

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    firstName: "Sabina",
    lastName: "Tahiri",
    rating: 5,
    source: "training",
    text: {
      sq: "Kam qenë pjesë e trajnimit për Social Media Manager nga Dara Marketing Agency, dhe përvoja ka qenë jashtëzakonisht e vlefshme. Gjatë trajnimit fitova aftësi reale që mund t'i aplikoj menjëherë në punë. Nga strategjia e përmbajtjes deri te menaxhimi i platformave dhe analiza e rezultateve. E rekomandoj Dara Marketing Agency për këdo që dëshiron të zhvillohet në fushën e marketingut digjital dhe të fitojë përvojë!",
      en: "I was part of the Social Media Manager training from Dara Marketing Agency, and the experience was exceptionally valuable. During the training I gained real skills that I can apply immediately at work. From content strategy to platform management and results analysis. I recommend Dara Marketing Agency to anyone who wants to develop in digital marketing and gain experience!",
      de: "Ich war Teil des Social Media Manager Trainings von Dara Marketing Agency, und die Erfahrung war außergewöhnlich wertvoll. Während des Trainings habe ich echte Fähigkeiten erworben, die ich sofort im Beruf anwenden kann. Von der Content-Strategie bis zum Plattformmanagement und der Ergebnisanalyse. Ich empfehle Dara Marketing Agency jedem, der sich im digitalen Marketing weiterentwickeln möchte!",
    },
  },
  {
    firstName: "Adelaida",
    lastName: "Begaj",
    rating: 5,
    source: "training",
    text: {
      sq: "Trajnime SMM leksion + praktike ne klasë. Jam tepër e kënaqur me trajnimet nga Dara.",
      en: "SMM trainings with lectures and practice in class. I am very satisfied with the trainings from Dara.",
      de: "SMM-Trainings mit Vortrag und Praxis im Klassenzimmer. Ich bin sehr zufrieden mit den Trainings von Dara.",
    },
  },
  {
    firstName: "Flamur",
    lastName: "Doku",
    rating: 5,
    source: "training",
    text: {
      sq: "Shumë e rekomanduar. Jo vetëm përmirësova aftësitë e mia në social media që më ndihmojnë të mbaj dhe rrit bizneset e mia, por edhe u argëtova gjatë procesit. Pavarësisht nëse dëshiron të punosh në Marketing, të marketosh biznesin tënd, të bëhesh influencer ose thjesht të krijosh memorje më të mira online. Dara është më e mira. Faleminderit!",
      en: "Highly recommended. Not only did I enhance my social media skills that will help me better maintain and grow my businesses but I also had fun doing so. Whether you want to work in Marketing, market your own business, become an influencer or simply like to create better memories online. Dara is the best. Thank you!",
      de: "Sehr empfehlenswert. Ich habe nicht nur meine Social-Media-Fähigkeiten verbessert, die mir helfen, meine Unternehmen zu pflegen und auszubauen, sondern hatte dabei auch viel Spaß. Ob Sie im Marketing arbeiten, Ihr eigenes Unternehmen vermarkten, Influencer werden oder einfach bessere Erinnerungen online schaffen möchten. Dara ist die Beste. Danke!",
    },
  },
  {
    firstName: "Vals",
    rating: 5,
    source: "training",
    text: {
      sq: "Kam qenë pjesë e masterklasës në social media marketing të ofruar nga kjo agjenci. Masterklasa ishte shumë informative dhe kisha mundësinë të analizoj shembuj praktikë dhe të implementoj dizajne në Canva nën mbikëqyrjen e profesionistëve me përvojë. E rekomandoj për fillestarët që duan të njihen me marketingun në social media dhe të fillojnë karrierën në këtë fushë.",
      en: "I was part of the masterclass in social media marketing offered by this agency. The masterclass was very informative and I had the opportunity to analyse practical examples and implement designs in Canva with experienced professionals. I would recommend this for beginners who want to get familiar with Social media marketing and start their career in this field.",
      de: "Ich war Teil des Masterkurses in Social-Media-Marketing dieser Agentur. Der Masterkurs war sehr informativ und ich hatte die Gelegenheit, praktische Beispiele zu analysieren und Designs in Canva unter der Anleitung erfahrener Profis umzusetzen. Ich empfehle dies Anfängern, die sich mit Social-Media-Marketing vertraut machen und ihre Karriere in diesem Bereich starten möchten.",
    },
  },
  {
    firstName: "Ilo",
    lastName: "Sula",
    rating: 5,
    source: "client",
    text: {
      sq: "Kam pasur kënaqësinë të bashkëpunoj me Dara Marketing dhe mbeta shumë i impresionuar. Ekipi është shumë profesional, kreativ dhe gjithmonë i gatshëm për të gjetur zgjidhje unike për bizneset. Ajo që më pëlqeu më shumë ishte përkushtimi i tyre për të kuptuar nevojat specifike dhe për t'i kthyer ato në rezultate konkrete. Shërbim cilësor, komunikim i shkëlqyer dhe ide që bëjnë diferencën. Me plot bindje do ta rekomandoja për këdo që kërkon të rrisë praninë e biznesit në treg.",
      en: "I had the pleasure of collaborating with Dara Marketing and was very impressed. The team is very professional, creative and always ready to find unique solutions for businesses. What I liked most was their dedication to understanding specific needs and turning them into concrete results. Quality service, excellent communication and ideas that make a difference. I would wholeheartedly recommend them to anyone looking to increase their business presence in the market.",
      de: "Ich hatte das Vergnügen, mit Dara Marketing zusammenzuarbeiten und war sehr beeindruckt. Das Team ist sehr professionell, kreativ und immer bereit, einzigartige Lösungen für Unternehmen zu finden. Was mir am besten gefiel, war ihr Engagement, spezifische Bedürfnisse zu verstehen und sie in konkrete Ergebnisse umzuwandeln. Qualitätsservice, ausgezeichnete Kommunikation und Ideen, die den Unterschied machen. Ich empfehle sie jedem, der die Präsenz seines Unternehmens auf dem Markt erhöhen möchte.",
    },
  },
  {
    firstName: "Era",
    lastName: "Leka",
    rating: 5,
    source: "client",
    text: {
      sq: "Ekipi i Dara Marketing është gjithmonë i gatshëm të ndihmojë, plot ide kreative dhe energji pozitive. Falë tyre kemi parë ndryshime të vërteta në marketingun tonë.",
      en: "The Dara Marketing team is always ready to help, full of creative ideas and positive energy. Thanks to them we have seen real changes in our marketing.",
      de: "Das Dara Marketing Team ist immer bereit zu helfen, voller kreativer Ideen und positiver Energie. Dank ihnen haben wir echte Veränderungen in unserem Marketing gesehen.",
    },
  },
  {
    firstName: "Aldo",
    lastName: "Al",
    rating: 5,
    source: "client",
    text: {
      sq: "Stafi shumë profesional dhe e rekomandoj te çdo biznes që do t'i rritet audienca online!",
      en: "Very professional staff and I recommend them to every business that wants to grow its online audience!",
      de: "Sehr professionelles Team und ich empfehle sie jedem Unternehmen, das sein Online-Publikum vergrößern möchte!",
    },
  },
];
