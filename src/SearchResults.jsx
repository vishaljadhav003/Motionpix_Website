import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const data = [
  { title: "Home", path: "/" },
  { title: "About Us", path: "/about" },
  { title: "Services", path: "/services" },
  { title: "2D Animation", path: "/services/2d-animation" },
  { title: "3D Animation", path: "/services/3d-animation" },
  { title: "AR-VR", path: "/services/ar-vr-mr-xr" },
  // { title: "Digital Marketing", path: "/services/digitalmarketing" },
  { title: "Web Design", path: "/services/web-design" },
  { title: "Website Design", path: "/services/web-design" },
  { title: "Careers", path: "/careers" },
  { title: "Contact Us - Enquiry", path: "/contact" },
  { title: "Graphics Design", path: "/services/graphicsdesign" },
  { title: "E Learning", path: "/services/e-learning" },
  { title: "Motion Graphics", path: "/services/motiongraphics" },
  { title: "Product Visualization", path: "/services/product-visualization" },
  { title: "Technical Visualization", path: "/services/technical-visualization" },
  { title: "Engineering & Industrial Animation", path: "/services/engineering-industrial-animation" },
  { title: "Explainer Content", path: "/services/explainer-content" },
  { title: "Corporate & Brand Films", path: "/services/corporate-brand-films" },
  { title: "Product & Industrial Films", path: "/services/product-industrial-films" },
  { title: "Promotional Videos", path: "/services/promotional-videos" },
  { title: "Photography & Videography", path: "/services/photography-videography" },
  { title: "Editing & VFX", path: "/services/editing-vfx" },
  { title: "Brand Identity", path: "/services/brand-identity" },
  { title: "UI/UX Design", path: "/services/ui-ux-design" },
  { title: "Landing Pages", path: "/services/landing-pages" },
  { title: "Mobile App Design", path: "/services/mobile-app-design" },
  { title: "Digital Presentations", path: "/services/digital-presentations" },
  { title: "Digital Product Experiences", path: "/services/digital-product-experiences" },
  { title: "Articulate Storyline", path: "/services/articulate-storyline" },
  { title: "Interactive Learning", path: "/services/interactive-learning" },
  { title: "Product Training", path: "/services/product-training" },
  { title: "Employee & Safety Training", path: "/services/employee-safety-training" },
  { title: "AR|VR|MR|XR Experiences", path: "/services/ar-vr-mr-xr" },
  { title: "Virtual Showrooms", path: "/services/virtual-showrooms" },
  { title: "Interactive 3D", path: "/services/interactive-3d" },
  { title: "Immersive Training", path: "/services/immersive-training" },
  { title: "Exhibition Creative", path: "/services/exhibition-creative" },
  { title: "Exhibition 3D Design", path: "/services/exhibition-3d-design" },
  { title: "Interactive Displays", path: "/services/interactive-displays" },
  { title: "Digital Installations", path: "/services/digital-installations" },
  { title: "Event Content", path: "/services/event-content" },
  { title: "Product Experiences", path: "/services/product-experiences" },
  { title: "Marketing Collaterals", path: "/services/marketing-collaterals" },
  { title: "Presentation & Infographic Design", path: "/services/presentation-infographic-design" },
  { title: "Campaign Creatives", path: "/services/campaign-creatives" },
  { title: "Animation & Visualization", path: "/services/animation-visualization" },
  { title: "Film & Visual Content", path: "/services/film-visual-content" },
  { title: "Branding & Creative", path: "/services/branding-creative" },
  { title: "Learning & Training", path: "/services/learning-training" },
  { title: "Immersive Technology", path: "/services/immersive-technology" },
  { title: "Exhibition Experiences", path: "/services/exhibition-experiences" },
  { title: "Web & Mobile Interface Design", path: "/services/web-mobile-interface-design" }
];

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get("q") || "";

  const results = query
    ? data.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (query.length >= 3 && results.length === 1) {
      navigate(results[0].path, { replace: true });
    }
  }, [results, query, navigate]);

  if (!query) return null;

  return (
    <div className="container search-result-section">
      <h4 className="mb-4">
        Search results for: <span className="text-danger">"{query}"</span>
      </h4>

      {results.length === 0 ? (
        <div className="alert alert-warning border-0 rounded-3 shadow-sm">
          No matching pages found for your query.
        </div>
      ) : (
        <div className="list-group shadow-sm border-0">
          {results.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className="list-group-item list-group-item-action py-3 px-4 fw-semibold"
            >
              <i className="bi bi-file-earmark-text me-2 text-danger"></i>
              {item.title}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;