/**
 * JSON-LD helpers. Only confirmed facts: no address, phone, prices, reviews,
 * or client names. See the factual boundaries in src/content/site.ts.
 */
import { SITE_URL, EMAIL, LINKEDIN, DEFINITION, AREA_SERVED, founder, services, type Faq } from "../content/site";

export const ORG_ID = `${SITE_URL}#organization`;
export const PERSON_ID = `${SITE_URL}#dakota-wayne`;
export const WEBSITE_ID = `${SITE_URL}#website`;

const abs = (path: string) => new URL(path, SITE_URL).href;

export function baseGraph() {
  return [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "AIVectrix",
      url: SITE_URL,
      email: EMAIL,
      logo: abs("/brand/aivectrix-symbol-dark.svg"),
      description: DEFINITION,
      founder: { "@id": PERSON_ID },
      areaServed: { "@type": "Place", name: AREA_SERVED },
      knowsAbout: founder.knowsAbout,
      makesOffer: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@id": `${abs(`/${s.slug}/`)}#service` },
      })),
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: founder.name,
      jobTitle: "Founder",
      url: abs("/about/"),
      image: abs("/images/dakota-wayne.webp"),
      worksFor: { "@id": ORG_ID },
      sameAs: [LINKEDIN],
      knowsAbout: founder.knowsAbout,
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: "MBA, Operational Excellence",
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "certification",
          name: "Lean Six Sigma Black Belt",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: "AIVectrix",
      publisher: { "@id": ORG_ID },
      inLanguage: "en-US",
    },
  ];
}

export function webPage(path: string, name: string, description: string, type = "WebPage") {
  return {
    "@type": type,
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function faqPage(path: string, items: Faq[]) {
  return {
    "@type": "FAQPage",
    "@id": `${abs(path)}#faq`,
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbs(path: string, name: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${abs(path)}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name, item: abs(path) },
    ],
  };
}

export function serviceNode(slug: string, name: string, description: string) {
  return {
    "@type": "Service",
    "@id": `${abs(`/${slug}/`)}#service`,
    name,
    description,
    url: abs(`/${slug}/`),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Place", name: AREA_SERVED },
    audience: { "@type": "BusinessAudience", name: "Business owners, entrepreneurs, and leaders" },
  };
}
