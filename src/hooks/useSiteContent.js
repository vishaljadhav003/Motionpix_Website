import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:5000/api";

// Fetches editable text for one page from the CMS.
//
// `defaults` is the page's current hardcoded copy — it is returned
// immediately and stays in place for any key the CMS hasn't overridden
// yet, or if the API call fails. This means dropping this hook into a
// page never changes what visitors see until someone actually edits
// that field in /api/admin/content.
//
// Usage:
//   const content = useSiteContent("home", {
//     hero_title: "MotionPix India",
//     hero_tagline: "Your Digital Branding Partner",
//   });
//   ...
//   <h1>{content.hero_title}</h1>
export default function useSiteContent(page, defaults = {}) {
  const [content, setContent] = useState(defaults);

  useEffect(() => {
    let isMounted = true;

    fetch(`${API_BASE_URL}/content/${page}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data && Object.keys(data).length > 0) {
          setContent((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {
        // API unreachable — keep showing the defaults, don't break the page
      });

    return () => {
      isMounted = false;
    };
  }, [page]);

  return content;
}
