import React, { useEffect, useRef, useState } from "react";
import "./ArticulateStoryline.css";

const storylineServices = [
  { n:"01", title:"Custom Storyline Course Development", icon:"course", text:"Build polished Articulate Storyline courses from source material, with a clear slide sequence, consistent visual design and learner-focused navigation.", tags:["Slide-based courses","Custom layouts"] },
  { n:"02", title:"Interactive Slides & Clickable Hotspots", icon:"interactive", text:"Turn static information into active learning with clickable objects, hotspots, tabs, markers and reveal-on-click content that encourages exploration.", tags:["Hotspots","Explore-and-reveal"] },
  { n:"03", title:"Branching Scenarios & Decision Paths", icon:"branch", text:"Create scenario-driven learning where learner choices lead to different scenes, consequences and feedback using Storyline triggers and variables.", tags:["Decision paths","Scenario practice"] },
  { n:"04", title:"Quizzes, Variables & Feedback", icon:"assessment", text:"Develop knowledge checks with question types, score logic, tailored feedback and variables that respond to learner actions and answers.", tags:["Quiz logic","Custom feedback"] },
  { n:"05", title:"Software Simulations & Guided Practice", icon:"simulation", text:"Recreate interface workflows with step-by-step guidance, click-based practice and realistic interactions to help learners rehearse a process.", tags:["Guided steps","Workflow practice"] },
  { n:"06", title:"Responsive Publishing & LMS Packages", icon:"lms", text:"Publish and validate courses for supported desktop and mobile viewing, and prepare LMS packages such as SCORM or xAPI when required by the platform.", tags:["Responsive player","SCORM / xAPI"] }
];

const storylineSteps = [
  { n:"01", title:"Plan the Learning Flow", label:"OBJECTIVES & AUDIENCE", icon:"⌕", text:"Define the learner, outcomes, source content and delivery requirements before mapping the course structure and key decisions." },
  { n:"02", title:"Storyboard the Slides", label:"SCREEN DESIGN", icon:"▤", text:"Plan slide layouts, narration, visual hierarchy, on-screen text and interactions so each screen supports a specific learning objective." },
  { n:"03", title:"Author Triggerss", label:"TRIGGERS & STATES", icon:"◇", text:"Build layers, triggers, states, variables, branching paths and feedback in Articulate Storyline to make the course respond to learner actions." },
  { n:"04", title:"Test & Publish", label:"QUALITY & DELIVERY", icon:"✓", text:"Check navigation, question logic, accessibility basics, player behaviour, device layouts and LMS tracking before publishing the requested package." }
];

const storylineBenefits = [
  { n:"01", title:"Make Learners Active", text:"Clickable objects, decision points and guided activities invite learners to explore instead of only moving through static slides." },
  { n:"02", title:"Show Consequences Through Branching", text:"Scenario choices can lead to different feedback and outcomes, helping learners practise decisions in a controlled environment." },
  { n:"03", title:"Control Course Logic", text:"Triggers, states and variables support tailored navigation, reveal interactions, progress conditions and quiz responses." },
  { n:"04", title:"Prepare for Learning Platforms", text:"With the right publishing settings, Storyline courses can be packaged for compatible LMS platforms and tracking standards." }
];

const storylineFaqs = [
  { q:"What is Articulate Storyline used for?", a:"Articulate Storyline is an e-learning authoring tool used to create slide-based digital courses with interactive elements, quizzes, branching scenarios, feedback and course navigation." },
  { q:"What are triggers, states and layers?", a:"Triggers define actions that happen when an event occurs; states change an object's appearance or condition; and layers let you show additional content over a slide without leaving it." },
  { q:"Can Storyline courses include branching scenarios?", a:"Yes. Learner choices can be connected to different slides, layers, variables and feedback so the experience responds to decisions made during the course." },
  { q:"Can quizzes and assessments be customised?", a:"Storyline supports question slides and custom interactions. Course logic can be configured to provide feedback, track scores and guide learners based on their responses." },
  { q:"Can Storyline courses work on mobile devices?", a:"Published courses can use Storyline's responsive player behaviour, but layouts, text, interactions and media should still be tested on the target devices and browsers." },
  { q:"Can a Storyline course be uploaded to an LMS?", a:"A course can be published for a compatible LMS using the format and tracking options that the platform supports, such as SCORM or xAPI. Confirm the LMS requirements before publishing." }
];

