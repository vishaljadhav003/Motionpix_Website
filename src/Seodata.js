// seoData.js
// Single source of truth for SEO: one entry per LIVE route in App.jsx.
// Rules: title <= 60 chars, description 120-160 chars, 5-8 unique keywords per page.
// A route that is not in PAGES is treated as "noindex" by Seo.jsx, so every new page needs an entry here.
// sitemap.xml is generated from PAGES (npm run sitemap), so it can never go out of sync.

import { teamMembersSeed, teamSlug, PLACEHOLDER_IMAGE, getDisplayName } from "./Teamdata.js";

export const SITE = {
  url: "https://www.motionpixindia.com", // no trailing slash
  name: "MotionPix India",
  legalName: "Motionpix Cinematix India Private Limited", // TODO: confirm the registered name
  alternateNames: ["MotionPix", "MotionPix Cinematix"],
  defaultTitle: "MotionPix India | 3D Animation, AR/VR & Video Studio",
  description:
    "MotionPix India is a creative studio for 3D and 2D animation, product visualization, corporate films, AR/VR, e-learning and web design. Start your project.",
  logo: "/Logo1.png", // same logo file the Navbar uses (public/Logo1.png)
  ogImage: "/og-image.jpg", // TODO: create a 1200x630 image in /public (share previews are blank without it)
  // TODO (optional but good for local SEO): fill the real details, the empty ones are skipped.
  contact: { email: "", phone: "", locality: "", region: "", postalCode: "", country: "IN" },
  social: [
    // TODO: add ONLY your real profile links, e.g.
    // "https://www.linkedin.com/company/your-page",
    // "https://www.instagram.com/your-page",
    // "https://www.facebook.com/your-page",
    // "https://www.youtube.com/@your-channel",
  ],
};

// The route that shows <TeamSection />. Person schema (name + photo) is published on this page.
// TODO: change it if the team section lives on another page (for example "/").
export const TEAM_PAGE = "/about";

export const TEAM_MEMBERS = teamMembersSeed.map((member) => ({
  // Built from the first name so existing /about#team-<name> links keep working
  id: `team-${teamSlug(member.name)}`,
  // Full name when it is filled in teamData.js, so Google can match a search like "Vishal Jadhav"
  name: getDisplayName(member),
  firstName: member.name,
  role: member.role,
  // Placeholder photos are not published, a wrong photo is worse than none
  image: member.image && member.image !== PLACEHOLDER_IMAGE ? member.image : "",
  // Only real profile links, empty ones are skipped in the schema
  sameAs: member.sameAs || [],
}));

// Category (parent) pages, used for breadcrumbs: Home > Services > Category > Service
const CATEGORY = {
  animation: "/services/animation-visualization",
  film: "/services/film-visual-content",
  branding: "/services/branding-creative",
  web: "/services/web-mobile-interface-design",
  learning: "/services/learning-training",
  immersive: "/services/immersive-technology",
  exhibition: "/services/exhibition-experiences",
};

