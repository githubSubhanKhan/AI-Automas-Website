import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  primaryGradient,
  primaryGradientText,
  pinkToPurple,
  softCardGradient,
  particleGradient,
} from "../ui/gradients";


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

type AnimatedWordProps = {
  children: React.ReactNode;
  delay?: number;
  gradient?: boolean;
};

// Word Component with animation
const AnimatedWord: React.FC<AnimatedWordProps> = ({
  children,
  delay = 0,
  gradient = false,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={gradient ? "inline-block pb-[0.1em]" : "inline"}
      style={gradient ? primaryGradientText : {}}
    >
      {children}
    </motion.span>
  );
};

const ResultsHero = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-whitecustom via-whitecustom/95 to-gray-50 overflow-hidden"


    >
      {/* Blur overlay that fades out */}
      <motion.div
        initial={{ opacity: 1, backdropFilter: "blur(20px)" }}
        animate={isInView ? { opacity: 0, backdropFilter: "blur(0px)" } : { opacity: 1, backdropFilter: "blur(20px)" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-20 bg-black/30 pointer-events-none"
      />
      
      <div ref={sectionRef}>
        {/* Subtle dark gradient overlay at top */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />

        
        {/* Floating Particles */}
        <FloatingParticles />

        {/* Gradient Orbs - Subtle */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <motion.div
            className="absolute -top-40 -left-40 w-80 h-80 rounded-full blur-3xl"
            style={{ background: "rgba(236, 72, 153, 0.3)" }}
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
            className="absolute top-1/2 -right-40 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "rgba(139, 92, 246, 0.3)" }}
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
        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24"
        >
          <div className="max-w-7xl mx-auto text-center">
            {/* Main Heading */}
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
               font-light text-darkgray-300 leading-[1.3] mb-16 sm:mb-20 md:mb-24"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <AnimatedWord delay={0.1}>We don't sell AI. We sell </AnimatedWord>
              <AnimatedWord delay={0.2} gradient={true}>Results</AnimatedWord>
              <AnimatedWord delay={0.3}>.</AnimatedWord>
            </motion.h1>

            {/* Animated Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16 lg:gap-20 max-w-6xl mx-auto">
              {[
                { number: "$10M+", label: "Opportunities Generated with Our AI Systems" },
                { number: "75K+", label: "Professionals Upskilled in AI via our platforms" },
                { number: "60+", label: "Custom AI Solutions Developed" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                  className="group relative"
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                    className="relative"
                  >
                    {/* Number with gradient */}
                    <h2 
                      className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6"
                      style={primaryGradientText}
                  
                    >
                      {item.number}
                    </h2>
                    
                    {/* Label */}
                    <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light leading-relaxed px-2">
                      {item.label}
                    </p>
                  </motion.div>
                  
                  {/* Floating particle inside stat */}
                  <motion.div
                    className="absolute -top-2 right-4 w-2 h-2 rounded-full"
                    style={{background: particleGradient }}
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.7,
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Watch Content Link */}
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-12 sm:mt-16 md:mt-20"
            >
              <motion.a
                href="#"
                className="inline-flex items-center text-base sm:text-lg font-medium group"
                style={primaryGradientText}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Watch our content here
                <motion.span
                  className="ml-2 inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div> */}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsHero;