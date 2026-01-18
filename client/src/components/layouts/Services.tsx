import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// Gradient definitions
const primaryGradient = 'linear-gradient(135deg, #e265e3 0%, #9861c5 100%)';
const primaryGradientText = {
  background: 'linear-gradient(135deg, #e265e3 0%, #9861c5 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};
const particleGradient = 'linear-gradient(135deg, #e265e3 0%, #9861c5 100%)';

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

// Scrolling Text Animation Component
const ScrollingText = () => {
  const scrollTexts = [
    "AI-Powered Transformation",
    "Strategic Innovation",
    "Business Automation",
    "Growth Acceleration",
    "Smart Solutions",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % scrollTexts.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-16 sm:h-20 md:h-24 overflow-hidden">
      {scrollTexts.map((text, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: index === currentIndex ? 0 : index < currentIndex ? -100 : 100,
            opacity: index === currentIndex ? 1 : 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h3
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
            style={primaryGradientText}
          >
            {text}
          </h3>
        </motion.div>
      ))}
    </div>
  );
};

const IdentifySection = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Individual feature sections scroll progress
  const feature1Ref = useRef(null);
  const feature2Ref = useRef(null);
  const feature3Ref = useRef(null);
  
  const feature1InView = useInView(feature1Ref, { amount: 0.5 });
  const feature2InView = useInView(feature2Ref, { amount: 0.5 });
  const feature3InView = useInView(feature3Ref, { amount: 0.5 });

  // Create particles for the circular animation
  const particleCount = 40;
  const particles = Array.from({ length: particleCount }, (_, i) => {
    const angle = (i / particleCount) * Math.PI * 2;
    return {
      id: i,
      angle,
      delay: i * 0.05,
    };
  });

  const features = [
    { 
      icon: "🎯", 
      title: "Precision Analysis",
      description: "Deep dive into your business processes to identify high-impact AI opportunities"
    },
    { 
      icon: "⚡", 
      title: "Rapid Implementation",
      description: "Fast-track deployment with proven methodologies and cutting-edge tools"
    },
    { 
      icon: "📈", 
      title: "Measurable Results",
      description: "Track ROI and business impact with comprehensive analytics and reporting"
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="relative bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden"
    >
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

        {/* Gradient Orbs - Subtle */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <motion.div
            className="absolute -top-40 -left-40 w-80 h-80 rounded-full blur-3xl"
            style={{
              background: particleGradient,
              opacity: 0.2,
            }}
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
            style={{
              background: 'linear-gradient(135deg, #9861c5 0%, #e265e3 100%)',
              opacity: 0.2,
            }}
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
        <div className="relative z-10">
          {/* Hero Section - Full Screen */}
          <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            {/* Scrolling Animated Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-8"
            >
              <ScrollingText />
            </motion.div>

            {/* Central Circle with "Identify" */}
            <div className="w-full max-w-3xl">
              <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center scale-90">
                {/* Circular Particle Ring */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {particles.map((particle) => {
                    const radius = 40;
                    const x = Math.cos(particle.angle) * radius;
                    const y = Math.sin(particle.angle) * radius;

                    return (
                      <motion.div
                        key={particle.id}
                        className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full"
                        style={{
                          left: '50%',
                          top: '50%',
                          background: particleGradient,
                        }}
                        initial={{
                          x: `${x}%`,
                          y: `${y}%`,
                          opacity: 0,
                        }}
                        animate={{
                          x: `${x}%`,
                          y: `${y}%`,
                          opacity: [0.3, 1, 0.3],
                          scale: [0.8, 1.3, 0.8],
                        }}
                        transition={{
                          opacity: {
                            duration: 3,
                            delay: particle.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          scale: {
                            duration: 3,
                            delay: particle.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          x: {
                            duration: 0.5,
                            delay: particle.delay,
                          },
                          y: {
                            duration: 0.5,
                            delay: particle.delay,
                          },
                        }}
                      />
                    );
                  })}
                </div>

                {/* Center Content */}
                <motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
  transition={{ duration: 1, delay: 0.9 }}
  className="relative z-10 text-center px-4"
>
  <motion.h1
    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-extrabold mb-6 sm:mb-8 md:mb-10"
    style={primaryGradientText}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    Identify
  </motion.h1>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
    transition={{ duration: 0.8, delay: 1.1 }}
    className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-700 font-light max-w-3xl mx-auto leading-relaxed px-2"
  >
    We pinpoint AI opportunities that will transform your business
  </motion.p>

  {/* Decorative underline */}
  <motion.div
    initial={{ scaleX: 0 }}
    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
    transition={{ duration: 1, delay: 1.3 }}
    className="mt-6 sm:mt-8 mx-auto w-24 sm:w-32 md:w-40 h-1 rounded-full"
    style={{
      background: 'linear-gradient(90deg, #e265e3 0%, #9861c5 100%)',
    }}
  />
</motion.div>

                {/* Glow effect behind text */}
                <motion.div
                  className="absolute inset-0 -z-10 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div
                    className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full blur-3xl"
                    style={{
                      background: 'radial-gradient(circle, rgba(226,101,227,0.15) 0%, rgba(152,97,197,0.1) 50%, transparent 70%)',
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Feature 1 - Full Screen */}
          <div ref={feature1Ref} className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={feature1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center max-w-2xl"
            >
              <motion.div
                animate={feature1InView ? {
                  scale: [1, 1.2, 1],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-7xl sm:text-8xl md:text-9xl mb-8"
              >
                {features[0].icon}
              </motion.div>
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                style={primaryGradientText}
              >
                {features[0].title}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                {features[0].description}
              </p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={feature1InView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-8 mx-auto w-24 sm:w-32 h-1 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #e265e3 0%, #9861c5 100%)',
                }}
              />
            </motion.div>
          </div>

          {/* Feature 2 - Full Screen */}
          <div ref={feature2Ref} className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={feature2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center max-w-2xl"
            >
              <motion.div
                animate={feature2InView ? {
                  scale: [1, 1.2, 1],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-7xl sm:text-8xl md:text-9xl mb-8"
              >
                {features[1].icon}
              </motion.div>
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                style={primaryGradientText}
              >
                {features[1].title}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                {features[1].description}
              </p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={feature2InView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-8 mx-auto w-24 sm:w-32 h-1 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #e265e3 0%, #9861c5 100%)',
                }}
              />
            </motion.div>
          </div>

          {/* Feature 3 - Full Screen */}
          <div ref={feature3Ref} className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={feature3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center max-w-2xl"
            >
              <motion.div
                animate={feature3InView ? {
                  scale: [1, 1.2, 1],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-7xl sm:text-8xl md:text-9xl mb-8"
              >
                {features[2].icon}
              </motion.div>
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                style={primaryGradientText}
              >
                {features[2].title}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                {features[2].description}
              </p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={feature3InView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-8 mx-auto w-24 sm:w-32 h-1 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #e265e3 0%, #9861c5 100%)',
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
};

export default IdentifySection;