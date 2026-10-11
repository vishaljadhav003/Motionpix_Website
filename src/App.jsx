import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import PageNotFound from "./PageNotFound";
import Contact from "./Contact";
import Footer from "./Footer";
import Career from "./Career";
import About from "./About";
import Animation2D from "./Animation2D";
import Animation3D from "./Animation3D";
import WebsiteDesign from "./WebsiteDesign";
import ELearning from "./ELearning";
import MotionGraphics from "./MotionGraphics";
import ScrollToTop from "./ScrollToTop";
import ScrollTopButton from "./ScrollTopButton";
import Cursor from "./Cursor";
import ServicesPage from "./ServicesPage";
import SearchResults from "./SearchResults";
import Home from "./Home";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import Chatbot from "./Chatbot";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";
import WhatsAppButton from "./WhatsappButton";
import PageTransition from "./PageTransition"; // NEW: reusable route transition
import Industries from "./Industries";
import ProductVisualization from "./ProductVisualization";
import EngineeringIndustrialAnimation from "./EngineeringIndustrialAnimation";
import TechnicalVisualization from "./TechnicalVisualization";
import ExplainerContent from "./ExplainerContent";
import CorporateBrandFilms from "./CorporateBrandFilms";
import ProductIndustrialFilms from "./ProductzindustrialFilms";
import PromotionalVideos from "./PromotionalVideos";
import PhotographyVideography from "./PhotographyVideography";
import EditingVFX from "./EditingVFX";
import BrandIdentity from "./BrandIdentity";
import GraphicsDesign from "./GraphicsDesign";
import UIUXDesign from "./UIUXDesign";
import LandingPages from "./LandingPages";
import MobileAppDesign from "./MobileAppDesign";
import DigitalProductExperiences from "./DigitalProductExperiences";
import ArticulateStoryline from "./ArticulateStoryline";
import InteractiveLearning from "./InteractiveLearning";
import SEO from "./SEO";
import ProductTraining from "./ProductTraining";
import EmployeeSafetyTraining from "./EmployeeSafetyTraining";
import SimulationAssessment from "./SimulationAssessment";
import ARVRMRXR from "./ARVRMRXR";
import VirtualShowrooms from "./VirtualShowrooms";
import Interactive3D from "./Interactive3D";
import ImmersiveTraining from "./ImmersiveTraining";
import ExhibitionCreative from "./ExhibitionCreative";
import Exhibition3DDesign from "./Exhibition3DDesign";
import InteractiveDisplays from "./InteractiveDisplays";
import DigitalInstallations from "./DigitalInstallations";
import EventContent from "./EventContent";
import ProductExperiences from "./ProductExperiences";
import MarketingCollaterals from "./MarketingCollaterals";
import PresentationInfographicDesign from "./PresentationInfographicDesign";
import CampaignCreatives from "./CampaignCreatives";
import AnimationVisualization from "./AnimationVisualization";
import FilmVisualContent from "./FilmVisualContent";
import BrandingCreative from "./BrandingCreative";
import WebMobileInterfaceDesign from "./WebMobileInterfaceDesign";
import LearningTraining from "./LearningTraining";
import ImmersiveTechnology from "./ImmersiveTechnology";
import ExhibitionExperiences from "./ExhibitionExperiences";

