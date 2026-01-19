import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Gradient definitions (imported from ui/gradients)
const primaryGradient = "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)";
const primaryGradientText = {
  background: primaryGradient,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};
const pinkToPurple = "bg-gradient-to-r from-pinkcustom to-purplecustom";
const particleGradient = "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)";

// Floating Particles Component
const FloatingParticles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 6,
    scale: 0.5 + Math.random() * 1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: particleGradient,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [particle.scale, particle.scale * 1.3, particle.scale],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Sponsor logos (you can replace these with actual logo URLs)
const sponsors = [
  { name: "TechCorp", logo: "/public/CompanyLogo/01.jpg" }, 
  { name: "InnovateLab", logo: "/public/CompanyLogo/01.jpg" },
  { name: "DataFlow", logo: "/public/CompanyLogo/02.jpg" },
  { name: "CloudSync", logo: "/public/CompanyLogo/01.jpg" },
  { name: "AI Solutions", logo: "/public/CompanyLogo/03.jpg" },
  { name: "FutureTech", logo: "/public/CompanyLogo/01.jpg" },
  { name: "SmartSys", logo: "/public/CompanyLogo/03.jpg" },
  { name: "NextGen", logo: "/public/CompanyLogo/02.jpg" },
];


// Infinite scrolling sponsor logos
const SponsorMarquee = () => {
  const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors];
  
  return (
    <div className="relative w-full overflow-hidden py-8 sm:py-12">
      <motion.div
        className="flex gap-8 sm:gap-12 md:gap-16"
        animate={{
          x: [0, -1600],
        }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {duplicatedSponsors.map((sponsor, index) => (
          <div
            key={index}
            className="flex-shrink-0 bg-white/80 backdrop-blur-sm px-8 sm:px-10 py-6 sm:py-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
          >
            <motion.img
              src={sponsor.logo}
              alt={sponsor.name}
              className="h-16 sm:h-20 md:h-24 w-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            /> 
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Sponsors = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* Blur overlay that fades out */}
      <motion.div
        initial={{ opacity: 1, backdropFilter: "blur(20px)" }}
        animate={isInView ? { opacity: 0, backdropFilter: "blur(0px)" } : { opacity: 1, backdropFilter: "blur(20px)" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-20 bg-white/30 pointer-events-none"
      />
      
      <div ref={sectionRef}>
        {/* Subtle dark gradient overlay at top */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />
        
        {/* Floating Particles */}
        <FloatingParticles />

        {/* Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <motion.div
            className="absolute -top-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1.3, 1, 1.3],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          {/* Sponsor Marquee at Top */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full mb-12 sm:mb-16 md:mb-20"
          >
            <SponsorMarquee />
          </motion.div>

          {/* Center Content */}
          <div className="max-w-5xl mx-auto text-center">
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-800 leading-[1.2] mb-6 sm:mb-8"
            >
              <span className="inline-block">The most&nbsp;</span>
              <span className="inline-block" style={primaryGradientText}> powerful AI systems</span>
              <br className="hidden sm:block" />
              <span className="inline-block">are built&nbsp;</span>
              <span className="inline-block" style={primaryGradientText}> in partnership</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 font-light max-w-3xl mx-auto px-4 mb-10 sm:mb-12"
            >
              Join the innovators transforming their industries with intelligent automation
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-base sm:text-lg md:text-xl font-semibold text-white rounded-full overflow-hidden group shadow-xl"
                style={{
                  background: primaryGradient,
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                  style={{ opacity: 0.2 }}
                />
                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                  Let's Partner Up
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>

            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 sm:mt-16 mx-auto w-24 sm:w-32 md:w-40 h-1 rounded-full"
              style={{
                background: primaryGradient,
              }}
            />

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mt-16 sm:mt-20 md:mt-24 max-w-4xl mx-auto">
              {[
                { number: "50+", label: "Trusted Partners" },
                { number: "95%", label: "Client Satisfaction" },
                { number: "24/7", label: "Support Available" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      background: primaryGradient,
                    }}
                  />
                  <div className="relative z-10">
                    <h3 
                      className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3"
                      style={primaryGradientText}
                    >
                      {item.number}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium">
                      {item.label}
                    </p>
                  </div>
                  
                  {/* Floating particle inside card */}
                  <motion.div
                    className="absolute top-4 right-4 w-2 h-2 rounded-full"
                    style={{
                      background: primaryGradient,
                    }}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
};

export default Sponsors;