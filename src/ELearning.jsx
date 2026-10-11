import React, { useEffect, useRef, useState } from "react";
import "./ELearning.css";

const services = [
  { n:"01", title:"Custom E-Learning Courses", icon:"course", text:"Turn subject matter into clear digital lessons with learning objectives, examples, guided explanations and a structured course path.", tags:["Course structure","Learning objectives"] },
  { n:"02", title:"Interactive Learning Modules", icon:"interactive", text:"Use scenario choices, clickable activities, drag-and-drop tasks and guided feedback to help learners practise concepts.", tags:["Scenario-based","Knowledge checks"] },
  { n:"03", title:"Corporate Training", icon:"training", text:"Build consistent online training for onboarding, compliance, product knowledge, workplace procedures and employee development.", tags:["Onboarding","Compliance"] },
  { n:"04", title:"Microlearning Experiences", icon:"micro", text:"Break topics into focused, bite-sized lessons that learners can complete, revisit and apply within busy schedules.", tags:["Short lessons","Quick revision"] },
  { n:"05", title:"Assessment & Knowledge Checks", icon:"assessment", text:"Reinforce key concepts with quizzes, branching questions, response feedback and assessments that identify learning gaps.", tags:["Quizzes","Feedback"] },
  { n:"06", title:"LMS-Ready Course Publishing", icon:"lms", text:"Prepare course content for a compatible learning platform, considering navigation, reporting and supported tracking standards.", tags:["LMS delivery","SCORM / xAPI when required"] }
];

const steps = [
  { n:"01", title:"Discover & Plan", label:"LEARNING STRATEGY", icon:"⌕", text:"Identify the audience, learning goals, source material and delivery requirements, then organise the content into a practical learning path." },
  { n:"02", title:"Structure & Storyboard", label:"CONTENT DESIGN", icon:"▤", text:"Map lessons, examples, interactions and assessments before production so every screen supports a clear learning objective." },
  { n:"03", title:"Build & Interact", label:"COURSE DEVELOPMENT", icon:"◇", text:"Create consistent screens, readable content, purposeful activities and feedback that guides learners through each lesson." },
  { n:"04", title:"Test & Deliver", label:"QUALITY CHECK", icon:"✓", text:"Review navigation, answer logic, responsive layouts, accessibility basics and the requested publishing format before handoff." }
];

const benefits = [
  { n:"01", title:"Learn at a Flexible Pace", text:"Learners can follow structured lessons at a suitable time and revisit important information when needed." },
  { n:"02", title:"Turn Content into Practice", text:"Scenarios and interactive questions give learners opportunities to apply information and receive useful feedback." },
  { n:"03", title:"Keep Training Consistent", text:"A shared course structure helps communicate the same core information across teams, locations and learner groups." },
  { n:"04", title:"Review Learning Progress", text:"When supported by the selected platform, assessments and reporting can help teams understand course progress." }
];

const faqs = [
  { q:"What is E-Learning Development?", a:"It is the process of turning learning material into a structured digital course. It may include instructional design, screen layouts, interactive activities, assessments, feedback and publishing for an online learning platform." },
  { q:"What types of training can be developed?", a:"Courses can support employee onboarding, compliance, product and process training, software guidance, safety awareness, academic topics, customer education and professional development." },
  { q:"Can the course include interactive activities?", a:"Yes. Depending on the learning goals and authoring tools, a course may include quizzes, clickable hotspots, branching scenarios, drag-and-drop tasks, simulations and feedback after learner responses." },
  { q:"Can courses work on mobile devices?", a:"Layouts and interactions can be designed and tested for supported desktop, tablet and mobile screens. Compatibility should be checked against target devices, browsers and the delivery platform." },
  { q:"Can courses be uploaded to an LMS?", a:"Courses can be prepared for a compatible Learning Management System. Confirm the required package and tracking format, such as SCORM or xAPI, against the LMS requirements before development." },
  { q:"How is course quality checked?", a:"Quality checks can cover content accuracy, learning flow, navigation, quiz logic, feedback, keyboard access, responsive layouts, media playback and LMS tracking where applicable." }
];

