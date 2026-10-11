import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Collapse } from "bootstrap";
import ThemeToggle from "./components/ThemeToggle";
import "./Navbar.css";
import "./NavbarSearch.css";

// Search Dataset
const searchData = [
  { title: "Home", path: "/" },
  { title: "About Us", path: "/about" },
  { title: "Services", path: "/services" },
  { title: "Animation & Visualization", path: "/services/animation-visualization" },
  { title: "2D Animation", path: "/services/2d-animation" },
  { title: "3D Animation", path: "/services/3d-animation" },
  // { title: "Digital Marketing", path: "/services/digitalmarketing" },
  { title: "Web Design", path: "/services/web-design" },
  { title: "UI/UX Design", path: "/services/ui-ux-design" },
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
  { title: "Landing Pages", path: "/services/landing-pages" },
  { title: "Mobile App Design", path: "/services/mobile-app-design" },
  { title: "Digital Presentations", path: "/services/digital-presentations" },
  { title: "Digital Product Experiences", path: "/services/digital-product-experiences" },
  { title: "Articulate Storyline", path: "/services/articulate-storyline" },
  { title: "Interactive Learning", path: "/services/interactive-learning" },
  { title: "Product Training", path: "/services/product-training" },
  { title: "Employee & Safety Training", path: "/services/employee-safety-training" },
  { title: "Simulation & Assessment", path: "/services/simulation-assessment" },
  { title: "AR|VR|MR|XR Experiences", path: "/services/ar-vr-mr-xr" },
  { title: "Virtual ShowRooms", path: "/services/virtual-showrooms" },
  { title: "Interactive 3D", path: "/services/interactive-3d" },
  { title: "Immersive Training", path: "/services/immersive-training" },
  { title: "Exhibition Creative", path: "/services/exhibition-creative" },
  { title: "Exhibition 3D Design", path: "/services/exhibition-3d-design" },
  { title: "Interactive Displays", path: "/services/interactive-displays" },
  { title: "Digital Installations", path: "/services/digital-installations" },
  { title: "Event Content", path: "/services/event-content" },
  { title: "Product Experiences", path: "/services/product-experiences" },
  { title: "Campaign Creatives", path: "/services/campaign-creatives" },
  { title: "Presentation & Infographic Design", path: "/services/presentation-infographic-design" },
  { title: "Film & Visual Content", path: "/services/film-visual-content" },
  { title: "Animation & Visualization", path: "/services/animation-visualization" },
  { title: "Branding & Creative", path: "/services/branding-creative" },
  { title: "Learning & Training", path: "/services/learning-training" },
  { title: "Immersive Technology", path: "/services/immersive-technology" },
  { title: "Exhibition Experiences", path: "/services/exhibition-experiences" },
  { title: "Web & Mobile Interface Design", path: "/services/web-mobile-interface-design" }
];