function StorylineIcon({ type }) {
  return <div className={`artstory-icon artstory-icon--${type}`} aria-hidden="true">
    {type === "course" && <><i className="as-course-sheet"/><i className="as-course-line as-course-line--one"/><i className="as-course-line as-course-line--two"/><i className="as-course-play"/></>}
    {type === "interactive" && <><i className="as-interactive-panel"/><i className="as-interactive-node as-interactive-node--one"/><i className="as-interactive-node as-interactive-node--two"/><i className="as-interactive-path"/><i className="as-interactive-cursor"/></>}
    {type === "branch" && <><i className="as-branch-node as-branch-node--top"/><i className="as-branch-node as-branch-node--left"/><i className="as-branch-node as-branch-node--right"/><i className="as-branch-line as-branch-line--left"/><i className="as-branch-line as-branch-line--right"/></>}
    {type === "simulation" && <><i className="as-sim-window"/><i className="as-sim-bar"/><i className="as-sim-button as-sim-button--one"/><i className="as-sim-button as-sim-button--two"/><i className="as-sim-pointer"/></>}
    {type === "assessment" && <><i className="as-assessment-card"/><i className="as-assessment-line as-assessment-line--one"/><i className="as-assessment-line as-assessment-line--two"/><i className="as-assessment-tick"/></>}
    {type === "lms" && <><i className="as-lms-screen"/><i className="as-lms-sidebar"/><i className="as-lms-tile as-lms-tile--one"/><i className="as-lms-tile as-lms-tile--two"/><i className="as-lms-tile as-lms-tile--three"/></>}
  </div>;
}

function Reveal({ children, className = "", direction = "up", delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("artstory-is-visible");
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      node.classList.toggle("artstory-is-visible", entry.isIntersecting);
    }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`artstory-reveal artstory-reveal--${direction} ${className}`} style={{ "--artstory-reveal-delay": `${delay}ms` }}>{children}</div>;
}