const App = () => {
  // The loader runs once on every full page load. "is-loading" is set before the
  // first render, so Home.jsx knows its hero has to wait for the loader hand-off.
  const [showIntro, setShowIntro] = useState(() => {
    document.documentElement.classList.add("is-loading");

    return true;
  });

  return (
    <ThemeProvider>
     <HelmetProvider>
    <Router>
      <SEO/>
      {showIntro && <Loader onDone={() => setShowIntro(false)} />}
      {/* <ThemeToggle /> */}
      <Navbar />
      {/* <EarthPhoneIcon/> */}
      <WhatsAppButton/>
      <SearchResults/>
      <ScrollToTop/>
      <ScrollTopButton />
      <Cursor/>
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>} />
          <Route path="/services" element={<ServicesPage/>} />


           <Route path="/services/2d-animation" element={<Animation2D />} />
          <Route path="/services/3d-animation" element={<Animation3D />} />
          <Route path="/services/web-design" element={<WebsiteDesign />} />
          <Route path="/services/ui-ux-design" element={<UIUXDesign />} />
          <Route path="/services/landing-pages" element={<LandingPages />} />
          <Route path="/services/mobile-app-design" element={<MobileAppDesign />} />
          <Route path="/services/digital-product-experiences" element={<DigitalProductExperiences />} />
          <Route path="/services/articulate-storyline" element={<ArticulateStoryline />} />
          <Route path="/services/interactive-learning" element={<InteractiveLearning/>} />
          <Route path="/services/graphicsdesign" element={<GraphicsDesign />} />
          <Route path="/services/product-training" element={<ProductTraining />} />
          <Route path="/services/employee-safety-training" element={<EmployeeSafetyTraining />} />
          <Route path="/services/simulation-assessment" element={<SimulationAssessment />} />
          <Route path="/services/e-learning" element={<ELearning />} />
          <Route path="/services/ar-vr-mr-xr" element={<ARVRMRXR/>} />
          <Route path="/services/virtual-showrooms" element={<VirtualShowrooms/>} />
          <Route path="/services/interactive-3d" element={<Interactive3D/>} />
          <Route path="/services/immersive-training" element={<ImmersiveTraining/>} />
          <Route path="/services/exhibition-creative" element={<ExhibitionCreative/>} />
          <Route path="/services/exhibition-3d-design" element={<Exhibition3DDesign/>} />
          <Route path="/services/interactive-displays" element={<InteractiveDisplays/>} />
          <Route path="/services/digital-installations" element={<DigitalInstallations/>} />
          <Route path="/services/event-content" element={<EventContent/>} />
          <Route path="/services/product-experiences" element={<ProductExperiences />} />
          <Route path="/services/marketing-collaterals" element={<MarketingCollaterals />} />
          <Route path="/services/campaign-creatives" element={<CampaignCreatives />} />
          <Route path="/services/animation-visualization" element={<AnimationVisualization />} />
          <Route path="/services/film-visual-content" element={<FilmVisualContent/>} />
          <Route path="/services/branding-creative" element={<BrandingCreative/>} />
          <Route path="/services/learning-training" element={<LearningTraining/>} />
          <Route path="/services/immersive-technology" element={<ImmersiveTechnology/>} />
          <Route path="/services/exhibition-experiences" element={<ExhibitionExperiences/>} />
          <Route path="/services/web-mobile-interface-design" element={<WebMobileInterfaceDesign/>} />
          <Route path="/services/presentation-infographic-design" element={<PresentationInfographicDesign />} />
          <Route path="/services/product-visualization" element={<ProductVisualization />} />
          <Route path="/services/explainer-content" element={<ExplainerContent />} />
          <Route path="/services/technical-visualization" element={<TechnicalVisualization />} />
          <Route path="/services/corporate-brand-films" element={<CorporateBrandFilms />} />
          <Route path="/services/product-industrial-films" element={<ProductIndustrialFilms />} />
          <Route path="/services/promotional-videos" element={<PromotionalVideos />} />
          <Route path="/services/photography-videography" element={<PhotographyVideography />} />
          <Route path="/services/editing-vfx" element={<EditingVFX />} />
          <Route path="/services/brand-identity" element={<BrandIdentity />} />
          <Route path="/services/engineering-industrial-animation" element={<EngineeringIndustrialAnimation />} />
          <Route path="/services/motiongraphics" element={<MotionGraphics />} />
          <Route path="/careers" element={<Career/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/industries" element={<Industries/>}/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </PageTransition>
      <Chatbot/>
      <Footer/>
    </Router>
    </HelmetProvider>
    </ThemeProvider>
  );
};

export default App;