export const PAGES = {
  "/": {
    name: "Home",
    title: "MotionPix India | 3D Animation, AR/VR & Video Studio",
    description: SITE.description,
    keywords:
      "3D animation company in India, 2D animation studio, product visualization, corporate video production, AR VR development, e-learning development, motion graphics, MotionPix India",
  },
  "/about": {
    name: "About",
    title: "About MotionPix India | Animation & Creative Studio",
    description:
      "Meet MotionPix India, a creative studio combining animation, film, branding and immersive technology to turn complex ideas into clear, engaging visuals.",
    keywords:
      "about MotionPix India, animation studio India, creative studio India, animation and film company, visual communication agency, MotionPix team",
  },
  "/services": {
    name: "Services",
    title: "Animation, Film, Branding, Web & AR/VR Services | MotionPix",
    description:
      "Explore MotionPix India services: 3D and 2D animation, films, branding, web and app design, e-learning, AR/VR and exhibition experiences for your brand.",
    keywords:
      "animation services India, video production services India, branding services, web design services, e-learning development, AR VR services, creative agency India",
  },

  // ---------- Animation & Visualization ----------
  [CATEGORY.animation]: {
    name: "Animation & Visualization",
    service: "Animation and Visualization",
    parent: "/services",
    title: "Animation & Visualization Services | MotionPix India",
    description:
      "Animation and visualization services in India: 3D and 2D animation, product visualization, industrial animation, motion graphics and explainers.",
    keywords:
      "animation and visualization services, 3D animation company in India, 2D animation studio, product visualization, industrial animation, explainer videos",
  },
  "/services/2d-animation": {
    name: "2D Animation",
    service: "2D Animation",
    parent: CATEGORY.animation,
    title: "2D Animation Services in India | MotionPix India",
    description:
      "Custom 2D animation services in India: explainer videos, motion graphics and animated stories that simplify your message. Talk to MotionPix India today.",
    keywords:
      "2D animation services in India, 2D animation company, 2D animation studio, 2D explainer video, 2D animated video, animation video production",
  },
  "/services/3d-animation": {
    name: "3D Animation",
    service: "3D Animation",
    parent: CATEGORY.animation,
    title: "3D Animation Company in India | MotionPix India",
    description:
      "3D animation company in India creating product, industrial and explainer animations with realistic visuals. Share your brief with MotionPix India.",
    keywords:
      "3D animation company in India, 3D animation services, 3D animation studio, 3D product animation, 3D explainer video, 3D modelling and rendering",
  },
  "/services/product-visualization": {
    name: "Product Visualization",
    service: "3D Product Visualization",
    parent: CATEGORY.animation,
    title: "3D Product Visualization in India | MotionPix India",
    description:
      "3D product visualization in India: photorealistic renders and animations that show how your product looks and works. Ask MotionPix India for a quote.",
    keywords:
      "3D product visualization India, product rendering services, 3D product animation, product visualization company, photorealistic 3D rendering",
  },
  "/services/engineering-industrial-animation": {
    name: "Engineering & Industrial Animation",
    service: "Engineering and Industrial Animation",
    parent: CATEGORY.animation,
    title: "Engineering & Industrial Animation India | MotionPix India",
    description:
      "Engineering and industrial animation company in India: 3D animations of machines, plants and processes for sales and training. Contact MotionPix India.",
    keywords:
      "industrial animation India, engineering animation company, machine animation video, process animation, plant animation, industrial 3D animation",
  },
  "/services/technical-visualization": {
    name: "Technical Visualization",
    service: "Technical Visualization",
    parent: CATEGORY.animation,
    title: "Technical Visualization in India | MotionPix India",
    description:
      "Technical visualization in India: accurate 3D animations and diagrams that explain machines, systems and processes clearly. Contact MotionPix India.",
    keywords:
      "technical visualization India, technical animation services, 3D technical illustration, working principle animation, technical explainer video",
  },
  "/services/motiongraphics": {
    name: "Motion Graphics",
    service: "Motion Graphics",
    parent: CATEGORY.animation,
    title: "Motion Graphics Company in India | MotionPix India",
    description:
      "Motion graphics company in India creating animated logos, explainers, infographics and social videos. Bring your idea to life with MotionPix India.",
    keywords:
      "motion graphics company in India, motion graphics studio, motion graphics video, animated infographics, logo animation, explainer motion graphics",
  },
  "/services/explainer-content": {
    name: "Explainer Content",
    service: "Explainer Video Production",
    parent: CATEGORY.animation,
    title: "Explainer Video Company in India | MotionPix India",
    description:
      "Explainer video company in India turning complex products and processes into short, clear animated videos. Get your explainer from MotionPix India.",
    keywords:
      "explainer video company in India, explainer video production, animated explainer video, product explainer video, corporate explainer video",
  },

  // ---------- Film & Visual Content ----------
  [CATEGORY.film]: {
    name: "Film & Visual Content",
    service: "Film and Visual Content Production",
    parent: "/services",
    title: "Film & Visual Content Production | MotionPix India",
    description:
      "Film and visual content production in India: corporate films, product videos, promos, photography, video editing and VFX from MotionPix India.",
    keywords:
      "film production company India, corporate video production, product film makers, promotional video production, video editing and VFX, photography and videography",
  },
  "/services/corporate-brand-films": {
    name: "Corporate & Brand Films",
    service: "Corporate and Brand Film Production",
    parent: CATEGORY.film,
    title: "Corporate Film Production in India | MotionPix India",
    description:
      "Corporate film production in India: brand films, company profiles and corporate videos that tell your story. Create yours with MotionPix India.",
    keywords:
      "corporate film production India, corporate video production company, brand film makers, company profile video, corporate video India",
  },
  "/services/product-industrial-films": {
    name: "Product & Industrial Films",
    service: "Product and Industrial Film Production",
    parent: CATEGORY.film,
    title: "Industrial & Product Film Production | MotionPix India",
    description:
      "Industrial and product film production in India showing products, plants and processes on screen. Plan your film with MotionPix India.",
    keywords:
      "industrial film production India, product film makers, industrial video production, factory video, product video production",
  },
  "/services/promotional-videos": {
    name: "Promotional Videos",
    service: "Promotional Video Production",
    parent: CATEGORY.film,
    title: "Promotional Video Production India | MotionPix India",
    description:
      "Promotional video production in India: ads, product promos and social-ready videos that grab attention. Launch your next campaign with MotionPix India.",
    keywords:
      "promotional video production India, promo video makers, product promo video, ad film production, social media video production",
  },
  "/services/photography-videography": {
    name: "Photography & Videography",
    service: "Photography and Videography",
    parent: CATEGORY.film,
    title: "Photography & Videography in India | MotionPix India",
    description:
      "Photography and videography services in India for products, corporate events and brand campaigns. Book a shoot with MotionPix India.",
    keywords:
      "photography and videography services India, corporate photography, product photography, event videography, commercial video shoot",
  },
  "/services/editing-vfx": {
    name: "Editing & VFX",
    service: "Video Editing and VFX",
    parent: CATEGORY.film,
    title: "Video Editing & VFX Services India | MotionPix India",
    description:
      "Video editing and VFX services in India: post-production, compositing, colour grading and visual effects. Polish your footage with MotionPix India.",
    keywords:
      "video editing services India, VFX services, post production company, visual effects studio, compositing and colour grading",
  },

  // ---------- Branding & Creative ----------
  [CATEGORY.branding]: {
    name: "Branding & Creative",
    service: "Branding and Creative Design",
    parent: "/services",
    title: "Branding & Creative Design Services | MotionPix India",
    description:
      "Branding and creative design in India: brand identity, graphic design, marketing collaterals, infographics and campaign creatives by MotionPix India.",
    keywords:
      "branding services India, brand identity design, graphic design services, marketing collaterals, campaign creatives, creative design agency",
  },
  "/services/brand-identity": {
    name: "Brand Identity",
    service: "Brand Identity and Logo Design",
    parent: CATEGORY.branding,
    title: "Brand Identity & Logo Design India | MotionPix India",
    description:
      "Brand identity and logo design in India: logos, brand systems and guidelines that make your business stand out. Build your brand with MotionPix India.",
    keywords:
      "brand identity design India, logo design services, brand design agency, brand guidelines, visual identity design",
  },
  "/services/graphicsdesign": {
    name: "Graphic Design",
    service: "Graphic Design",
    parent: CATEGORY.branding,
    title: "Graphic Design Services in India | MotionPix India",
    description:
      "Graphic design services in India: brochures, social creatives, presentations and infographics that keep your brand consistent. Work with MotionPix India.",
    keywords:
      "graphic design services India, graphic design company, infographic design, presentation design, marketing creatives, campaign creatives",
  },
  "/services/marketing-collaterals": {
    name: "Marketing Collaterals",
    service: "Marketing Collaterals Design",
    parent: CATEGORY.branding,
    title: "Marketing Collaterals Design in India | MotionPix India",
    description:
      "Marketing collaterals design in India: brochures, catalogues, flyers, standees and sales kits that present your brand with impact. Talk to MotionPix India.",
    keywords:
      "marketing collaterals design India, brochure design, catalogue design, flyer design, sales kit design, print and digital collaterals",
  },
  "/services/presentation-infographic-design": {
    name: "Presentation & Infographic Design",
    service: "Presentation and Infographic Design",
    parent: CATEGORY.branding,
    title: "Presentation & Infographic Design | MotionPix India",
    description:
      "Presentation and infographic design in India: clear, branded decks and data visuals that explain ideas and win attention. Get yours from MotionPix India.",
    keywords:
      "presentation design India, PowerPoint design services, infographic design, corporate presentation design, pitch deck design, data visualization design",
  },
  "/services/campaign-creatives": {
    name: "Campaign Creatives",
    service: "Campaign Creative Design",
    parent: CATEGORY.branding,
    title: "Campaign Creatives & Ad Design | MotionPix India",
    description:
      "Campaign creatives in India: ad designs, social media creatives and launch visuals that keep your campaign message consistent. Plan with MotionPix India.",
    keywords:
      "campaign creatives India, ad creative design, social media creatives, advertising design agency, product launch creatives, marketing campaign design",
  },

  // ---------- Web, Mobile & Interface Design ----------
  [CATEGORY.web]: {
    name: "Web, Mobile & Interface Design",
    service: "Web, Mobile and Interface Design",
    parent: "/services",
    title: "Web, Mobile & UI Design Services | MotionPix India",
    description:
      "Web, mobile and interface design in India: websites, mobile apps, UI/UX, landing pages and digital product experiences by MotionPix India.",
    keywords:
      "web design services India, mobile app design, UI UX design, landing page design, website design company, digital product design",
  },
  "/services/web-design": {
    name: "Website Design",
    service: "Website Design",
    parent: CATEGORY.web,
    title: "Website Design Company in India | MotionPix India",
    description:
      "Website design company in India building responsive, modern and conversion-focused websites for brands. Get a custom website from MotionPix India.",
    keywords:
      "website design company in India, website design services, custom website design, responsive web design, business website design, interactive website",
  },
  "/services/ui-ux-design": {
    name: "UI/UX Design",
    service: "UI/UX Design",
    parent: CATEGORY.web,
    title: "UI/UX Design Services in India | MotionPix India",
    description:
      "UI/UX design services in India: intuitive interfaces, wireframes and prototypes for websites and apps. Design better products with MotionPix India.",
    keywords:
      "UI UX design services India, UI UX design company, user interface design, user experience design, wireframe and prototype design",
  },
  "/services/landing-pages": {
    name: "Landing Pages",
    service: "Landing Page Design",
    parent: CATEGORY.web,
    title: "Landing Page Design in India | MotionPix India",
    description:
      "Landing page design in India focused on clear messaging and conversions for campaigns and product launches. Get yours from MotionPix India.",
    keywords:
      "landing page design India, landing page design services, conversion focused landing page, campaign landing page, product launch page",
  },
  "/services/mobile-app-design": {
    name: "Mobile App Design",
    service: "Mobile App Design",
    parent: CATEGORY.web,
    title: "Mobile App Design Services India | MotionPix India",
    description:
      "Mobile app design services in India: clean, intuitive UI/UX for Android and iOS apps. Turn your app idea into a polished design with MotionPix India.",
    keywords:
      "mobile app design India, app UI UX design, Android app design, iOS app design, mobile app design company",
  },
  "/services/digital-product-experiences": {
    name: "Digital Product Experiences",
    service: "Digital Product Experience Design",
    parent: CATEGORY.web,
    title: "Digital Product Experience Design | MotionPix India",
    description:
      "Digital product experience design that connects brands with users through interactive interfaces, demos and presentations. Explore MotionPix India.",
    keywords:
      "digital product experience design, interactive product demo, digital presentations, interactive digital experiences, product experience design India",
  },

  // ---------- Learning & Training ----------
  [CATEGORY.learning]: {
    name: "Learning & Training",
    service: "E-Learning and Training Solutions",
    parent: "/services",
    title: "E-Learning & Training Solutions | MotionPix India",
    description:
      "E-learning and training solutions in India: interactive courses, product and safety training, simulations and assessments by MotionPix India.",
    keywords:
      "e-learning development India, corporate training content, interactive learning, safety training content, simulation based training, Articulate Storyline",
  },
  "/services/e-learning": {
    name: "E-Learning",
    service: "E-Learning Development",
    parent: CATEGORY.learning,
    title: "E-Learning Development in India | MotionPix India",
    description:
      "E-learning development company in India creating interactive courses, product training and safety training with Articulate Storyline. Talk to MotionPix India.",
    keywords:
      "e-learning development company India, e-learning content development, Articulate Storyline development, interactive e-learning, product training, safety training",
  },
  "/services/interactive-learning": {
    name: "Interactive Learning",
    service: "Interactive Learning Development",
    parent: CATEGORY.learning,
    title: "Interactive Learning Development India | MotionPix India",
    description:
      "Interactive learning development in India: engaging modules, quizzes and activities that make training easy to follow. Talk to MotionPix India today.",
    keywords:
      "interactive learning development India, interactive e-learning content, interactive training modules, digital learning solutions, corporate training content",
  },
  "/services/articulate-storyline": {
    name: "Articulate Storyline",
    service: "Articulate Storyline Development",
    parent: CATEGORY.learning,
    title: "Articulate Storyline Development India | MotionPix India",
    description:
      "Articulate Storyline development in India: custom interactive e-learning courses, simulations and assessments for your training goals. Talk to MotionPix India.",
    keywords:
      "Articulate Storyline development India, Articulate Storyline 360 courses, Storyline e-learning developer, custom e-learning courses, e-learning company India",
  },
  "/services/product-training": {
    name: "Product Training",
    service: "Product Training Content",
    parent: CATEGORY.learning,
    title: "Product Training Content in India | MotionPix India",
    description:
      "Product training content in India: animated and interactive modules that teach teams and customers how your product works. Talk to MotionPix India.",
    keywords:
      "product training content India, product training videos, interactive product training, sales training content, technical product training, e-learning for products",
  },
  "/services/employee-safety-training": {
    name: "Employee & Safety Training",
    service: "Employee and Safety Training Content",
    parent: CATEGORY.learning,
    title: "Employee & Safety Training Content | MotionPix India",
    description:
      "Employee and safety training content in India: animated, interactive modules for onboarding, compliance and workplace safety. Ask MotionPix India.",
    keywords:
      "safety training content India, employee training modules, workplace safety animation, compliance training e-learning, onboarding training content, EHS training",
  },
  "/services/simulation-assessment": {
    name: "Simulation & Assessment",
    service: "Simulation and Assessment Development",
    parent: CATEGORY.learning,
    title: "Simulation & Assessment Development | MotionPix India",
    description:
      "Simulation and assessment development in India: scenario-based practice and quizzes that test skills and track learner progress. Talk to MotionPix India.",
    keywords:
      "simulation based training India, learning assessment development, scenario based e-learning, interactive simulations, skill assessment content, training simulations",
  },

  // ---------- Immersive Technology ----------
  [CATEGORY.immersive]: {
    name: "Immersive Technology",
    service: "Immersive Technology Development",
    parent: "/services",
    title: "AR, VR & Immersive Technology | MotionPix India",
    description:
      "Immersive technology in India: AR, VR, MR and XR experiences, virtual showrooms, interactive 3D and immersive training by MotionPix India.",
    keywords:
      "immersive technology India, AR VR development company, XR solutions, virtual showroom, interactive 3D, immersive training",
  },
  "/services/ar-vr-mr-xr": {
    name: "AR/VR",
    service: "AR, VR, MR and XR Development",
    parent: CATEGORY.immersive,
    title: "AR VR Development Company in India | MotionPix India",
    description:
      "AR VR development company in India building AR, VR, MR and XR experiences, virtual showrooms and immersive training. Explore MotionPix India.",
    keywords:
      "AR VR development company India, augmented reality development, virtual reality development, MR XR solutions, virtual showroom, immersive training",
  },
  "/services/virtual-showrooms": {
    name: "Virtual Showrooms",
    service: "Virtual Showroom Development",
    parent: CATEGORY.immersive,
    title: "Virtual Showroom Development India | MotionPix India",
    description:
      "Virtual showroom development in India: explore products in realistic 3D from any device, with no physical stand needed. Build yours with MotionPix India.",
    keywords:
      "virtual showroom development India, 3D virtual showroom, online product showroom, virtual exhibition, interactive 3D showroom, virtual product display",
  },
  "/services/interactive-3d": {
    name: "Interactive 3D",
    service: "Interactive 3D Experiences",
    parent: CATEGORY.immersive,
    title: "Interactive 3D Experiences in India | MotionPix India",
    description:
      "Interactive 3D experiences in India: rotate, explore and configure products in real time on web and devices. Plan yours with MotionPix India.",
    keywords:
      "interactive 3D India, 3D product configurator, real time 3D, interactive 3D web experience, 3D product viewer, interactive product demo",
  },
  "/services/immersive-training": {
    name: "Immersive Training",
    service: "Immersive Training Solutions",
    parent: CATEGORY.immersive,
    title: "Immersive Training Solutions | MotionPix India",
    description:
      "Immersive training solutions in India: VR and AR based practice for machines, processes and safety, with no risk on the shop floor. Ask MotionPix India.",
    keywords:
      "immersive training India, VR training solutions, AR training, virtual reality safety training, VR machine training, simulation based training",
  },

  // ---------- Exhibition & Experiences ----------
  [CATEGORY.exhibition]: {
    name: "Exhibition & Experiences",
    service: "Exhibition and Experience Design",
    parent: "/services",
    title: "Exhibition & Experience Design | MotionPix India",
    description:
      "Exhibition and experience design in India: exhibition creatives, 3D stand design, interactive displays and event content by MotionPix India.",
    keywords:
      "exhibition design India, exhibition creatives, 3D stand design, interactive displays, digital installations, event content",
  },
  "/services/exhibition-creative": {
    name: "Exhibition Creative",
    service: "Exhibition Creative Design",
    parent: CATEGORY.exhibition,
    title: "Exhibition Creative Design in India | MotionPix India",
    description:
      "Exhibition creative design in India: stand graphics, screen content and visual themes that make your brand stand out on the show floor. Ask MotionPix India.",
    keywords:
      "exhibition creative design India, exhibition stand graphics, trade show creatives, exhibition visual design, booth content design, expo creatives",
  },
  "/services/exhibition-3d-design": {
    name: "Exhibition 3D Design",
    service: "Exhibition 3D Stand Design",
    parent: CATEGORY.exhibition,
    title: "Exhibition 3D Stand Design India | MotionPix India",
    description:
      "Exhibition 3D stand design in India: realistic 3D views and walkthroughs of your stand before it is built. Plan your next show with MotionPix India.",
    keywords:
      "exhibition 3D design India, 3D stand design, exhibition stand rendering, booth design 3D, stand walkthrough animation, trade show 3D design",
  },
  "/services/interactive-displays": {
    name: "Interactive Displays",
    service: "Interactive Display Content",
    parent: CATEGORY.exhibition,
    title: "Interactive Displays & Kiosk Content | MotionPix India",
    description:
      "Interactive display content in India: touch screen kiosks, product explorers and video walls that keep visitors engaged. Talk to MotionPix India.",
    keywords:
      "interactive display content India, touch screen kiosk software, interactive kiosk design, video wall content, exhibition touch screen, digital signage content",
  },
  "/services/digital-installations": {
    name: "Digital Installations",
    service: "Digital Installation Design",
    parent: CATEGORY.exhibition,
    title: "Digital Installations for Events | MotionPix India",
    description:
      "Digital installations in India: projection, LED and interactive displays that turn events, showrooms and exhibitions into memorable experiences.",
    keywords:
      "digital installations India, interactive installations, projection mapping content, LED display content, experiential installations, event installations",
  },
  "/services/product-experiences": {
    name: "Product Experiences",
    service: "Interactive Product Experiences",
    parent: CATEGORY.exhibition,
    title: "Interactive Product Experiences | MotionPix India",
    description:
      "Interactive product experiences in India: digital demos and immersive displays that let visitors explore how your product works. Talk to MotionPix India.",
    keywords:
      "interactive product experience India, product demo experience, digital product showcase, interactive product display, experiential marketing, product launch experience",
  },
  "/services/event-content": {
    name: "Event Content",
    service: "Event Content Production",
    parent: CATEGORY.exhibition,
    title: "Event Content & Video Production | MotionPix India",
    description:
      "Event content production in India: opening films, stage visuals, teasers and highlight videos for launches, conferences and exhibitions. Ask MotionPix India.",
    keywords:
      "event content production India, event video production, stage visuals, launch event videos, conference video content, event highlight video",
  },

  // ---------- Other pages ----------
  "/industries": {
    name: "Industries",
    title: "Industries We Serve | MotionPix India",
    description:
      "Industry-focused animation, visualization, film and training solutions from MotionPix India for businesses across sectors.",
    keywords:
      "industrial animation India, industry specific animation, animation for manufacturing, corporate video industries, visualization for business",
  },
  "/careers": {
    name: "Careers",
    title: "Careers at MotionPix India | Join Our Studio",
    description:
      "Explore careers at MotionPix India, a creative studio for animation, film, design and immersive tech. Join our team and grow with us.",
    keywords:
      "animation jobs India, creative studio careers, 3D animator jobs, graphic designer jobs, video editor jobs, MotionPix India careers",
  },
  "/contact": {
    name: "Contact",
    title: "Contact MotionPix India | Start Your Project",
    description:
      "Contact MotionPix India for animation, film, branding, web and AR/VR projects. Share your requirement and get a response from our team.",
    keywords:
      "contact MotionPix India, animation company contact, video production enquiry, get a quote animation, creative studio India",
  },
};

