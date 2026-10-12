import { NavLink } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./Home.css";
import "./WhatWeDo.css";
import "./NewsCard.css";
import "./FaqCards.css";
import "./Testimonials.css";
import "./Courses.css";
import IntroSection from "./IntroSection";
import { Helmet } from "react-helmet-async";
import useSiteContent from "./hooks/useSiteContent";
import WhyWeWorkWith from "./WhyWeWorkWith";
import WhoWeWorkWith from "./WhoWeWorkWith";
import VisitorCounter from "./VisitorCounter";



const testimonials = [
  {
    quote:
      "With the same marketing team, we secured significantly more business using branding animations and process visualizations created by Motionpix.",
    name: "Marketing Head",
    company: "Global Manufacturing Company",
    logo: "https://www.motionpixindia.com/clients/Asset1.png",
  },
  {
    quote:
      "Motionpix helped us explain complex industrial workflows clearly. Their 3D walkthroughs improved engagement across sales and training.",
    name: "Product Manager",
    company: "Industrial Automation Firm",
    logo: "https://www.motionpixindia.com/clients/Asset2.png",
  },
  {
    quote:
      "From product explainers to industrial walkthroughs, Motionpix delivered visuals that enhanced our brand credibility and conversions.",
    name: "Business Development Lead",
    company: "Engineering Solutions Provider",
    logo: "https://www.motionpixindia.com/clients/Asset3.png",
  },
];
const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
};

const Home = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Video State & Reference Controls
  const videoRef = useRef(null);
  const heroRef = useRef(null);

  const [heroTheme, setHeroTheme] = useState(() => {
  if (typeof document === "undefined") return "dark";

  const themeElements = [
    document.documentElement,
    document.body,
    document.getElementById("root"),
  ];

  return themeElements.some(
    (element) => element?.getAttribute("data-theme") === "light"
  )
    ? "light"
    : "dark";
});
  // const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  const [testimonialsRef, testimonialsVisible] = useScrollReveal();

  const content = useSiteContent("home", {
    hero_subtitle: "Motionpix Cinematix India Private Limited",
    hero_tagline: "Your Digital Branding Partner",
    hero_description:
      "We craft next-gen 3D industrial visuals, cinematic experiences, and AR/VR content.",
  });

  // const toggleVideoPlay = () => {
  //   if (videoRef.current) {
  //     if (isVideoPlaying) {
  //       videoRef.current.pause();
  //     } else {
  //       videoRef.current.play();
  //     }
  //     setIsVideoPlaying(!isVideoPlaying);
  //   }
  // };

  useEffect(() => {
    // Initial reveal state handler
    const timer = setTimeout(() => {
      setIsHeroVisible(true);
    }, 100);

    // Scroll reveal/intersection check — bidirectional: flips both ways so
    // the hero replays its reveal if you scroll away and come back to it.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [isPaused]);



  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  
/* Detect light/dark theme changes */
useEffect(() => {
  const getCurrentTheme = () => {
    let element = heroRef.current;

    // Check the hero's closest theme container.
    while (element) {
      const theme = element.getAttribute("data-theme");

      if (theme === "light" || theme === "dark") {
        return theme;
      }

      element = element.parentElement;
    }

    const themeElements = [
      document.documentElement,
      document.body,
      document.getElementById("root"),
    ];

    return themeElements.some(
      (item) => item?.getAttribute("data-theme") === "light"
    )
      ? "light"
      : "dark";
  };

  const updateTheme = () => {
    const nextTheme = getCurrentTheme();

    setHeroTheme((currentTheme) =>
      currentTheme === nextTheme ? currentTheme : nextTheme
    );
  };

  updateTheme();

  const observer = new MutationObserver(updateTheme);

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
    subtree: true,
  });

  return () => observer.disconnect();
}, []);

