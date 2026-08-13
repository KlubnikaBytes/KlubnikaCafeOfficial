import imgSrc from "../assets/cafe-images/hero-exterior.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ height: '100svh' }}
    >
      {/* Full Viewport Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={imgSrc}
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 38%' }}
          alt="Klubnika Cafe"
        />
      </div>

      {/* Cinematic Vignette — radial dark edges */}
      <div className="absolute inset-0 z-10" style={{
        background: 'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 100%)'
      }} />

      {/* Top & bottom gradient — blends navbar + grounds the text */}
      <div className="absolute inset-0 z-10" style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 25%, transparent 55%, rgba(0,0,0,0.9) 100%)'
      }} />

      {/* Centered Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">

        {/* Decorative top line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            height: '1px',
            width: '50px',
            background: 'rgba(255,220,150,0.7)',
            marginBottom: '20px',
          }}
        />

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontWeight: 400,
            fontSize: 'clamp(3.5rem, 11vw, 8.5rem)',
            color: '#fff',
            lineHeight: 1.1,
            textShadow: '0 4px 40px rgba(0,0,0,0.9), 0 0 80px rgba(210,160,60,0.25)',
            letterSpacing: '0.02em',
          }}
        >
          Klubnika Café
        </motion.h1>

        {/* Subtitle with flanking lines */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginTop: '16px',
          }}
        >
          <span style={{ height: '1px', width: '36px', background: 'rgba(255,220,150,0.55)', display: 'block' }} />
          <span style={{
            color: 'rgba(255,255,255,0.82)',
            fontSize: 'clamp(0.6rem, 1.4vw, 0.85rem)',
            letterSpacing: '0.5em',
            fontWeight: 300,
          }}>
            INDIA
          </span>
          <span style={{ height: '1px', width: '36px', background: 'rgba(255,220,150,0.55)', display: 'block' }} />
        </motion.div>

        {/* Explore button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          style={{ marginTop: '36px' }}
        >
          <Link
            to="/dishes"
            style={{
              border: '1px solid rgba(255,220,150,0.5)',
              color: 'rgba(255,255,255,0.9)',
              padding: '10px 32px',
              fontSize: 'clamp(0.6rem, 1.3vw, 0.78rem)',
              letterSpacing: '0.35em',
              fontWeight: 400,
              textDecoration: 'none',
              borderRadius: '2px',
              backdropFilter: 'blur(4px)',
              background: 'rgba(255,255,255,0.04)',
              display: 'inline-block',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => e.target.style.backgroundColor = 'rgba(210,160,60,0.2)'}
            onMouseLeave={e => e.target.style.backgroundColor = 'rgba(255,255,255,0.04)'}
          >
            EXPLORE MENU
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;