// Services Dropdown Dataset (parent categories -> child items)
// Fill each `path` with the route slug. Final link becomes: /services/<path>
// A category can also have its own `path` (its own overview page).
const servicesMenu = [
  {
    title: "Animation & Visualization",
    path: "animation-visualization",
    items: [
      { title: "3D Animation", path: "3d-animation" },
      { title: "2D Animation", path: "2d-animation" },
      { title: "Product Visualization", path: "product-visualization" },
      { title: "Engineering & Industrial Animation", path: "engineering-industrial-animation" },
      { title: "Technical Visualization", path: "technical-visualization" },
      { title: "Motion Graphics", path: "motiongraphics" },
      { title: "Explainer Content", path: "explainer-content" },
    ],
  },
  {
    title: "Film & Visual Content",
    path: "film-visual-content",
    items: [
      { title: "Corporate & Brand Films", path: "corporate-brand-films" },
      { title: "Product & Industrial Films", path: "product-industrial-films" },
      { title: "Promotional Videos", path: "promotional-videos" },
      // { title: "Social & Digital Content", path: "" },
      { title: "Photography & Videography", path: "photography-videography" },
      { title: "Editing & VFX", path: "editing-vfx" },
    ],
  },
  {
    title: "Branding & Creative",
    path: "branding-creative",
    items: [
      { title: "Brand Identity", path: "brand-identity" },
      // { title: "Logo & Brand Systems", path: "" },
      { title: "Graphic Design", path: "graphicsdesign" },
      { title: "Marketing Collaterals", path: "marketing-collaterals" },
      { title: "Presentation & Infographic Design", path: "presentation-infographic-design" },
      { title: "Campaign Creatives", path: "campaign-creatives" },
    ],
  },
  {
    title: "Web,Mobile & Interface Design",
    path:"web-mobile-interface-design",
    items: [
      { title: "Website Design", path: "web-design" },
      { title: "Mobile App Design (iOS & Android)", path: "mobile-app-design" },
      { title: "UI/UX Design", path: "ui-ux-design" },
      { title: "Landing Pages", path: "landing-pages" },
      { title: "Digital Presentations", path: "digital-presentations" },
      { title: "Digital Product Experiences", path: "digital-product-experiences" },
    ],
  },
  {
    title: "Learning & Training",
    path:"learning-training",
    items: [
      { title: "E-Learning Development", path: "e-learning" },
      { title: "Interactive Learning", path: "interactive-learning" },
      { title: "Articulate Storyline", path: "articulate-storyline" },
      { title: "Product Training", path: "product-training" },
      { title: "Employee & Safety Training", path: "employee-safety-training" },
      { title: "Simulation & Assessment", path: "simulation-assessment" },
    ],
  },
  {
    title: "Immersive Technology",
    path:"immersive-technology",
    items: [
      { title: "AR|VR|MR|XR Experineces", path: "ar-vr-mr-xr" },
      { title: "Virtual Showrooms", path: "virtual-showrooms" },
      { title: "Interactive 3D", path: "interactive-3d" },
      { title: "Immersive Training", path: "immersive-training" },
    ],
  },
  {
    title: "Exhibition & Experiences",
    path:"exhibition-experiences",
    items: [
      { title: "Exhibition Creative", path: "exhibition-creative" },
      { title: "Exhibition 3D Design", path: "exhibition-3d-design" },
      { title: "Interactive Displays", path: "interactive-displays" },
      { title: "Digital Installations", path: "digital-installations" },
      { title: "Product Experiences", path: "product-experiences" },
      { title: "Event Content", path: "event-content" },
    ],
  },
  // {
  //   title: "Custom Creative",
  //   items: [
  //     { title: "Creative Concepts", path: "" },
  //     { title: "Campaign Development", path: "" },
  //     { title: "Sales Enablement", path: "" },
  //     { title: "Custom Multimedia", path: "" },
  //     { title: "Interactive Experiences", path: "" },
  //     { title: "Bespoke Solutions", path: "" },
  //   ],
  // },
];

// A category is active when the page that is currently open belongs to it
// (its own overview page or any of its items).
// Items without a page yet (empty path) are ignored.
const isCategoryActive = (category, pathname) => {
  const currentPath = pathname.toLowerCase().replace(/\/+$/, "");

  if (category.path && currentPath === `/services/${category.path}`) {
    return true;
  }

  return category.items.some(
    (item) => item.path && currentPath === `/services/${item.path}`
  );
};

// Desktop (>= lg): the dropdown opens on hover, so a click can navigate.
// Mobile: a tap opens the accordion, the overview page is reached through "View All".
const isDesktopView = () => window.matchMedia("(min-width: 992px)").matches;

