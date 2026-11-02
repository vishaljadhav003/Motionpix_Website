// ============================================================
// CONTACT FORM OPTIONS
// Single source of truth for the dropdown values (slugs) and the
// labels that the admin dashboard and the emails must show.
// Keep the keys in sync with the <option value="..."> list in Contact.jsx.
// ============================================================

const SERVICES = {
  "2d-animation": "2D Animations",
  "3d-animation": "3D Animations",
  "ar-vr": "AR/VR",
  digitalmarketing: "Digital Marketing",
  "web-design": "Website Design",
  "e-learning": "E-Learning",
  graphicsdesign: "Graphics Design",
  motiongraphics: "Motion Graphics",
  sop: "SOP Digitization",
  "print-media": "Print Media",
  "product-branding": "Product Branding",
  "live-shoots": "Live Shoots",
  general: "General/Other",
};

const BUDGETS = {
  "below-50000": "Below ₹ 50,000",
  "50000-1-lakh": "₹50,000 – ₹1 Lakh",
  "1-3-lakhs": "₹1 – ₹3 Lakhs",
  "3-5-lakhs": "₹3 – ₹5 Lakhs",
  "5-10-lakhs": "₹5 – ₹10 Lakhs",
  "10-lakhs-plus": "₹10 Lakhs+",
  "not-decided": "Not decided yet",
};

const has = (map, key) => Object.prototype.hasOwnProperty.call(map, key);

// Old or unknown values are still shown in a readable way ("some-slug" -> "Some Slug")
const humanize = (value) =>
  value.replace(/[-_]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const createLabeler = (map) => (value) => {
  const key = typeof value === "string" ? value.trim() : "";

  if (!key) return "—";

  return has(map, key) ? map[key] : humanize(key);
};

const serviceLabel = createLabeler(SERVICES);
const budgetLabel = createLabeler(BUDGETS);

const isValidService = (value) => has(SERVICES, value);
const isValidBudget = (value) => has(BUDGETS, value);

const formatBytes = (bytes) => {
  const size = Number(bytes) || 0;

  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

module.exports = {
  SERVICES,
  BUDGETS,
  serviceLabel,
  budgetLabel,
  isValidService,
  isValidBudget,
  formatBytes,
};
