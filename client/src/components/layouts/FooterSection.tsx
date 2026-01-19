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
const particleGradient = "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)";

// Floating Particles Component
const FloatingParticles = () => {
  const particles = Array.from({ length: 25 }, (_, i) => ({
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

const FooterPage = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 overflow-hidden">
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
            className="absolute top-20 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"
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
            className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
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

        {/* Main Content Container */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Top Section - Closing Message */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
            <div className="max-w-5xl mx-auto text-center">
              {/* Main Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-800 leading-tight mb-6 sm:mb-8"
              >
                <span className="inline-block">Begin your </span>
                <span className="inline-block pb-[0.08em]" style={primaryGradientText}>intelligent automation</span>
                <br className="hidden sm:block" />
                <span className="inline-block">journey&nbsp; </span>
                <span className="inline-block" style={primaryGradientText}>today</span>
              </motion.h2>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 font-light max-w-3xl mx-auto px-4"
              >
                Transform possibilities into reality with AI that works for you
              </motion.p>

              {/* Decorative Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
                className="mt-10 sm:mt-12 mx-auto w-24 sm:w-32 md:w-40 h-1 rounded-full"
                style={{
                  background: primaryGradient,
                }}
              />
            </div>
          </div>

          {/* Divider with Gradient */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative px-4 sm:px-6 lg:px-8 py-8"
          >
            <div className="max-w-7xl mx-auto">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            </div>
          </motion.div>

          {/* Footer Section */}
          <footer className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-7xl mx-auto"
            >
              {/* Footer Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-12">
                {/* Company Info & Logo */}
                <div className="col-span-1 md:col-span-2 lg:col-span-1">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6"
                  >
            

                    <div className="mb-6">
                      <img
                        src="/logos/logo.png"
                        alt="Company Logo"
                        className="h-10 sm:h-16 md:h-18 w-auto object-contain opacity-90 hover:opacity-100 transition"
                      />
                    </div>

                  </motion.div>
                  <p className="text-sm sm:text-base text-gray-600 max-w-xs">
                    Empowering businesses with intelligent automation solutions
                  </p>
                </div>

                {/* Company Links */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">
                    Company
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {['About Us', 'Services', 'Results', 'Sponsers'].map((item, index) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <a
                          href="#"
                          className="text-sm sm:text-base text-gray-600 hover:text-pink-500 transition-colors duration-300 inline-block"
                        >
                          {item}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Social & Contact */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">
                    Connect
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {['LinkedIn', 'Twitter', 'GitHub', 'Email'].map((item, index) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <a
                          href="#"
                          className="text-sm sm:text-base text-gray-600 hover:text-pink-500 transition-colors duration-300 inline-block"
                        >
                          {item}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="pt-8 border-t border-gray-200"
              >
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                    © 2025 Your Company. All rights reserved.
                  </p>
                  <div className="flex gap-4 sm:gap-6">
                    <a
                      href="#"
                      className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300"
                    >
                      Privacy Policy
                    </a>
                    <a
                      href="#"
                      className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300"
                    >
                      Terms of Service
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </footer>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none" />
    </div>
  );
};

export default FooterPage;