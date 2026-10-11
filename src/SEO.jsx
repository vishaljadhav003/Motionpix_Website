import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { SITE, PAGES, KNOWS_ABOUT, TEAM_PAGE, TEAM_MEMBERS } from "./Seodata";

/**
 * Place <SEO /> ONCE in App.jsx (inside <Router>).
 * It reads the current route, picks the right title / description / keywords
 * from seoData.js and builds canonical, Open Graph, Twitter and JSON-LD.
 *
 * Optional props (only for special pages): title, description, keywords, image, noindex
 */

const normalize = (pathname) => {
  const p = pathname.toLowerCase().replace(/\/+$/, "");
  return p === "" ? "/" : p;
};

const toAbsolute = (src) => {
  if (src.startsWith("http")) return src;
  const path = src.startsWith("./") ? src.slice(1) : src;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
};

const ORGANIZATION_ID = `${SITE.url}/#organization`;

// Home > Services > Category > Service, built from the `parent` field in seoData.js
const buildBreadcrumbs = (route) => {
  const trail = [];
  let current = route;

  while (current && PAGES[current] && trail.length < 5) {
    trail.unshift({ name: PAGES[current].name, url: `${SITE.url}${current}` });
    current = PAGES[current].parent;
  }

  const items = [{ name: "Home", url: `${SITE.url}/` }, ...trail];

  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

const buildOrganization = () => {
  const { contact } = SITE;
  const hasAddress = contact.locality || contact.region || contact.postalCode;

  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    alternateName: SITE.alternateNames,
    url: `${SITE.url}/`,
    logo: { "@type": "ImageObject", url: toAbsolute(SITE.logo) },
    description: SITE.description,
    knowsAbout: KNOWS_ABOUT,
    ...(contact.email && { email: contact.email }),
    ...(contact.phone && { telephone: contact.phone }),
    ...(hasAddress && {
      address: {
        "@type": "PostalAddress",
        addressLocality: contact.locality,
        addressRegion: contact.region,
        postalCode: contact.postalCode,
        addressCountry: contact.country,
      },
    }),
    ...(SITE.social.length > 0 && { sameAs: SITE.social }),
  };
};

// One Person per team member. The url ends with #team-<name>, which the TeamSection scrolls to.
const buildPeople = () => {
  const teamUrl = `${SITE.url}${TEAM_PAGE === "/" ? "/" : TEAM_PAGE}`;

  return TEAM_MEMBERS.map((member) => ({
    "@type": "Person",
    "@id": `${teamUrl}#${member.id}`,
    name: member.name,
    ...(member.firstName !== member.name && { alternateName: member.firstName }),
    jobTitle: member.role,
    url: `${teamUrl}#${member.id}`,
    ...(member.image && {
      image: {
        "@type": "ImageObject",
        url: toAbsolute(member.image),
        caption: `${member.name}, ${member.role} at ${SITE.name}`,
      },
    }),
    ...(member.sameAs.length > 0 && { sameAs: member.sameAs }),
    worksFor: { "@id": ORGANIZATION_ID },
  }));
};

const SEO = ({ title, description, keywords, image, noindex = false }) => {
  const { pathname } = useLocation();
  const route = normalize(pathname);
  const page = PAGES[route];
  const isHome = route === "/";
  const hasTeam = route === TEAM_PAGE;

  // Unknown routes (404 page, search results, etc.) are kept out of Google unless a page passes its own title.
  const indexable = !noindex && Boolean(page || title);

  const pageTitle = title || page?.title || SITE.defaultTitle;
  const pageDescription = description || page?.description || SITE.description;
  const pageKeywords = keywords || page?.keywords || "";
  const pageUrl = isHome ? `${SITE.url}/` : `${SITE.url}${route}`;
  const pageImage = toAbsolute(image || SITE.ogImage);

  // ---------- Structured data ----------
  const graph = [];

  if (isHome) {
    graph.push({
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: `${SITE.url}/`,
      name: SITE.name,
      alternateName: SITE.alternateNames,
      inLanguage: "en-IN",
      publisher: { "@id": ORGANIZATION_ID },
    });
  } else if (indexable) {
    graph.push(buildBreadcrumbs(route));

    if (page?.service) {
      graph.push({
        "@type": "Service",
        name: page.service,
        serviceType: page.service,
        description: pageDescription,
        url: pageUrl,
        areaServed: { "@type": "Country", name: "India" },
        provider: { "@id": ORGANIZATION_ID },
      });
    }
  }

  // The Organization is defined on the home page and on the page that lists the team
  if (indexable && (isHome || hasTeam)) {
    graph.unshift(buildOrganization());
  }

  if (indexable && hasTeam) {
    graph.push(...buildPeople());
  }

  const jsonLd = graph.length > 0 ? { "@context": "https://schema.org", "@graph": graph } : null;

  return (
    <Helmet htmlAttributes={{ lang: "en-IN" }}>
      {/* Basic SEO */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {pageKeywords && <meta name="keywords" content={pageKeywords} />}
      <meta name="author" content={SITE.name} />
      <meta
        name="robots"
        content={
          indexable
            ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
            : "noindex, follow"
        }
      />
      {indexable && <link rel="canonical" href={pageUrl} />}

      {/* Open Graph (Facebook, LinkedIn, WhatsApp) */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={pageTitle} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />

      {/* Structured data */}
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};

export default SEO;