/* Reload and play the selected theme's video */
useEffect(() => {
  const video = videoRef.current;

  if (!video) return;

  video.load();

  const playPromise = video.play();

  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {
      // Browser autoplay restrictions may prevent automatic playback.
      // Native video controls remain available.
    });
  }
}, [heroTheme]);


  return (
    <>
      <Helmet>
        <title>Motionpix India | 3D Animation, Industrial Visualization & Branding</title>
        <meta name="description" content="Motionpix India provides 2D/3D animation, AR/VR, industrial visualization, Website Design and digital branding solutions for global industries." />
        <meta name="keywords" content="2D/3D animation company India, Pune, industrial animation, AR-VR company, Website Design, branding agency India" />
        <link rel="canonical" href="https://www.motionpixindia.com/" />
        <meta property="og:title" content="Motionpix Cinematix India" />
        <meta property="og:description" content="Motionpix India provides 2D/3D animation, AR/VR, industrial visualization, Website Design and digital branding solutions for global industries." />
        <meta property="og:url" content="https://www.motionpixindia.com/" />
        <meta property="og:image" content="https://www.motionpixindia.com/Logo.png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Motionpix India" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Motionpix Cinematix India" />
        <meta name="twitter:description" content="Motionpix India provides 2D/3D animation, AR/VR, industrial visualization, Website Design and digital branding solutions for global industries." />
        <meta name="twitter:image" content="https://www.motionpixindia.com/Logo.png" />
      </Helmet>
        
      {/* Universal Cinematic Hero Section for Mobile, Desktop, and All Screen Dimensions */}

{/* Universal Cinematic Hero Section */}

{/* Universal Cinematic Hero Section */}

{/* Universal Cinematic Hero Section */}

<section
  ref={heroRef}
  className={`hero-section ${
    isHeroVisible ? "hero-reveal-active" : ""
  }`}
>
  <video
    ref={videoRef}
    className="hero-video-bg"
    autoPlay
    muted
    loop
    playsInline
    controls={heroTheme !== "light"}
    preload="auto"
    aria-label="MotionPix Cinematix hero video"
  >
    <source
      src={
        heroTheme === "light"
          ? "/Manipulator.mp4"
          : "/Hero.mp4"
      }
      type="video/mp4"
    />
  </video>

  <div className="hero-overlay" aria-hidden="true" />

  {heroTheme !== "light" && (
    <>
      <VisitorCounter />

      <div className="container hero-content">
        <h1 className="fw-bold display-4 text-white">
          Motion<span>Pix</span> Cinematix
        </h1>

        <h6 className="fs-5 text-secondary">
          {content.hero_subtitle}
        </h6>

        <h6 className="fs-4 text-light mb-4">
          {content.hero_tagline}
        </h6>

        <h6 className="text-light fs-5 mt-4">
          {content.hero_description}
        </h6>
      </div>
    </>
  )}
</section>

      <IntroSection />
      {/* <LogoScrollReveal /> */}
        <WhyWeWorkWith/>
        {/* <Showreel/> */}
        <WhoWeWorkWith/>
        {/* <WhyWeWorkWith/> */}
     {/* <section className="news-section py-5">
  <div className="container py-md-4">
    <div className="text-center mb-5">
      <h2 className="fw-bold display-6 news-title">
        Industry <span>Insights News</span>
      </h2>
      <p className="news-subtitle mt-2">
        Trends, technologies, and transformations shaping modern industries
      </p>
    </div>

    <div className="row g-4">
      {[
        {
          title: "Transportation Industry",
          desc: "Visualizing smart mobility, mass transit, and future transport systems.",
          media:
            "https://mechatrix.com/wp-content/uploads/2018/06/shutterstock_189644957_024901490_2370.jpg",
        },
        {
          title: "Technology Revolution",
          desc: "How Industry 4.0, AI, and XR are redefining operations.",
          media:
            "https://mechatrix.com/wp-content/uploads/2018/08/shutterstock_190417499_024901490_2345.jpg",
        },
        {
          title: "Renewable Energy & Sustainability",
          desc: "Explaining clean energy systems through powerful visuals.",
          media:
            "https://mechatrix.com/wp-content/uploads/2018/08/gray_51437565_024901490_2513.jpg",
        },
        {
          title: "Mega Trends Shaping Industries",
          desc: "EVs, automation, digital twins, and immersive learning.",
          media:
            "https://mechatrix.com/wp-content/uploads/2018/08/gray_190753244_024901490_2528.jpg",
        },
      ].map((item) => (
        <NewsCardItem key={item.title} item={item} />
      ))}
    </div>

    <div className="text-center mt-5">
      <NavLink to="/data/news" className="btn btn-news-action fw-bold">
        <span>Read More Insights</span>
        <span className="fs-5">&rarr;</span>
      </NavLink>
    </div>
  </div>
</section> */}

     <section className="testimonials-section">
  <div className="container">
    <div className="text-center mb-5">
      <h2 className="fw-bold">
        What Our Valued <span>Clients Say</span>
      </h2>
      <p className="text-secondary mt-3">
        Our clients enhance marketing impact using Motionpix’s 2D &amp; 3D
        animation, industrial walkthroughs, and branding visuals.
      </p>
    </div>

    <div
      ref={testimonialsRef}
      className={`testimonial-wrapper reveal ${testimonialsVisible ? "reveal-active" : ""}`}
    >
      {testimonials.map((item, i) => (
        <div
          key={item.company}
          className={`testimonial-card ${i === index ? "active" : ""}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="testimonial-header">
            <img src={item.logo} alt={item.company} />
          </div>

          <p className="testimonial-quote">“{item.quote}”</p>

          <div className="testimonial-author">
            <strong>{item.name}</strong>
            <span>{item.company}</span>
          </div>
        </div>
      ))}
    </div>

    <div
      className={`testimonial-dots reveal ${testimonialsVisible ? "reveal-active" : ""}`}
    >
      {testimonials.map((_, i) => (
        <span
          key={i}
          className={`dot ${i === index ? "active" : ""}`}
          onClick={() => setIndex(i)}
        />
      ))}
    </div>
  </div>
</section>
    </>
  );
};


export default Home;
