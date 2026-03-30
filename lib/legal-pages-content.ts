/**
 * Privacy & Terms copy: sq / en / de (legal overview pages).
 */

export type LegalLocale = "sq" | "en" | "de";

export type LegalSection =
  | { title: string; paragraphs: string[] }
  | { title: string; list: string[] };

export type LegalPageContent = {
  meta: { title: string; description: string; h1: string; intro: string };
  sections: LegalSection[];
};

export const LEGAL_CONTACT_EMAIL = "daramarketing.eu@gmail.com";

const CONTACT_EMAIL = LEGAL_CONTACT_EMAIL;

export const PRIVACY_BY_LOCALE: Record<LegalLocale, LegalPageContent> = {
  sq: {
    meta: {
      title: "Politika e privatësisë",
      description:
        "Si DARA mbledh, përdor dhe mbron të dhënat personale të vizitorëve dhe klientëve. Agjenci marketingu në Tiranë.",
      h1: "Politika e privatësisë",
      intro:
        "Kjo faqe shpjegon se si DARA mbledh, përdor dhe mbron të dhënat personale të vizitorëve dhe klientëve.",
    },
    sections: [
      {
        title: "1. Të dhënat që mbledhim",
        paragraphs: [
          "Ne mbledhim vetëm informacionin që na dërgon vetë përdoruesi përmes formave të kontaktit, aplikimeve për karrierë, regjistrimeve për trajnime ose newsletter-it (p.sh. emër, email, telefon, mesazh, pozicion i aplikimit, dokumente të ngarkuara kur kërkohen).",
        ],
      },
      {
        title: "2. Si i përdorim të dhënat",
        list: [
          "Për t’ju përgjigjur kërkesave dhe për të ofruar shërbimet e konaktuara",
          "Për administrimin e marrëdhënieve me klientin dhe faturimin, kur aplikohet",
          "Për komunikim marketingu vetëm kur keni dhënë pëlqim të qartë (ose kur lejon ligji)",
        ],
      },
      {
        title: "3. Cookies dhe matje",
        paragraphs: [
          "Website-i mund të përdorë cookies ose teknologji të ngjashme për funksionim bazik, siguri dhe statistika të përgjithshme (p.sh. faqet më të vizituara). Nuk përdorim cookie për qëllime të panevojshme pa një bazë ligjore ose pa pëlqimin tuaj kur kërkohet.",
        ],
      },
      {
        title: "4. Ruajtja dhe siguria",
        paragraphs: [
          "Të dhënat ruhen për aq kohë sa është e nevojshme për qëllimet e mësipërme ose sipas kërkesave ligjore. Aplikojmë masa të arsyeshme organizative dhe teknike për të mbrojtur informacionin. Nuk i shesim të dhënat tuaja; ndarja me ofrues shërbimesh (p.sh. hosting, email) bhet vetëm kur është e nevojshme për të ofruar shërbimin ose kur kërkohet nga ligji.",
        ],
      },
      {
        title: "5. Të drejtat tuaja",
        paragraphs: [
          "Në varësi të rastit, ju mund të keni të drejtë të kërkoni akses, korrigjim, fshirje, kufizim të përpunimit, transferueshmëri ose të kundërshtoni përpunimin. Mund të tërhiqni pëlqimin për marketing në çdo kohë. Për kërkesa, na shkruani në adresën më poshtë.",
        ],
      },
      {
        title: "6. Kontakt",
        paragraphs: [
          `Për çdo pyetje lidhur me privatësinë ose për të ushtruar të drejtat tuaja, na kontaktoni në: ${CONTACT_EMAIL}`,
        ],
      },
    ],
  },
  en: {
    meta: {
      title: "Privacy Policy",
      description:
        "How DARA Marketing Agency collects, uses and protects personal data of visitors and clients.",
      h1: "Privacy Policy",
      intro:
        "This page explains how DARA collects, uses and protects the personal data of visitors and clients.",
    },
    sections: [
      {
        title: "1. Data we collect",
        paragraphs: [
          "We only collect information that you voluntarily submit through contact forms, career applications, training sign-ups or our newsletter (e.g. name, email, phone, message, role applied for, and documents you upload where required).",
        ],
      },
      {
        title: "2. How we use your data",
        list: [
          "To respond to enquiries and deliver the services you request",
          "To manage the client relationship and billing, where applicable",
          "For marketing communications only where you have given clear consent (or where permitted by law)",
        ],
      },
      {
        title: "3. Cookies and analytics",
        paragraphs: [
          "The site may use cookies or similar technologies for basic functionality, security and high-level statistics (e.g. popular pages). We do not use cookies for unnecessary purposes without a legal basis or, where required, your consent.",
        ],
      },
      {
        title: "4. Retention and security",
        paragraphs: [
          "We keep data only as long as needed for the purposes above or as required by law. We apply reasonable organisational and technical measures to protect information. We do not sell your data; sharing with service providers (e.g. hosting, email) happens only when necessary to provide the service or when legally required.",
        ],
      },
      {
        title: "5. Your rights",
        paragraphs: [
          "Depending on your situation, you may have the right to request access, rectification, erasure, restriction of processing, data portability or to object to processing. You may withdraw consent for marketing at any time. Contact us at the address below to exercise these rights.",
        ],
      },
      {
        title: "6. Contact",
        paragraphs: [
          `For privacy questions or to exercise your rights, contact us at: ${CONTACT_EMAIL}`,
        ],
      },
    ],
  },
  de: {
    meta: {
      title: "Datenschutzerklärung",
      description:
        "Wie die DARA Marketing Agency personenbezogene Daten von Besuchern und Kunden erhebt, nutzt und schützt.",
      h1: "Datenschutzerklärung",
      intro:
        "Diese Seite erläutert, wie DARA personenbezogene Daten von Besuchern und Kunden erhebt, nutzt und schützt.",
    },
    sections: [
      {
        title: "1. Welche Daten wir erheben",
        paragraphs: [
          "Wir erheben nur Informationen, die Sie uns freiwillig über Kontaktformulare, Bewerbungen, Trainingsanmeldungen oder den Newsletter mitteilen (z. B. Name, E-Mail, Telefon, Nachricht, beworbene Position und hochgeladene Unterlagen, soweit erforderlich).",
        ],
      },
      {
        title: "2. Zweck der Verarbeitung",
        list: [
          "Beantwortung von Anfragen und Erbringung der vereinbarten Leistungen",
          "Verwaltung der Kundenbeziehung und Abrechnung, soweit zutreffend",
          "Marketingkommunikation nur bei ausdrücklicher Einwilligung (oder wenn gesetzlich zulässig)",
        ],
      },
      {
        title: "3. Cookies und Messung",
        paragraphs: [
          "Die Website kann Cookies oder ähnliche Technologien für Grundfunktionen, Sicherheit und allgemeine Statistiken (z. B. häufig besuchte Seiten) einsetzen. Wir setzen keine Cookies für unnötige Zwecke ohne Rechtsgrundlage oder – wo erforderlich – ohne Ihre Einwilligung ein.",
        ],
      },
      {
        title: "4. Speicherung und Sicherheit",
        paragraphs: [
          "Wir speichern Daten nur so lange, wie es für die genannten Zwecke oder gesetzlich nötig ist. Wir treffen angemessene organisatorische und technische Maßnahmen zum Schutz der Daten. Wir verkaufen keine Daten; eine Weitergabe an Dienstleister (z. B. Hosting, E-Mail) erfolgt nur, soweit dies zur Erbringung der Leistung erforderlich ist oder gesetzlich vorgeschrieben ist.",
        ],
      },
      {
        title: "5. Ihre Rechte",
        paragraphs: [
          "Je nach Fall können Sie Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit oder Widerspruch haben. Einwilligungen zur Marketingkommunikation können Sie jederzeit widerrufen. Wenden Sie sich hierfür an die unten genannte Adresse.",
        ],
      },
      {
        title: "6. Kontakt",
        paragraphs: [
          `Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte erreichen Sie uns unter: ${CONTACT_EMAIL}`,
        ],
      },
    ],
  },
};