const Navbar = () => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Search Modal state
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mobile active overlay
  useEffect(() => {
    if (isNavOpen) {
      document.body.classList.add("mobile-nav-active");
    } else {
      document.body.classList.remove("mobile-nav-active");
    }
    return () => {
      document.body.classList.remove("mobile-nav-active");
    };
  }, [isNavOpen]);

  // Search modal: the page does not scroll behind it (small devices, see
  // NavbarSearch.css) and Escape closes it
  useEffect(() => {
    if (!isSearchModalOpen) {
      return undefined;
    }

    document.body.classList.add("search-modal-open");

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsSearchModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("search-modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchModalOpen]);

  const closeNavbar = () => {
    const navbar = document.getElementById("mainNavbar");
    if (!navbar) return;

    const bsCollapse =
      Collapse.getInstance(navbar) || new Collapse(navbar, { toggle: false });

    bsCollapse.hide();
    setServicesOpen(false);
    setOpenCategory(null);
    setIsNavOpen(false);
  };

  const toggleNavbar = () => {
    const navbar = document.getElementById("mainNavbar");
    if (!navbar) return;

    const bsCollapse =
      Collapse.getInstance(navbar) || new Collapse(navbar, { toggle: false });

    if (navbar.classList.contains("show")) {
      bsCollapse.hide();
      setIsNavOpen(false);
    } else {
      bsCollapse.show();
      setIsNavOpen(true);
    }
  };

  const toggleServicesDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setServicesOpen((prev) => !prev);
  };

  // Mobile accordion: open one category at a time
  const toggleCategory = (title) => {
    setOpenCategory((prev) => (prev === title ? null : title));
  };

  // Category with its own page: navigate on desktop, open the accordion on mobile.
  // Category without a page: always only toggles.
  const handleCategoryClick = (event, category) => {
    if (category.path && isDesktopView()) {
      closeNavbar();
      return;
    }

    if (category.path) {
      event.preventDefault();
    }

    toggleCategory(category.title);
  };

  // Search functionality
  const filteredSuggestions = searchQuery.trim()
    ? searchData.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSelectSuggestion = (path) => {
    navigate(path);
    setIsSearchModalOpen(false);
    setSearchQuery("");
    closeNavbar();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchModalOpen(false);
      setSearchQuery("");
      closeNavbar();
    }
  };

  return (
    <>
      <div className={`navbar-wrapper fixed-top ${isScrolled ? "scrolled" : ""}`}>
        <nav className="navbar navbar-expand-lg px-3">
          <div className="container-fluid d-flex align-items-center justify-content-between">
            {/* Logo Section */}
            <NavLink
              to="/"
              className="navbar-brand d-flex align-items-center"
              onClick={closeNavbar}
            >
              <img
                src="/Logo1.png"
                alt="Logo"
                className="navbar-logo me-2 rounded"
              />
            </NavLink>

            {/* Mobile Right Controls: Search Icon + Theme Toggle + Toggler */}
            <div className="navbar-mobile-actions d-flex align-items-center d-lg-none gap-2">
              <button
                type="button"
                className="btn-search-trigger"
                onClick={() => setIsSearchModalOpen(true)}
                aria-label="Open Search"
              >
                <i className="bi bi-search"></i>
              </button>

              <ThemeToggle />

              <button
                className={`navbar-toggler custom-navbar-toggler ${
                  isNavOpen ? "open" : ""
                }`}
                type="button"
                onClick={toggleNavbar}
                aria-controls="mainNavbar"
                aria-expanded={isNavOpen}
                aria-label="Toggle navigation"
              >
                <span className="toggler-line"></span>
                <span className="toggler-line"></span>
                <span className="toggler-line"></span>
              </button>
            </div>

            {/* Navbar Content */}
            <div className="collapse navbar-collapse" id="mainNavbar">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-2 text-center align-items-center">
                <li className="nav-item">
                  <NavLink className="nav-link fw-bold" to="/" onClick={closeNavbar}>
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/about" className="nav-link fw-bold" onClick={closeNavbar}>
                    About Us
                  </NavLink>
                </li>

                <li className="nav-item dropdown">
                  <NavLink
                    to="/services"
                    className="nav-link fw-bold d-inline-flex align-items-center"
                    onClick={closeNavbar}
                  >
                    Our Services
                  </NavLink>
                  <button
                    className="dropdown-toggle-icon"
                    onClick={toggleServicesDropdown}
                    aria-expanded={servicesOpen}
                    type="button"
                  >
                    <i
                      className={`bi ${
                        servicesOpen ? "bi-chevron-up" : "bi-chevron-down"
                      } `}
                    ></i>
                  </button>

                  <ul
                    className={`dropdown-menu text-light mobile-dropdown-menu services-menu ${
                      servicesOpen ? "show" : ""
                    }`}
                  >
                    {servicesMenu.map((category) => {
                      const categoryClass = `dropdown-item category-toggle d-flex align-items-center justify-content-between ${
                        isCategoryActive(category, pathname) ? "active" : ""
                      }`;

                      const categoryLabel = (
                        <>
                          <span>{category.title}</span>
                          <i className="bi bi-chevron-right"></i>
                        </>
                      );

                      return (
                        <li
                          key={category.title}
                          className={`dropdown-submenu-item ${
                            openCategory === category.title ? "open" : ""
                          }`}
                        >
                          {category.path ? (
                            <NavLink
                              end
                              to={`/services/${category.path}`}
                              className={categoryClass}
                              onClick={(event) => handleCategoryClick(event, category)}
                              aria-expanded={openCategory === category.title}
                            >
                              {categoryLabel}
                            </NavLink>
                          ) : (
                            <button
                              type="button"
                              className={categoryClass}
                              onClick={(event) => handleCategoryClick(event, category)}
                              aria-expanded={openCategory === category.title}
                            >
                              {categoryLabel}
                            </button>
                          )}

                          <ul className="submenu-panel">
                            {/* Mobile only: link to the category page */}
                            {category.path && (
                              <li className="d-lg-none">
                                <NavLink
                                  end
                                  className="dropdown-item"
                                  to={`/services/${category.path}`}
                                  onClick={closeNavbar}
                                >
                                  View All
                                </NavLink>
                              </li>
                            )}

                            {category.items.map((item) => (
                              <li key={item.title}>
                                <NavLink
                                  end
                                  className="dropdown-item"
                                  to={`/services/${item.path}`}
                                  onClick={closeNavbar}
                                >
                                  {item.title}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link fw-bold" to="/industries" onClick={closeNavbar}>
                    Industries
                  </NavLink>
                </li>

                {/* <li className="nav-item">
                  <NavLink to="/gallery" className="nav-link fw-bold" onClick={closeNavbar}>
                    Our Work
                  </NavLink>
                </li> */}

                <li className="nav-item">
                  <NavLink className="nav-link fw-bold" to="/careers" onClick={closeNavbar}>
                    Careers
                  </NavLink>
                </li>

                {/* Contact Pill Button */}
                <li className="nav-item ms-lg-1 my-2 my-lg-0">
                  <NavLink className="nav-link nav-contact-btn" to="/contact" onClick={closeNavbar}>
                    Contact Us
                  </NavLink>
                </li>
              </ul>

              {/* Right Side Desktop Elements */}
              <div className="d-none d-lg-flex align-items-center gap-3">
                <ThemeToggle />

                <button
                  type="button"
                  className="btn-search-trigger"
                  onClick={() => setIsSearchModalOpen(true)}
                  title="Search site"
                  aria-label="Search"
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Search Modal (centered on large screens, full screen on small devices) */}
      {isSearchModalOpen && (
        <div className="search-modal-backdrop" onClick={() => setIsSearchModalOpen(false)}>
          <div
            className="search-modal-content"
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-modal-header">
              <form onSubmit={handleSearchSubmit} className="search-input-wrapper">
                <i className="bi bi-search search-input-icon"></i>
                <input
                  type="text"
                  className="search-modal-input"
                  placeholder="Search services, pages, topics..."
                  aria-label="Search"
                  autoComplete="off"
                  enterKeyHint="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="btn-clear-search"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    <i className="bi bi-x-circle-fill"></i>
                  </button>
                )}
              </form>
              <button
                type="button"
                className="btn-close-modal"
                onClick={() => setIsSearchModalOpen(false)}
                aria-label="Close search"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="search-modal-body">
              {searchQuery.trim() !== "" ? (
                filteredSuggestions.length > 0 ? (
                  <ul className="search-suggestions-list">
                    {filteredSuggestions.map((item, idx) => (
                      <li key={idx}>
                        <button
                          type="button"
                          className="suggestion-item"
                          onClick={() => handleSelectSuggestion(item.path)}
                        >
                          <i className="bi bi-arrow-right-short me-2"></i>
                          <span>{item.title}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="search-no-results">
                    <p>No results found for "<strong>{searchQuery}</strong>"</p>
                  </div>
                )
              ) : (
                <div className="search-popular-tags">
                  <span className="tags-label fw-bold">Popular Searches:</span>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {["3D Animation", "2D Animation", "Web Development", "Careers", "Video Editing"].map((tag, i) => (
                      <button
                        key={i}
                        type="button"
                        className="search-tag-pill fw-semibold"
                        onClick={() => setSearchQuery(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;