function LearningIcon({ type }) {
  return <div className={`elearn-icon elearn-icon--${type}`} aria-hidden="true">
    {type === "course" && <><i className="el-course-sheet"/><i className="el-course-line el-course-line--one"/><i className="el-course-line el-course-line--two"/><i className="el-course-play"/></>}
    {type === "interactive" && <><i className="el-interactive-panel"/><i className="el-interactive-node el-interactive-node--one"/><i className="el-interactive-node el-interactive-node--two"/><i className="el-interactive-path"/><i className="el-interactive-cursor"/></>}
    {type === "training" && <><i className="el-training-board"/><i className="el-training-person el-training-person--one"/><i className="el-training-person el-training-person--two"/></>}
    {type === "micro" && <><i className="el-micro-ring"/><i className="el-micro-core"/><i className="el-micro-spark el-micro-spark--one"/><i className="el-micro-spark el-micro-spark--two"/></>}
    {type === "assessment" && <><i className="el-assessment-card"/><i className="el-assessment-line el-assessment-line--one"/><i className="el-assessment-line el-assessment-line--two"/><i className="el-assessment-tick"/></>}
    {type === "lms" && <><i className="el-lms-screen"/><i className="el-lms-sidebar"/><i className="el-lms-tile el-lms-tile--one"/><i className="el-lms-tile el-lms-tile--two"/><i className="el-lms-tile el-lms-tile--three"/></>}
  </div>;
}

function Reveal({ children, className = "", direction = "up", delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("elearn-is-visible");
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      node.classList.toggle("elearn-is-visible", entry.isIntersecting);
    }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`elearn-reveal elearn-reveal--${direction} ${className}`} style={{ "--elearn-reveal-delay": `${delay}ms` }}>{children}</div>;
}

