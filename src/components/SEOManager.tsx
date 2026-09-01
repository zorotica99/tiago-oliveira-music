import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { catalogueAreas, marchAreas } from "../data/catalogue";
import { siteInfo } from "../data/site";
import { works } from "../data/works";

type SEOData = {
  title: string;
  description: string;
  type?: "website" | "article";
  image?: string;
  noIndex?: boolean;
  structuredData?: Record<string, unknown>;
};

const SITE_TITLE = "Tiago Oliveira";
const PSEUDONYM = "Alberto Caeiro";

const DEFAULT_DESCRIPTION =
  "Site oficial de Tiago Oliveira, compositor, arranjador e clarinetista português. Música para Concert Band, Flex Band, clarinete, música de câmara, iniciação musical, instrumentos Orff e projetos educativos.";

function setMeta(
  selector: string,
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setCanonical(url: string) {
  let canonical =
    document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", url);
}

function setStructuredData(data: Record<string, unknown>) {
  const existing = document.head.querySelector(
    'script[data-seo-jsonld="true"]',
  );

  if (existing) {
    existing.remove();
  }

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.dataset.seoJsonld = "true";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

function removeStructuredData() {
  const existing = document.head.querySelector(
    'script[data-seo-jsonld="true"]',
  );

  if (existing) {
    existing.remove();
  }
}

function cleanPath(pathname: string) {
  if (pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/+$/, "");
}

function getBaseUrl() {
  return window.location.origin;
}

function getPageUrl(pathname: string) {
  const path = cleanPath(pathname);
  return `${getBaseUrl()}${path}`;
}

function getAbsoluteImage(image?: string) {
  if (!image) {
    return `${getBaseUrl()}${siteInfo.images.homePortrait}`;
  }

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  return `${getBaseUrl()}${image}`;
}

function getCategorySEO(pathname: string): SEOData | null {
  const allAreas = [...catalogueAreas, ...marchAreas];

  const area = allAreas.find(
    (item) => cleanPath(item.slug) === cleanPath(pathname),
  );

  if (!area) {
    return null;
  }

  const specificDescriptions: Record<string, string> = {
    "/flex-band":
      "Flex Band music by Tiago Oliveira. Repertório para instrumentação flexível, ensembles de sopros, bandas pequenas e formações instrumentais adaptáveis.",
    "/concert-band":
      "Concert Band and Wind Band music by Portuguese composer Tiago Oliveira. Obras originais para banda, ensemble de sopros e diferentes contextos de concerto.",
    "/marchas":
      "Marchas para banda de Tiago Oliveira. Repertório de rua e marchas de procissão para banda filarmónica e ensemble de sopros.",
    "/marchas/rua":
      "Marchas de rua para banda de Tiago Oliveira. Repertório destinado a desfiles, concertos e atuações de bandas filarmónicas.",
    "/marchas/procissao":
      "Marchas de procissão para banda de Tiago Oliveira. Repertório processional para banda filarmónica e ensemble de sopros.",
    "/iniciacao-musical":
      "Recursos de iniciação musical de Tiago Oliveira: repertório pedagógico, instrumentos Orff, materiais para jovens músicos e projetos educativos com Play Along.",
    "/clarinete-camara":
      "Música para clarinete e música de câmara de Tiago Oliveira, clarinetista e compositor português. Repertório original, pedagógico e camerístico.",
    "/vocal-concert-band":
      "Obras para voz, solistas vocais e Concert Band de Tiago Oliveira. Música vocal acompanhada por banda e ensemble de sopros.",
  };

  return {
    title: `${area.title} | Tiago Oliveira`,
    description:
      specificDescriptions[cleanPath(pathname)] ??
      `${area.title} de Tiago Oliveira. ${area.description}`,
    type: "website",
  };
}

function getWorkSEO(pathname: string): SEOData | null {
  if (!pathname.startsWith("/obra/")) {
    return null;
  }

  const slug = pathname.replace("/obra/", "").replace(/\/+$/, "");

  const work = works.find((item) => item.slug === slug);

  if (!work) {
    return {
      title: `Obra não encontrada | ${SITE_TITLE}`,
      description: DEFAULT_DESCRIPTION,
      noIndex: true,
    };
  }

  const composer = work.composerName ?? SITE_TITLE;

  const details = [
    work.subtitle,
    work.level,
    work.duration,
    work.year,
  ].filter(Boolean);

  const detailText =
    details.length > 0 ? ` ${details.join(" · ")}.` : "";

  const description =
    `${work.title}, obra de ${composer}.` +
    detailText +
    (work.description ? ` ${work.description}` : "");

  const pageUrl = getPageUrl(pathname);

  return {
    title: `${work.title} | ${composer} | Tiago Oliveira`,
    description,
    type: "article",
    image: work.image,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "MusicComposition",
      name: work.title,
      url: pageUrl,
      description,
      composer: {
        "@type": "Person",
        name: composer,
        alternateName:
          composer === PSEUDONYM ? SITE_TITLE : PSEUDONYM,
        url: getBaseUrl(),
      },
      ...(work.year
        ? {
            dateCreated: work.year,
          }
        : {}),
      ...(work.duration
        ? {
            duration: work.duration,
          }
        : {}),
      ...(work.instrumentation
        ? {
            instrumentation: work.instrumentation,
          }
        : {}),
    },
  };
}

function getSEOData(pathname: string): SEOData {
  const workSEO = getWorkSEO(pathname);

  if (workSEO) {
    return workSEO;
  }

  const categorySEO = getCategorySEO(pathname);

  if (categorySEO) {
    return categorySEO;
  }

  switch (cleanPath(pathname)) {
    case "/":
      return {
        title:
          "Tiago Oliveira | Composer · Arranger · Clarinetist",
        description: DEFAULT_DESCRIPTION,
        type: "website",
        structuredData: {
          "@context": "https://schema.org",
          "@type": "Person",
          name: SITE_TITLE,
          alternateName: PSEUDONYM,
          url: getBaseUrl(),
          image: getAbsoluteImage(
            siteInfo.images.homePortrait,
          ),
          email: siteInfo.email,
          jobTitle: [
            "Composer",
            "Arranger",
            "Clarinetist",
          ],
          sameAs: [siteInfo.instagram],
          knowsAbout: [
            "Concert Band",
            "Wind Band",
            "Flex Band",
            "Clarinet",
            "Chamber Music",
            "Music Education",
            "Orff Instruments",
            "Play Along",
          ],
        },
      };

    case "/catalogo":
      return {
        title:
          "Catálogo de Música | Tiago Oliveira · Alberto Caeiro",
        description:
          "Catálogo musical de Tiago Oliveira, com obras assinadas também como Alberto Caeiro. Concert Band, Flex Band, marchas, clarinete, música de câmara, iniciação musical e música vocal.",
      };

    case "/sobre":
      return {
        title:
          "Sobre | Tiago Oliveira · Compositor e Clarinetista",
        description:
          "Biografia de Tiago Oliveira, compositor, arranjador, clarinetista e pedagogo português. Algumas das suas obras são assinadas sob o pseudónimo Alberto Caeiro.",
        structuredData: {
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: {
            "@type": "Person",
            name: SITE_TITLE,
            alternateName: PSEUDONYM,
            url: getBaseUrl(),
            image: getAbsoluteImage(
              siteInfo.images.aboutPortrait,
            ),
            jobTitle: [
              "Composer",
              "Arranger",
              "Clarinetist",
            ],
            sameAs: [siteInfo.instagram],
          },
        },
      };

    case "/contacto":
      return {
        title: "Contacto | Tiago Oliveira",
        description:
          "Contacto profissional de Tiago Oliveira para música, partituras, encomendas, projetos, Concert Band, Flex Band, clarinete e colaboração artística.",
      };

    default:
      return {
        title: `Página não encontrada | ${SITE_TITLE}`,
        description: DEFAULT_DESCRIPTION,
        noIndex: true,
      };
  }
}

export function SEOManager() {
  const location = useLocation();

  const seo = useMemo(
    () => getSEOData(location.pathname),
    [location.pathname],
  );

  useEffect(() => {
    const url = getPageUrl(location.pathname);
    const image = getAbsoluteImage(seo.image);

    document.title = seo.title;

    setMeta(
      'meta[name="description"]',
      "name",
      "description",
      seo.description,
    );

    setMeta(
      'meta[name="robots"]',
      "name",
      "robots",
      seo.noIndex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );

    setCanonical(url);

    setMeta(
      'meta[property="og:title"]',
      "property",
      "og:title",
      seo.title,
    );

    setMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      seo.description,
    );

    setMeta(
      'meta[property="og:type"]',
      "property",
      "og:type",
      seo.type ?? "website",
    );

    setMeta(
      'meta[property="og:url"]',
      "property",
      "og:url",
      url,
    );

    setMeta(
      'meta[property="og:image"]',
      "property",
      "og:image",
      image,
    );

    setMeta(
      'meta[property="og:site_name"]',
      "property",
      "og:site_name",
      SITE_TITLE,
    );

    setMeta(
      'meta[property="og:locale"]',
      "property",
      "og:locale",
      "pt_PT",
    );

    setMeta(
      'meta[name="twitter:card"]',
      "name",
      "twitter:card",
      "summary_large_image",
    );

    setMeta(
      'meta[name="twitter:title"]',
      "name",
      "twitter:title",
      seo.title,
    );

    setMeta(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      seo.description,
    );

    setMeta(
      'meta[name="twitter:image"]',
      "name",
      "twitter:image",
      image,
    );

    if (seo.structuredData) {
      setStructuredData(seo.structuredData);
    } else {
      removeStructuredData();
    }
  }, [location.pathname, seo]);

  return null;
}