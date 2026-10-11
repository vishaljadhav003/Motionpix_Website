import React from "react";

const WhatsAppButton = () => {
  const phoneNumber = "919822055205"; // India country code (+91) combined
  const message = encodeURIComponent("Hello! I want to inquire about MotionPix services.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_self" /* Same page/tab madhe open karnyasaathi */
      rel="noopener noreferrer"
      className="whatsapp-float-btn"
      aria-label="Contact us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      {/* Pulse Ripple Effect Layers */}
      <span className="whatsapp-pulse"></span>
      <span className="whatsapp-pulse-secondary"></span>
      
      {/* Official WhatsApp SVG Icon */}
      <svg
        className="whatsapp-icon"
        viewBox="0 0 32 32"
        width="28"
        height="28"
        fill="currentColor"
      >
        <path d="M16 2a13 13 0 0 0-11.3 19.4L3 29l7.8-2A13 13 0 1 0 16 2zm0 24a11 11 0 0 1-5.6-1.5l-.4-.2-4.2 1.1 1.1-4.1-.3-.4A11 11 0 1 1 16 26zm6-8.2c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a9 9 0 0 1-2.6-1.6 9.9 9.9 0 0 1-1.8-2.3c-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6s0-.4 0-.5l-1-2.4c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.2-1.2 2.9 1.2 3.4 1.4 3.6 2.4 3.7 5.8 5.1c.8.3 1.4.5 1.9.7 1 .3 1.8.3 2.5.2.8-.1 2.4-1 2.7-1.9s.3-1.7.2-1.9c-.1-.1-.4-.2-.7-.4z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;