// Pages that have SEO text ready but NO route in App.jsx yet.
// Not used by Seo.jsx and not in the sitemap. Move an entry into PAGES when its route exists.
export const DRAFT_PAGES = {
  "/services/digital-presentations": {
    name: "Digital Presentations",
    service: "Digital Presentation Design",
    parent: CATEGORY.web,
    title: "Digital Presentation Design in India | MotionPix India",
    description:
      "Digital presentation design in India: interactive and animated presentations that explain your offer clearly and impress clients. Talk to MotionPix India.",
    keywords:
      "digital presentation design India, interactive presentation design, animated presentation, corporate presentation design, sales presentation design",
  },
  "/services/liveshoots": {
    name: "Live Shoots",
    service: "Live Shoot and Video Production",
    title: "Live Shoot & Video Production India | MotionPix India",
    description:
      "Live shoot and video production services in India for corporate, product and promotional films. Plan your shoot with MotionPix India.",
    keywords:
      "live shoot services India, video production company India, corporate video shoot, product video shoot, commercial film shoot",
  },
  "/services/product-branding": {
    name: "Product Branding",
    service: "Product Branding",
    title: "Product Branding Services in India | MotionPix India",
    description:
      "Product branding services in India that give your product a distinct identity, look and story. Build a stronger brand with MotionPix India.",
    keywords:
      "product branding services India, product branding agency, product identity design, brand positioning, product launch branding",
  },
  "/services/print-media": {
    name: "Print Media",
    service: "Print Media Design",
    title: "Print Media Design Services India | MotionPix India",
    description:
      "Print media design in India: brochures, catalogues, flyers, posters and marketing collaterals designed for impact. Get print-ready work from MotionPix India.",
    keywords:
      "print media design India, brochure design, catalogue design, flyer and poster design, marketing collaterals, print design services",
  },
  "/services/sop": {
    name: "SOP Digitization",
    service: "SOP Digitization",
    title: "SOP Digitization Services in India | MotionPix India",
    description:
      "SOP digitization services in India: convert standard operating procedures into clear animated, interactive and e-learning formats. Talk to MotionPix India.",
    keywords:
      "SOP digitization India, SOP to e-learning, SOP training videos, standard operating procedure animation, digital SOP, employee training content",
  },
  "/gallery": {
    name: "Gallery",
    title: "Our Work: Animation, Film & Design Portfolio | MotionPix",
    description:
      "Browse the MotionPix India portfolio: 3D and 2D animation, product visualization, films, AR/VR and design projects created for brands.",
    keywords:
      "animation portfolio India, 3D animation portfolio, video production portfolio, design portfolio, MotionPix India work",
  },
  "/data": {
    name: "Resources",
    title: "Resources: Blogs, News & FAQs | MotionPix India",
    description:
      "Explore MotionPix India resources: blogs, news, FAQs and client testimonials on animation, visualization, AR/VR and creative technology.",
    keywords:
      "animation resources, animation blogs India, creative studio news, animation FAQ, client testimonials, MotionPix India resources",
  },
  "/data/blogs": {
    name: "Blogs",
    title: "Animation, Video & AR/VR Blog | MotionPix India",
    description:
      "Read MotionPix India blogs on 3D animation, explainer videos, AR/VR, e-learning, branding and web design to plan better creative projects.",
    keywords:
      "animation blog, explainer video tips, 3D animation blog, AR VR blog, e-learning blog, branding tips",
  },
  "/data/news": {
    name: "News",
    title: "News & Updates | MotionPix India",
    description:
      "Latest news and updates from MotionPix India: projects, announcements and milestones from our animation and creative studio.",
    keywords:
      "MotionPix India news, animation studio news, creative studio updates, animation industry updates, company announcements",
  },
  "/data/faq": {
    name: "FAQ",
    title: "FAQs About Our Services | MotionPix India",
    description:
      "Answers to common questions about MotionPix India services, process and project workflow for animation, film, design and AR/VR projects.",
    keywords:
      "animation FAQ, video production FAQ, MotionPix India FAQ, animation process, creative project workflow",
  },
  "/data/testimonials": {
    name: "Testimonials",
    title: "Client Testimonials | MotionPix India",
    description:
      "Read client testimonials for MotionPix India and see what brands say about working with our animation and creative team.",
    keywords:
      "MotionPix India reviews, client testimonials, animation studio reviews, video production testimonials, client feedback",
  },
};

// Used for the Organization schema ("knowsAbout") on the home page.
export const KNOWS_ABOUT = [
  "3D Animation",
  "2D Animation",
  "Product Visualization",
  "Motion Graphics",
  "Corporate Film Production",
  "Brand Identity",
  "Website Design",
  "UI/UX Design",
  "Mobile Apps Design",
  "E-Learning Development",
  "AR VR Development",
];