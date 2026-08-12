import React, { useState, useEffect } from "react";
import { CONTACT } from "../constants";
import { motion } from "framer-motion";
import Loader from "./Loader"; // Import Loader

// Animation for child elements
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Animation for the container to stagger its children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

// --- Real Google Maps URLs for Kolkata ---
const mapUrl = "https://maps.google.com/?q=C-218,+Survey+Park,+Santoshpur,+Kolkata,+West+Bengal+700075"; 
const embedSrc = "https://maps.google.com/maps?q=C-218,%20Survey%20Park,%20Santoshpur,%20Kolkata,%20West%20Bengal%20700075&t=&z=15&ie=UTF8&iwloc=&output=embed"; 

const Contact = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading time for smooth transition (optional but looks good)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <motion.div
      id="contact"
      initial="hidden"
      animate="visible"
      className="container mx-auto min-h-screen pt-32 pb-20 px-4"
    >
      {/* Section Title Animation */}
      <motion.h2
        variants={fadeInUp}
        className="mb-12 text-center text-4xl lg:text-5xl font-extrabold text-white"
      >
        Get In Touch
      </motion.h2>

      <motion.div
        variants={containerVariants}
        className="flex flex-col lg:flex-row lg:gap-10 text-neutral-400"
      >
        {/* Contact Info */}
        <div className="flex-1">
          {CONTACT.map((detail) => (
            <motion.p
              key={detail.key}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="my-10 border-b-2 border-dotted border-neutral-700 pb-8 text-center text-xl tracking-tighter lg:text-2xl"
            >
              {detail.value}
            </motion.p>
          ))}
        </div>

        {/* Map Embed */}
        <motion.div
          className="flex-1 flex items-center justify-center my-10 lg:my-0"
          variants={fadeInUp}
        >
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl overflow-hidden shadow-lg hover:ring-4 hover:ring-primary transition-all duration-300"
            title="View on Google Maps"
          >
            <iframe
              src={embedSrc}
              allowFullScreen=""
              loading="lazy"
              className="border-0 w-full h-[300px] md:w-[500px] md:h-[450px]"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kolkata Map"
            ></iframe>
          </a>
        </motion.div> 
      </motion.div>
    </motion.div>
  );
};

export default Contact;