import { useEffect, useRef, useState } from "react";
import "./Contact.css";
import axios from "axios";

const Contact = () => {
  const [data, setData] = useState({
    fullname: "",
    company: "",
    email: "",
    services: "",
    contact: "",
    msg: "",
    budget: "",
  });

  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  // Static focus dot effect.
  // The dot stays beside the currently active form field.
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;

    if (!canvas || !container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const context = canvas.getContext("2d");

    const RADIUS = 6;

    let width = 0;
    let height = 0;
    let currentFocus = null;

    const getThemeColor = () => {
      const styles = getComputedStyle(container);

      return (
        styles.getPropertyValue("--accent-color").trim() || "#40cb90"
      );
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      width = container.clientWidth;
      height = container.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      drawDot();
    };

    const drawDot = () => {
      context.clearRect(0, 0, width, height);

      if (!currentFocus) return;

      const containerRect = container.getBoundingClientRect();
      const inputRect = currentFocus.getBoundingClientRect();

      const x = inputRect.left - containerRect.left - 14;
      const y =
        inputRect.top -
        containerRect.top +
        inputRect.height / 2;

      const accentColor = getThemeColor();

      context.beginPath();
      context.arc(x, y, RADIUS, 0, Math.PI * 2);
      context.fillStyle = accentColor;
      context.shadowBlur = 12;
      context.shadowColor = accentColor;
      context.fill();
      context.shadowBlur = 0;
    };

    const handleFocusIn = (event) => {
      if (event.target.matches("input, select, textarea")) {
        currentFocus = event.target;
        drawDot();
      }
    };

    const handleFocusOut = (event) => {
      if (!container.contains(event.relatedTarget)) {
        currentFocus = null;
        context.clearRect(0, 0, width, height);
      }
    };

    const handleResize = () => {
      resize();
    };

    resize();

    container.addEventListener("focusin", handleFocusIn);
    container.addEventListener("focusout", handleFocusOut);
    window.addEventListener("resize", handleResize);

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("focusin", handleFocusIn);
      container.removeEventListener("focusout", handleFocusOut);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  const datahandler = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!data.fullname.trim()) {
      newErrors.fullname = "Please enter your full name.";
    }

    if (!data.company.trim()) {
      newErrors.company = "Please enter your company name.";
    }

    if (!data.email.trim()) {
      newErrors.email = "Please enter your work email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!data.services) {
      newErrors.services = "Please select a service.";
    }

    if (!data.msg.trim()) {
      newErrors.msg = "Please tell us about your project.";
    }

     if (!data.budget) {
      newErrors.budget = "Please enter your estimated budget.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const saveform = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const isConfirmed = window.confirm(
      "Are you sure you want to submit?"
    );

    if (!isConfirmed) return;

    try {
      const nameParts = data.fullname.trim().split(/\s+/);

      const fname = nameParts.shift() || "";
      const lname = nameParts.join(" ");

      const res = await axios.post(
        "/api/contact",
       {
          fname,
          lname,
          company: data.company.trim(),
          email: data.email.trim(),
          services: data.services,
          contact: data.contact.trim(),
          msg: data.msg.trim(),
          budget: data.budget,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        alert("🎉 Inquiry submitted successfully!");

        setData({
          fullname: "",
          company: "",
          email: "",
          services: "",
          contact: "",
          msg: "",
          budget: "",
        });

        setErrors({});
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("❌ Error submitting inquiry");
    }
  };

  return (
    <section className="contact-section" ref={sectionRef}>
      <div
        className="contact-bg-orb contact-bg-orb-one"
        aria-hidden="true"
      ></div>

      <div
        className={`container contact-heading-wrap text-center scroll-reveal ${
          isVisible ? "revealed" : ""
        }`}
      >
        <span className="contact-kicker">LET’S CONNECT</span>

        <h2 className="contact-title">
          Quick <span>Enquiry</span>
        </h2>

        <p className="contact-subtitle">
          Fill out the form below and our team will get back to you shortly.
        </p>
      </div>

      <div className="container contact-form-shell">
        <div
          className={`contact-form-card scroll-reveal scroll-reveal-delay ${
            isVisible ? "revealed" : ""
          }`}
        >
          <div
            className="contact-form-border"
            aria-hidden="true"
          ></div>

          <form onSubmit={saveform} noValidate>
            <div className="row g-4">

              {/* Full Name */}
              <div className="col-md-6">
                <label className="contact-label">
                  Full Name*
                </label>

                <input
                  type="text"
                  name="fullname"
                  className={`form-control contact-input fw-bold ${
                    errors.fullname ? "input-error" : ""
                  }`}
                  placeholder="Enter your name"
                  value={data.fullname}
                  onChange={datahandler}
                  required
                />

                {errors.fullname && (
                  <div className="contact-error-message">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    {errors.fullname}
                  </div>
                )}
              </div>

              {/* Company Name */}
              <div className="col-md-6">
                <label className="contact-label">
                  Company Name*
                </label>

                <input
                  type="text"
                  name="company"
                  className={`form-control contact-input fw-bold ${
                    errors.company ? "input-error" : ""
                  }`}
                  placeholder="Enter your company name"
                  value={data.company}
                  onChange={datahandler}
                  required
                />

                {errors.company && (
                  <div className="contact-error-message">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    {errors.company}
                  </div>
                )}
              </div>

              {/* I'm Interested In */}
              <div className="col-12">
                <label className="contact-label">
                  I'm Interested In*
                </label>

                <select
                  className={`form-control contact-input contact-select fw-bold ${
                    errors.services ? "input-error" : ""
                  }`}
                  name="services"
                  value={data.services}
                  onChange={datahandler}
                  required
                >
                  <option value="">Select a service</option>

                  <option value="2d-animation">
                    2D Animations
                  </option>

                  <option value="3d-animation">
                    3D Animations
                  </option>

                  <option value="ar-vr">
                    AR/VR
                  </option>

                  <option value="digitalmarketing">
                    Digital Marketing
                  </option>

                  <option value="web-design">
                    Website Design
                  </option>

                  <option value="e-learning">
                    E-Learning
                  </option>

                  <option value="graphicsdesign">
                    Graphics Design
                  </option>

                  <option value="motiongraphics">
                    Motion Graphics
                  </option>

                  <option value="sop">
                    SOP Digitization
                  </option>

                  <option value="print-media">
                    Print Media
                  </option>

                  <option value="product-branding">
                    Branding
                  </option>

                  <option value="live-shoots">
                    Live Shoots
                  </option>

                  <option value="general">
                    General/Other
                  </option>
                </select>

                {errors.services && (
                  <div className="contact-error-message">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    {errors.services}
                  </div>
                )}
              </div>

              {/* Work Email */}
              <div className="col-md-6">
                <label className="contact-label">
                  Work Email*
                </label>

                <input
                  type="email"
                  name="email"
                  className={`form-control contact-input fw-bold ${
                    errors.email ? "input-error" : ""
                  }`}
                  placeholder="you@company.com"
                  value={data.email}
                  onChange={datahandler}
                  required
                />

                {errors.email && (
                  <div className="contact-error-message">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Phone Number - OPTIONAL */}
              <div className="col-md-6">
                <label className="contact-label">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="contact"
                  className="form-control contact-input fw-bold"
                  placeholder="Enter your contact number"
                  value={data.contact}
                  onChange={datahandler}
                />
              </div>

              {/* Tell Us About Your Project */}
              <div className="col-12">
                <label className="contact-label">
                  Tell Us About Your Project*
                </label>

                <textarea
                  className={`form-control contact-input contact-textarea fw-bold ${
                    errors.msg ? "input-error" : ""
                  }`}
                  rows="5"
                  name="msg"
                  placeholder="Briefly describe your project, requirements, timeline or objectives..."
                  value={data.msg}
                  onChange={datahandler}
                  required
                ></textarea>

                {errors.msg && (
                  <div className="contact-error-message">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    {errors.msg}
                  </div>
                )}
              </div>

              {/* Estimated Budget - OPTIONAL */}
              <div className="col-12">
                <label className="contact-label">
                  Estimated Budget*
                </label>

                <select
                  className="form-control contact-input contact-select fw-bold"
                  name="budget"
                  value={data.budget}
                  onChange={datahandler}
                  required
                >
                  <option value="">
                    Select your estimated budget
                  </option>

                  <option value="below-50000">
                    Below ₹ 50,000
                  </option>

                  <option value="50000-1-lakh">
                    ₹50,000 – ₹1 Lakh
                  </option>

                  <option value="1-3-lakhs">
                    ₹1 – ₹3 Lakhs
                  </option>

                  <option value="3-5-lakhs">
                    ₹3 – ₹5 Lakhs
                  </option>

                  <option value="5-10-lakhs">
                    ₹5 – ₹10 Lakhs
                  </option>

                  <option value="10-lakhs-plus">
                    ₹10 Lakhs+
                  </option>

                  <option value="not-decided">
                    Not decided yet
                  </option>
                </select>

                {errors.budget && (
                  <div className="contact-error-message">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    {errors.budget}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="col-12 text-center pt-2">
                <button
                  type="submit"
                  className="btn contact-submit-btn fw-bold px-5 py-3 btn-outline-light"
                >
                  Send Inquiry
                </button>
              </div>
            </div>
          </form>

          <canvas
            ref={canvasRef}
            className="contact-cursor-canvas"
            aria-hidden="true"
          ></canvas>
        </div>
      </div>
    </section>
  );
};

export default Contact;

