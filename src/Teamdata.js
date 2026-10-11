// teamData.js
// Single source of truth for the team. Used by TeamSection.jsx (UI) and seoData.js (Person schema).
//
// Fields per member:
//   name      first name. Used for the anchor (#team-<name>), so keep it stable.
//   fullName  "First Last". Shown on the card and published in the Person schema.
//             Google matches a person search on the full name, so fill in every surname.
//             While it is empty, the first name is used instead.
//   sameAs    optional list of the person's REAL profile links (LinkedIn, GitHub, Behance...).
//             Published in the Person schema, it is the strongest hint that connects
//             this page to the person's name in Google. Leave [] if unsure.

export const COMPANY_NAME = "MotionPix India";

// Shown when a member has no real photo yet. It is never published in structured data.
export const PLACEHOLDER_IMAGE = "/team/priya.jpg";

// "Abhijeet" -> "abhijeet". Used for anchors like /about#team-abhijeet
export const teamSlug = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Full name when available, otherwise the first name (also works for members loaded from the API)
export const getDisplayName = (member) => member.fullName?.trim() || member.name;

// "Vishal Jadhav, Web Developer/Software Developer at MotionPix India"
export const getImageAlt = (member) =>
  `${getDisplayName(member)}, ${member.role} at ${COMPANY_NAME}`;

export const teamMembersSeed = [
  {
    name: "Abhijeet",
    fullName: "", // TODO: add surname
    sameAs: [],
    role: "Director Operations",
    location: "Pune, India",
    image: "/Abhijeet.png",
    about:
      "Crafting high-impact digital experiences with a focus on quality, clarity, and execution.",
  },
  {
    name: "Ashwini",
    fullName: "", // TODO: add surname
    sameAs: [],
    role: "Content & Instructional Design Specialist",
    location: "Pune, India",
    image: PLACEHOLDER_IMAGE,
    about:
      "Focused on clean UI, scalable systems, and performance-first development.",
  },
  {
    name: "Himanshu",
    fullName: "", // TODO: add surname
    sameAs: [],
    role: "Sales & Marketing Executive",
    location: "Pune, India",
    image: PLACEHOLDER_IMAGE,
    about:
      "Building reliable web experiences with modern stacks and strong attention to detail.",
  },
  {
    name: "Sadashiv",
    fullName: "", // TODO: add surname
    sameAs: [],
    role: "HR & Admin Executive",
    location: "Pune, India",
    image: PLACEHOLDER_IMAGE,
    about:
      "Turning ideas into polished web products with smooth UX and solid engineering.",
  },
  {
    name: "Pravin",
    fullName: "Pravin", // surname taken from the "about" text below
    sameAs: [],
    role: "AR / VR / XR, Interactive Animation, Digital Twin",
    location: "Pune, India",
    image: "/Pravin.png",
    about:
      "Dr. Pravin Yadav is a PhD-holding researcher, educator, and technologist based in Pune, Maharashtra. A passionate lifelong learner with honed technical skills, he combines academic rigor from Symbiosis International University with deep expertise in VR, XR, animation, and emerging technologies.",
  },
  {
    name: "Arka",
    fullName: "", // TODO: add surname
    sameAs: [],
    role: "Business Development Manager",
    location: "Pune, India",
    image: "/Arka.png",
    about:
      "Leading 3D animation workflows, storytelling, and high-quality visual production.",
  },
  {
    name: "Rutvik",
    fullName: "", // TODO: add surname
    sameAs: [],
    role: "3D Modeling & Environment Artist",
    location: "Amravati, India",
    image: "/Rutvik.png",
    about:
      "Creating detailed 3D assets, environments, and production-ready models.",
  },
  {
    name: "Nageshwar",
    fullName: "", // TODO: add surname
    sameAs: [],
    role: "Video Editing/Motion Graphics Animation",
    location: "Pune, India",
    image: "/Nagesh.png",
    about:
      "Editing and motion work with rhythm, clarity, and strong visual impact.",
  },
  {
    name: "Vishal",
    fullName: "Vishal",
    sameAs: [],
    role: "Web Developer/Software Developer",
    location: "Pune, India",
    image: "/Vishal.png",
    about:
      "Delivering fast, responsive, and maintainable websites with modern UI standards.",
  },
  {
    name: "Sushant",
    fullName: "", // TODO: add surname
    sameAs: [],
    role: "Video Editor",
    location: "Pune, India",
    image: "/Sushant.png",
    about:
      "Building AI-driven solutions and software systems that scale cleanly.",
  },
];