export const TERMS_BY_LOCALE: Record<LegalLocale, LegalPageContent> = {
  sq: {
    meta: {
      title: "Kushte dhe rregulla",
      description:
        "Kushtet e përdorimit të website-it DARA Marketing Agency. Shërbime web design, krijim website dhe marketing digjital.",
      h1: "Kushte dhe rregulla",
      intro: "Duke përdorur këtë website, ju pranoni kushtet dhe rregullat e mëposhtme.",
    },
    sections: [
      {
        title: "1. Përdorimi i website-it",
        paragraphs: [
          "Website-i përdoret për informacion, komunikim me DARA dhe veprime të lejuara (p.sh. dërgim formularësh). Ndalohet përdorimi për qëllime të paligjshme, për të dëmtuar sistemet ose për të shkelur të drejtat e të tjerëve.",
        ],
      },
      {
        title: "2. Shërbimet",
        paragraphs: [
          "Shërbimet konkrete (çmim, afate, dorëzime) rregullohen me marrëveshje të veçantë me klientin. Përmbajtja e website-it është përshkruese dhe nuk zëvendëson një kontratë të nënshkruar, përveç kur shprehimisht thuhet ndryshe.",
        ],
      },
      {
        title: "3. Pronësia intelektuale",
        paragraphs: [
          "Materialet, identiteti vizual dhe përmbajtja e publikuar në këtë website janë të mbrojtura. Kopjimi, riprodhimi ose shpërndarja pa leje të shkruar nga DARA nuk lejohet, përveç rasteve të lejuara nga ligji.",
        ],
      },
      {
        title: "4. Kufizimi i përgjegjësisë",
        paragraphs: [
          "Përmbajtja ofrohet «siç është». DARA nuk përgjigjet për humbje indirekte ose pasoja të veçanta që mund të lidhen me përdorimin e website-it, për aq sa lejoni ligjet e zbatueshme.",
        ],
      },
      {
        title: "5. Ndryshime",
        paragraphs: [
          "Këto kushte mund të përditësohen herë pas here. Vazhdimi i përdorimit të website-it pas ndryshimeve mund të nënkuptojë pranimin e versionit të ri; rekomandojmë të rishikoni faqen periodikisht.",
        ],
      },
      {
        title: "6. Ligji i zbatueshëm",
        paragraphs: [
          "Për sa u përket përdoruesve në Bashkimin Evropian, zbatohen rregullat e përgjithshme të BE-së për mbrojtjen e konsumatorëve dhe të dhënat personale (përfshirë GDPR). Çdo mosmarrëveshje duhet të zgjidhet së pari në mënyrë miqësore; përndryshe kompetenca përcaktohet sipas ligjit të zbatueshëm.",
        ],
      },
    ],
  },
  en: {
    meta: {
      title: "Terms & Conditions",
      description:
        "Terms of use for the DARA Marketing Agency website. Web design, website creation and digital marketing services.",
      h1: "Terms & Conditions",
      intro: "By using this website, you accept the following terms.",
    },
    sections: [
      {
        title: "1. Use of the website",
        paragraphs: [
          "You may use this site for information, to contact DARA and for permitted actions (e.g. submitting forms). You must not use it for unlawful purposes, to harm systems or infringe others’ rights.",
        ],
      },
      {
        title: "2. Services",
        paragraphs: [
          "Specific services (pricing, timelines, deliverables) are governed by separate agreements with the client. Website content is descriptive and does not replace a signed contract unless expressly stated otherwise.",
        ],
      },
      {
        title: "3. Intellectual property",
        paragraphs: [
          "Materials, branding and content published on this site are protected. Copying, reproducing or distributing them without DARA’s written permission is not allowed, except as permitted by law.",
        ],
      },
      {
        title: "4. Limitation of liability",
        paragraphs: [
          "Content is provided “as is”. To the extent permitted by applicable law, DARA is not liable for indirect loss or consequential damages arising from use of the website.",
        ],
      },
      {
        title: "5. Changes",
        paragraphs: [
          "These terms may be updated from time to time. Continued use of the site after changes may constitute acceptance of the new version; we encourage you to review this page periodically.",
        ],
      },
      {
        title: "6. Applicable law",
        paragraphs: [
          "For users in the European Union, EU rules on consumer protection and personal data (including the GDPR) apply. Disputes should first be addressed amicably; otherwise jurisdiction follows applicable law.",
        ],
      },
    ],
  },
  de: {
    meta: {
      title: "Allgemeine Geschäftsbedingungen",
      description:
        "Nutzungsbedingungen der Website der DARA Marketing Agency.",
      h1: "Allgemeine Geschäftsbedingungen",
      intro: "Mit der Nutzung dieser Website akzeptieren Sie die folgenden Bedingungen.",
    },
    sections: [
      {
        title: "1. Nutzung der Website",
        paragraphs: [
          "Die Website dient der Information, der Kontaktaufnahme mit DARA und zulässigen Handlungen (z. B. Formularversand). Eine Nutzung zu rechtswidrigen Zwecken, zur Beeinträchtigung von Systemen oder zur Verletzung Rechte Dritter ist untersagt.",
        ],
      },
      {
        title: "2. Leistungen",
        paragraphs: [
          "Konkrete Leistungen (Preise, Fristen, Liefergegenstände) regeln gesonderte Vereinbarungen mit dem Kunden. Die Inhalte der Website sind beschreibend und ersetzen keinen unterzeichneten Vertrag, sofern nicht ausdrücklich anders angegeben.",
        ],
      },
      {
        title: "3. Geistiges Eigentum",
        paragraphs: [
          "Veröffentlichte Materialien, das Erscheinungsbild und Inhalte sind geschützt. Vervielfältigung, Verbreitung oder Nutzung ohne schriftliche Zustimmung von DARA ist untersagt, soweit gesetzlich nichts anderes erlaubt.",
        ],
      },
      {
        title: "4. Haftungsbeschränkung",
        paragraphs: [
          "Die Inhalte werden „wie besehen“ bereitgestellt. Soweit gesetzlich zulässig, haftet DARA nicht für mittelbare Schäden oder Folgeschäden aus der Nutzung der Website.",
        ],
      },
      {
        title: "5. Änderungen",
        paragraphs: [
          "Diese Bedingungen können angepasst werden. Die weitere Nutzung der Website nach Änderungen kann als Zustimmung zur neuen Fassung verstanden werden; wir empfehlen, diese Seite regelmäßig zu prüfen.",
        ],
      },
      {
        title: "6. Anwendbares Recht",
        paragraphs: [
          "Für Nutzer in der Europäischen Union gelten die allgemeinen EU-Vorschriften zum Verbraucherschutz und zum Datenschutz (einschließlich DSGVO). Streitigkeiten sollten zunächst einvernehmlich geklärt werden; im Übrigen richtet sich die Zuständigkeit nach dem anwendbaren Recht.",
        ],
      },
    ],
  },
};
