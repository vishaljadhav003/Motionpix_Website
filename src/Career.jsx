import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Career.css";

const jobs = [
  {
    title: "Motion Graphics Designer",
    type: "Full Time",
    location: "Onsite / Remote",
    description: `
We are looking for a creative Motion Graphics Designer who can create engaging animations for videos, ads, and social media.

Responsibilities:
• Create motion graphics and visual effects
• Collaborate with creative and marketing teams
• Deliver high-quality animations on time

Requirements:
• After Effects / Premiere Pro
• Strong sense of timing & storytelling
• Portfolio required`,
  },
  {
    title: "3D Animation Artist",
    type: "Internship",
    location: "Onsite",
    description: `
Join our 3D team to work on high-quality animations for branding, product visuals, and explainer videos.

Responsibilities:
• 3D modeling, texturing & animation
• Lighting and rendering
• Support senior artists

Requirements:
• Blender / Maya
• Basic animation principles
• Passion to learn`,
  },
  {
    title: "UI / UX Designer",
    type: "Full Time",
    location: "Remote",
    description: `
We need a UI/UX Designer to craft intuitive, modern, and user-centered designs.

Responsibilities:
• Wireframes & prototypes
• Design systems
• User research & testing

Requirements:
• Figma / Adobe XD
• UX principles
• Strong visual sense`,
  },
  {
    title: "Digital Marketing Executive",
    type: "Full Time",
    location: "Work from Home",
    description: `
Drive brand growth through digital campaigns, SEO, and social media.

Responsibilities:
• Run marketing campaigns
• SEO & analytics
• Social media strategy

Requirements:
• Google Ads / Meta Ads
• SEO basics
• Content planning skills`,
  },
];

const initialForm = {
  name: "",
  email: "",
  role: "",
  message: "",
  resume: null,
};

const validateForm = (form) => {
  const errors = {};

  if (!form.name.trim()) errors.name = "Please enter your full name.";
  if (!form.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!form.role.trim()) errors.role = "Please enter the position you are applying for.";
  if (!form.message.trim()) errors.message = "Please tell us a little about yourself.";
  if (!form.resume) errors.resume = "Please upload your resume.";

  return errors;
};

function Career() {
  const revealRefs = useRef([]);
  const fileRef = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("reveal-active", entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    revealRefs.current.forEach((element) => element && observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: "" }));
    setSubmitError("");
  };

  const handleFileChange = (event) => {
    const resume = event.target.files?.[0] || null;
    setForm((currentForm) => ({ ...currentForm, resume }));
    setErrors((currentErrors) => ({ ...currentErrors, resume: "" }));
    setSubmitError("");
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setForm((currentForm) => ({ ...currentForm, role: job.title }));
    setErrors((currentErrors) => ({ ...currentErrors, role: "" }));

    window.setTimeout(() => {
      document.querySelector(".career-job-detail")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess(false);
    setSubmitError("");

    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const formData = new FormData();
    formData.append("name", form.name.trim());
    formData.append("email", form.email.trim());
    formData.append("role", form.role.trim());
    formData.append("message", form.message.trim());
    formData.append("resume", form.resume);

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/career", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Server error");
      const data = await response.json();
      if (!data.success) throw new Error("Application could not be submitted");

      setSuccess(true);
      setForm(initialForm);
      setErrors({});
      if (fileRef.current) fileRef.current.value = "";
      window.setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Career application error:", error);
      setSubmitError("Something went wrong. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="career-page">
      <div className="career-hero reveal" ref={(element) => (revealRefs.current[0] = element)}>
        <h1>
          Build Your <span>Career</span> With Us
        </h1>
        <p>Join a team where creativity, learning, and innovation grow together.</p>
        <NavLink to="/contact" className="cta-link">
          <button type="button" className="cta-btn">Apply Now</button>
        </NavLink>
      </div>

      <div className="career-why reveal" ref={(element) => (revealRefs.current[1] = element)}>
        <h2 className="section-title">Why <span>Work</span> With Us</h2>
        <div className="why-grid-career mt-3">
          {['Creative Freedom', 'Career Growth', 'Latest Technologies', 'Supportive Team'].map((benefit) => (
            <div className="why-card-career" key={benefit}>{benefit}</div>
          ))}
        </div>
      </div>

      <div className="career-jobs reveal" ref={(element) => (revealRefs.current[2] = element)}>
        <h2 className="section-title">Open <span>Positions</span></h2>
        <div className="jobs-grid mt-3">
          {jobs.map((job) => (
            <article className="job-card" key={job.title}>
              <h3 className="fw-bold">{job.title}</h3>
              <p>{job.type} <span aria-hidden="true">•</span> {job.location}</p>
              <button type="button" className="job-btn fw-bold" onClick={() => handleJobSelect(job)}>
                Apply
              </button>
            </article>
          ))}
        </div>
      </div>

      {selectedJob && (
        <div className="career-job-detail reveal reveal-active" ref={(element) => (revealRefs.current[3] = element)}>
          <h2 className="section-title">Job Description for <span>{selectedJob.title}</span></h2>
          <p className="job-meta">{selectedJob.type} <span aria-hidden="true">•</span> {selectedJob.location}</p>
          <pre className="job-description">{selectedJob.description}</pre>
        </div>
      )}

      <div className="career-form reveal" ref={(element) => (revealRefs.current[4] = element)}>
        <h2 className="section-title">Apply <span>Now</span></h2>
        <form onSubmit={handleSubmit} noValidate className="mt-3">
          <div className={`field-group ${errors.name ? "has-error" : ""}`}>
            <label htmlFor="career-name">Full Name*</label>
            <input id="career-name" type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} aria-invalid={Boolean(errors.name)} />
            {errors.name && <small className="field-error">{errors.name}</small>}
          </div>

          <div className={`field-group ${errors.email ? "has-error" : ""}`}>
            <label htmlFor="career-email">Email Address*</label>
            <input id="career-email" type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} />
            {errors.email && <small className="field-error">{errors.email}</small>}
          </div>

          <div className={`field-group ${errors.role ? "has-error" : ""}`}>
            <label htmlFor="career-role">Position Applying For*</label>
            <input id="career-role" type="text" name="role" placeholder="Position Applying For" value={form.role} onChange={handleChange} aria-invalid={Boolean(errors.role)} />
            {errors.role && <small className="field-error">{errors.role}</small>}
          </div>

          <div className={`field-group ${errors.message ? "has-error" : ""}`}>
            <label htmlFor="career-message">Tell us about yourself</label>
            <textarea id="career-message" name="message" placeholder="Tell us about yourself" value={form.message} onChange={handleChange} aria-invalid={Boolean(errors.message)} />
            {errors.message && <small className="field-error">{errors.message}</small>}
          </div>

          <div className={`field-group ${errors.resume ? "has-error" : ""}`}>
            <label className="upload-box" htmlFor="career-resume">
              <input id="career-resume" ref={fileRef} type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
              <span>{form.resume ? form.resume.name : "Upload Resume (PDF/DOC)*"}</span>
            </label>
            {errors.resume && <small className="field-error">{errors.resume}</small>}
          </div>

          {submitError && <p className="submit-error" role="alert">{submitError}</p>}
          <button type="submit" className="cta-btn submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>

          {success && (
            <div className="success-box" role="status">
              <div className="checkmark">✓</div>
              <p>Application Submitted Successfully</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default Career;