export default function ArticulateStoryline() {
  const [activeFaq, setActiveFaq] = useState(null);
  return <main className="artstory-page">
    <section className="artstory-hero">
      <div className="artstory-hero-inner">
        <Reveal direction="left" className="artstory-hero-content">
          <span className="artstory-eyebrow">ARTICULATE STORYLINE / AUTHORING STUDIO</span>
          <h1>Interactive courses. <span>Built with Storyline.</span></h1>
          <p>We design Articulate Storyline experiences with purposeful slides, interactive layers, triggers, variables, branching scenarios and assessments—turning learning content into a course learners can actively explore.</p>
          <div className="artstory-hero-meta"><span>Slide Design</span><i/><span>Triggers</span><i/><span>Variables</span><i/><span>Publishing</span></div>
          <div className="artstory-hero-note"><span className="artstory-note-mark" aria-hidden="true">✳</span><p><strong>Every interaction has a purpose.</strong><span>Thoughtful slides. Responsive logic. Meaningful practice.</span></p></div>
        </Reveal>
        <Reveal direction="right" delay={120} className="artstory-hero-visual">
          <div className="artstory-learning-stage">
            <div className="artstory-stage-top"><div className="artstory-window-dots"><i/><i/><i/></div><span className="artstory-stage-label">STORYLINE WORKSPACE / PROJECT 01</span><span className="artstory-stage-status"><i/> AUTHORING PREVIEW</span></div>
            <div className="artstory-course-layout">
              <aside className="artstory-course-sidebar" aria-label="Course navigation preview">
                <div className="artstory-course-brand">L<span>.</span></div>
                <div className="artstory-sidebar-item artstory-sidebar-item--active"><b>▦</b><small>Slides</small></div>
                <div className="artstory-sidebar-item"><b>◷</b><small>Layers</small></div>
                <div className="artstory-sidebar-item"><b>✓</b><small>Triggers</small></div>
                <div className="artstory-sidebar-item"><b>⚙</b><small>States</small></div>
              </aside>
              <div className="artstory-course-main">
                <div className="artstory-course-heading"><div><span className="artstory-mini-label">PROJECT / SLIDE DESIGN</span><h2>Workplace Safety / Module 01</h2><p>Slide authoring preview</p></div><div className="artstory-learner-avatar">S</div></div>
                <div className="artstory-progress-card"><div className="artstory-progress-top"><div><span className="artstory-mini-label">CURRENT SLIDE</span><h3>Safety at work</h3></div><span className="artstory-progress-percent">06</span></div><div className="artstory-progress-track"><span/></div><div className="artstory-progress-foot"><span>4 layers · 6 triggers</span><span>Slide 04 / 12</span></div></div>
                <div className="artstory-module-heading"><h3>Slide layers & timeline</h3><span>EDIT SLIDE <b>↗</b></span></div>
                <div className="artstory-lesson-list">
                  <div className="artstory-lesson-row"><span className="artstory-lesson-icon artstory-lesson-icon--done">✓</span><div><strong>01. Base layer</strong><small>Default slide content</small></div><span className="artstory-lesson-state">DONE</span></div>
                  <div className="artstory-lesson-row artstory-lesson-row--current"><span className="artstory-lesson-icon">▶</span><div><strong>02. Scenario layer</strong><small>Shown on learner choice</small></div><span className="artstory-lesson-state artstory-lesson-state--current">NOW</span></div>
                  <div className="artstory-lesson-row"><span className="artstory-lesson-icon">?</span><div><strong>03. Feedback layer</strong><small>Trigger: Submit answer</small></div><span className="artstory-lesson-state">NEXT</span></div>
                </div>
              </div>
            </div>
            <div className="artstory-floating-card artstory-floating-card--top"><span className="artstory-floating-symbol">✓</span><span><small>TRIGGER LOGIC</small><strong>Show feedback layer</strong></span></div>
            <div className="artstory-floating-card artstory-floating-card--bottom"><span className="artstory-floating-ring">72</span><span><small>COURSE VARIABLES</small><strong>Score = 80</strong></span></div>
          </div>
          <div className="artstory-stage-caption"><span>STORYBOARD</span><i/><span>INTERACT</span><i/><span>TEST</span><i/><span>PUBLISH</span></div>
        </Reveal>
      </div>
    </section>

    <section className="artstory-section artstory-services" id="artstory-services">
      <div className="artstory-container">
        <Reveal><div className="artstory-section-heading"><span>ARTICULATE STORYLINE SERVICES</span><h2>From slide layouts to <strong>interactive logic.</strong></h2><p>We combine visual design with Storyline features—layers, triggers, states, variables and branching—to create structured courses with clear learning goals.</p></div></Reveal>
        <div className="artstory-services-list">{storylineServices.map((item, index) => <Reveal key={item.n} direction={index % 2 ? "right" : "left"} delay={index * 65} className="artstory-service-wrap"><article className="artstory-service-card"><span className="artstory-service-number">{item.n}</span><StorylineIcon type={item.icon}/><div className="artstory-service-content"><h3>{item.title}</h3><p>{item.text}</p><div className="artstory-service-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><span className="artstory-service-arrow" aria-hidden="true">↗</span></article></Reveal>)}</div>
      </div>
    </section>

    <section className="artstory-section artstory-process"><div className="artstory-container">
      <Reveal direction="left"><div className="artstory-process-intro"><span>THE STORYLINE WORKFLOW</span><h2>From storyboard to <strong>interactive course.</strong></h2><p>A structured authoring workflow keeps slide design, interaction logic, assessment and publishing aligned from start to finish.</p></div></Reveal>
      <div className="artstory-process-line">{storylineSteps.map((step, index) => <Reveal key={step.n} direction={index % 2 ? "left" : "right"} delay={index * 75} className="artstory-process-item"><div className="artstory-process-marker">{step.n}</div><article className="artstory-process-copy"><div className="artstory-process-topline"><span>{step.label}</span><b aria-hidden="true">{step.icon}</b></div><h3>{step.title}</h3><p>{step.text}</p></article></Reveal>)}</div>
    </div></section>

    <section className="artstory-section artstory-benefits"><div className="artstory-container">
      <Reveal direction="right"><div className="artstory-section-heading artstory-section-heading--right"><span>WHY ARTICULATE STORYLINE</span><h2>Designed for <strong>active participation.</strong></h2><p>Storyline helps combine visual storytelling with learner choices, responsive feedback and controlled course logic in one authoring workflow.</p></div></Reveal>
      <div className="artstory-benefit-list">{storylineBenefits.map((item, index) => <Reveal key={item.n} direction={index % 2 ? "right" : "left"} delay={index * 70}><article className="artstory-benefit"><span>{item.n}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><i aria-hidden="true"/></article></Reveal>)}</div>
    </div></section>

    <section className="artstory-section artstory-faq"><div className="artstory-container">
      <Reveal><div className="artstory-section-heading"><span>STORYLINE KNOW-HOW</span><h2>Better courses start with <strong>clear logic.</strong></h2><p>Answers to common questions about Storyline interactions, course logic and publishing.</p></div></Reveal>
      <div className="artstory-faq-list">{storylineFaqs.map((faq, index) => { const active = activeFaq === index; const answerId = `artstory-faq-answer-${index}`; return <Reveal key={faq.q} direction={index % 2 ? "right" : "left"} delay={index * 45}><div className={`artstory-faq-item ${active ? "artstory-faq-item--active" : ""}`}><button type="button" className="artstory-faq-question" onClick={() => setActiveFaq(current => current === index ? null : index)} aria-expanded={active} aria-controls={answerId}><span><small>0{index + 1}</small>{faq.q}</span><b aria-hidden="true">{active ? "−" : "+"}</b></button><div className="artstory-faq-answer" id={answerId} hidden={!active}><p>{faq.a}</p></div></div></Reveal>; })}</div>
    </div></section>

    <section className="artstory-final"><Reveal className="artstory-final-inner"><span>THE AUTHORING OUTCOME</span><h2>Make slides interactive. <strong>Make choices matter.</strong></h2><p>A well-built Storyline course combines clear screens with purposeful triggers, feedback and decision paths—so learners can practise, respond and apply what they learn.</p><div className="artstory-final-line" aria-hidden="true"><i/><i/><i/><i/><i/></div></Reveal></section>
  </main>;
}
