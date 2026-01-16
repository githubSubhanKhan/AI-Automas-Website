import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface StarLayerProps {
  count: number;
  size: number;
  duration: number;
  starColor: string;
}

interface StarsBackgroundProps {
  children: React.ReactNode;
}


// Star Layer Component
const StarLayer: React.FC<StarLayerProps> = ({ count, size, duration, starColor }) => {
  const [boxShadow, setBoxShadow] = React.useState('');

  React.useEffect(() => {
    const shadows = [];
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 4000) - 2000;
      const y = Math.floor(Math.random() * 4000) - 2000;
      shadows.push(`${x}px ${y}px ${starColor}`);
    }
    setBoxShadow(shadows.join(', '));
  }, [count, starColor]);

  return (
    <motion.div
      animate={{ y: [0, -2000] }}
      transition={{ repeat: Infinity, duration, ease: 'linear' }}
      className="absolute top-0 left-0 w-full h-[2000px]"
    >
      <div
        className="absolute bg-transparent rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
      <div
        className="absolute bg-transparent rounded-full top-[2000px]"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
    </motion.div>
  );
};

// Stars Background Component
const StarsBackground: React.FC<StarsBackgroundProps> = ({ children }) => {
  const offsetX = useMotionValue(1);
  const offsetY = useMotionValue(1);
  const springX = useSpring(offsetX, { stiffness: 50, damping: 20 });
  const springY = useSpring(offsetY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const newOffsetX = -(e.clientX - centerX) * 0.05;
    const newOffsetY = -(e.clientY - centerY) * 0.05;
    offsetX.set(newOffsetX);
    offsetY.set(newOffsetY);
  };

  return (
    <div
      className="relative size-full overflow-hidden bg-gradient-to-b from-purplecustom/20 via-black to-black"
      onMouseMove={handleMouseMove}
    >
      <motion.div style={{ x: springX, y: springY }} className="pointer-events-none">
        <StarLayer count={1000} size={2} duration={50} starColor="#e265e3" />
        <StarLayer count={400} size={3} duration={100} starColor="#9861c5" />
        <StarLayer count={200} size={4} duration={150} starColor="#f8f7fb" />
      </motion.div>
      {children}
    </div>
  );
};

// Main Hero Component
const Hero = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Software', 'Platform', 'Solution', 'Tool', 'System'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <StarsBackground>
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-pinkcustom/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purplecustom/30 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-whitecustom mb-6 sm:mb-8 md:mb-10 tracking-wide leading-tight"
          >
            You Don't Need Another
          </motion.h1>
          
          {/* Animated rotating text */}
          <div className="relative h-16 sm:h-20 md:h-28 lg:h-36 xl:h-44 mb-6 sm:mb-8 md:mb-10 overflow-hidden">
            <div className="relative h-full flex items-center justify-center">
              {words.map((word, index) => (
                <motion.div
                  key={word}
                  className="absolute text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold italic"
                  initial={{ opacity: 0, y: 100, scale: 0.8 }}
                  animate={{
                    opacity: index === currentWord ? 1 : 0,
                    y: index === currentWord ? 0 : index < currentWord ? -100 : 100,
                    scale: index === currentWord ? 1 : 0.8,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #e265e3 0%, #9861c5 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 40px rgba(226, 101, 227, 0.5)',
                  }}
                >
                  {word}
                </motion.div>
              ))}
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-whitecustom/80 font-light tracking-wide max-w-3xl mx-auto px-4"
          >
            You need an AI that does it all
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 sm:mt-10 md:mt-12"
          >
            <motion.button
              className="group relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-gradient-to-r from-pinkcustom to-purplecustom text-whitecustom font-semibold rounded-full overflow-hidden transition-all duration-300 text-sm sm:text-base md:text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get Started</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purplecustom to-pinkcustom opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(226, 101, 227, 0)',
                    '0 0 30px rgba(226, 101, 227, 0.6)',
                    '0 0 0px rgba(226, 101, 227, 0)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.button>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none hidden md:block">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-pinkcustom to-purplecustom rounded-full"
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-32 sm:h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </div>
    </StarsBackground>
  );
};

export default Hero;