export default function ELearning() {
  const [activeFaq, setActiveFaq] = useState(null);
  return <main className="elearn-page">
    <section className="elearn-hero">
      <div className="elearn-hero-inner">
        <Reveal direction="left" className="elearn-hero-content">
          <span className="elearn-eyebrow">DIGITAL LEARNING STUDIO</span>
          <h1>Learning that <span>moves you forward.</span></h1>
          <p>We transform knowledge into structured, engaging digital learning experiences. From clear lesson flows to meaningful interactions and assessments, every course is designed to help learners understand, practise and retain what matters.</p>
          <div className="elearn-hero-meta"><span>Instructional Design</span><i/><span>Interaction</span><i/><span>Assessment</span><i/><span>Delivery</span></div>
          <div className="elearn-hero-note"><span className="elearn-note-mark" aria-hidden="true">✳</span><p><strong>Every lesson has a learning purpose.</strong><span>Clear goals. Useful practice. Measurable understanding.</span></p></div>
        </Reveal>
        <Reveal direction="right" delay={120} className="elearn-hero-visual">
          <div className="elearn-learning-stage">
            <div className="elearn-stage-top"><div className="elearn-window-dots"><i/><i/><i/></div><span className="elearn-stage-label">LEARNING SPACE / MODULE 01</span><span className="elearn-stage-status"><i/> COURSE ACTIVE</span></div>
            <div className="elearn-course-layout">
              <aside className="elearn-course-sidebar" aria-label="Course navigation preview">
                <div className="elearn-course-brand">L<span>.</span></div>
                <div className="elearn-sidebar-item elearn-sidebar-item--active"><b>▦</b><small>Learn</small></div>
                <div className="elearn-sidebar-item"><b>◷</b><small>Progress</small></div>
                <div className="elearn-sidebar-item"><b>✓</b><small>Results</small></div>
                <div className="elearn-sidebar-item"><b>⚙</b><small>Settings</small></div>
              </aside>
              <div className="elearn-course-main">
                <div className="elearn-course-heading"><div><span className="elearn-mini-label">YOUR LEARNING PATH</span><h2>Welcome back, learner.</h2><p>Small steps. Stronger understanding.</p></div><div className="elearn-learner-avatar">L</div></div>
                <div className="elearn-progress-card"><div className="elearn-progress-top"><div><span className="elearn-mini-label">CURRENT MODULE</span><h3>Data protection essentials</h3></div><span className="elearn-progress-percent">72%</span></div><div className="elearn-progress-track"><span/></div><div className="elearn-progress-foot"><span>4 of 6 lessons completed</span><span>12 min left</span></div></div>
                <div className="elearn-module-heading"><h3>Continue learning</h3><span>VIEW PATH <b>↗</b></span></div>
                <div className="elearn-lesson-list">
                  <div className="elearn-lesson-row"><span className="elearn-lesson-icon elearn-lesson-icon--done">✓</span><div><strong>01. The essentials</strong><small>Lesson complete</small></div><span className="elearn-lesson-state">DONE</span></div>
                  <div className="elearn-lesson-row elearn-lesson-row--current"><span className="elearn-lesson-icon">▶</span><div><strong>02. Spot the risk</strong><small>Interactive scenario</small></div><span className="elearn-lesson-state elearn-lesson-state--current">NOW</span></div>
                  <div className="elearn-lesson-row"><span className="elearn-lesson-icon">?</span><div><strong>03. Quick knowledge check</strong><small>5 questions</small></div><span className="elearn-lesson-state">NEXT</span></div>
                </div>
              </div>
            </div>
            <div className="elearn-floating-card elearn-floating-card--top"><span className="elearn-floating-symbol">✓</span><span><small>KNOWLEDGE CHECK</small><strong>Answer feedback ready</strong></span></div>
            <div className="elearn-floating-card elearn-floating-card--bottom"><span className="elearn-floating-ring">72</span><span><small>LEARNING PROGRESS</small><strong>Keep going</strong></span></div>
          </div>
          <div className="elearn-stage-caption"><span>PLAN</span><i/><span>ENGAGE</span><i/><span>PRACTISE</span><i/><span>REVIEW</span></div>
        </Reveal>
      </div>
    </section>

    <section className="elearn-section elearn-services" id="elearn-services">
      <div className="elearn-container">
        <Reveal><div className="elearn-section-heading"><span>WHAT WE DEVELOP</span><h2>Learning content built for <strong>real understanding.</strong></h2><p>Every learning experience starts with a clear objective. We shape the content, structure and interactions around what learners need to know and do.</p></div></Reveal>
        <div className="elearn-services-list">{services.map((item, index) => <Reveal key={item.n} direction={index % 2 ? "right" : "left"} delay={index * 65} className="elearn-service-wrap"><article className="elearn-service-card"><span className="elearn-service-number">{item.n}</span><LearningIcon type={item.icon}/><div className="elearn-service-content"><h3>{item.title}</h3><p>{item.text}</p><div className="elearn-service-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><span className="elearn-service-arrow" aria-hidden="true">↗</span></article></Reveal>)}</div>
      </div>
    </section>

    <section className="elearn-section elearn-process"><div className="elearn-container">
      <Reveal direction="left"><div className="elearn-process-intro"><span>HOW WE BUILD IT</span><h2>From raw content to a <strong>learning journey.</strong></h2><p>A clear development process keeps the course focused, consistent and ready for the intended learning environment.</p></div></Reveal>
      <div className="elearn-process-line">{steps.map((step, index) => <Reveal key={step.n} direction={index % 2 ? "left" : "right"} delay={index * 75} className="elearn-process-item"><div className="elearn-process-marker">{step.n}</div><article className="elearn-process-copy"><div className="elearn-process-topline"><span>{step.label}</span><b aria-hidden="true">{step.icon}</b></div><h3>{step.title}</h3><p>{step.text}</p></article></Reveal>)}</div>
    </div></section>

    <section className="elearn-section elearn-benefits"><div className="elearn-container">
      <Reveal direction="right"><div className="elearn-section-heading"><span>WHY E-LEARNING</span><h2>Designed around <strong>how people learn.</strong></h2><p>Well-structured digital training makes information easier to navigate, practise and revisit—while keeping the learner's objective at the centre.</p></div></Reveal>
      <div className="elearn-benefit-list">{benefits.map((item, index) => <Reveal key={item.n} direction={index % 2 ? "right" : "left"} delay={index * 70}><article className="elearn-benefit"><span>{item.n}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><i aria-hidden="true"/></article></Reveal>)}</div>
    </div></section>

    <section className="elearn-section elearn-faq"><div className="elearn-container">
      <Reveal><div className="elearn-section-heading"><span>COMMON QUESTIONS</span><h2>Good learning starts with <strong>clear answers.</strong></h2><p>Useful details about planning, developing and delivering digital courses.</p></div></Reveal>
      <div className="elearn-faq-list">{faqs.map((faq, index) => { const active = activeFaq === index; const answerId = `elearn-faq-answer-${index}`; return <Reveal key={faq.q} direction={index % 2 ? "right" : "left"} delay={index * 45}><div className={`elearn-faq-item ${active ? "elearn-faq-item--active" : ""}`}><button type="button" className="elearn-faq-question" onClick={() => setActiveFaq(current => current === index ? null : index)} aria-expanded={active} aria-controls={answerId}><span><small>0{index + 1}</small>{faq.q}</span><b aria-hidden="true">{active ? "−" : "+"}</b></button><div className="elearn-faq-answer" id={answerId} hidden={!active}><p>{faq.a}</p></div></div></Reveal>; })}</div>
    </div></section>

    <section className="elearn-final"><Reveal className="elearn-final-inner"><span>THE LEARNING OUTCOME</span><h2>Make knowledge useful. <strong>Make learning last.</strong></h2><p>A thoughtful digital course does more than present information. It helps people understand the idea, practise the skill and carry the learning into real situations.</p><div className="elearn-final-line" aria-hidden="true"><i/><i/><i/><i/><i/></div></Reveal></section>
  </main>;
}
