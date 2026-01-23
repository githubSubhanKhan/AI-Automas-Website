import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Phone, X } from 'lucide-react';


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
      className="relative size-full overflow-hidden bg-gradient-to-b from-whitecustom via-whitecustom to-pinkcustom/5"
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
  const [showCallModal, setShowCallModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notification, setNotification] = useState<{show: boolean, message: string, type: 'success' | 'error'}>({show: false, message: '', type: 'success'});
  const words = ['Software', 'Platform', 'Solution', 'Tool'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleCall = async () => {
  if (!phoneNumber.trim()) return;

  try {
    const res = await fetch("http://localhost:5000/api/call/call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phoneNumber }),
    });

    const data = await res.json();

    if (data.success) {
      setNotification({show: true, message: "📞 Call initiated! You will receive a call shortly.", type: 'success'});
      setTimeout(() => setNotification({show: false, message: '', type: 'success'}), 4000);
      setShowCallModal(false);
      setPhoneNumber("");
    } else {
      setNotification({show: true, message: data.message || "Call failed. Please try again.", type: 'error'});
      setTimeout(() => setNotification({show: false, message: '', type: 'error'}), 4000);
    }
  } catch (err) {
    setNotification({show: true, message: "Server error. Please try again.", type: 'error'});
    setTimeout(() => setNotification({show: false, message: '', type: 'error'}), 4000);
  }
};


  return (
    <StarsBackground>
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Modern Notification */}
        <AnimatePresence>
          {notification.show && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none"
            >
              <div className={`${
                notification.type === 'success' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                  : 'bg-gradient-to-r from-red-500 to-rose-500'
              } text-white px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm w-full max-w-md pointer-events-auto`}>
                <p className="text-center font-semibold text-sm sm:text-base">{notification.message}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call Modal */}
        <AnimatePresence>
          {showCallModal && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                onClick={() => setShowCallModal(false)}
              />
              
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-pinkcustom to-purplecustom p-6 text-white relative">
                    <button
                      onClick={() => setShowCallModal(false)}
                      className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <X size={20} />
                    </button>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white/20 rounded-full">
                        <Phone size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Schedule a Call</h3>
                        <p className="text-sm text-white/80">Enter your number below</p>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pinkcustom focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    <motion.button
                      onClick={handleCall}
                      disabled={!phoneNumber.trim()}
                      className="w-full py-3 bg-gradient-to-r from-pinkcustom to-purplecustom text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: phoneNumber.trim() ? 1.02 : 1 }}
                      whileTap={{ scale: phoneNumber.trim() ? 0.98 : 1 }}
                    >
                      Call Now
                    </motion.button>

                    <p className="text-xs text-gray-500 text-center">
                      We'll connect you with our team right away
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-pinkcustom/20 rounded-full blur-3xl"
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
            className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purplecustom/20 rounded-full blur-3xl"
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
  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-extralight text-gray-800 mb-8 sm:mb-10 md:mb-12 tracking-tight leading-snug text-center mt-20"
  style={{ fontFamily: "'Poppins', sans-serif" }}
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
                    textShadow: '0 0 40px rgba(226, 101, 227, 0.3)',
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
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 font-light tracking-wide max-w-3xl mx-auto px-4"
          >
            You need an AI that does it all
          </motion.p>

          {/* CTA Buttons */}
                    <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 sm:mt-10 md:mt-12 flex flex-col items-center justify-center gap-3 w-full max-w-xs sm:max-w-sm mx-auto px-4"
          >
            <motion.button
              onClick={() => window.location.href = '/form'}
              className="group relative w-full px-6 py-3.5 bg-gradient-to-r from-pinkcustom to-purplecustom text-white font-semibold rounded-full overflow-hidden transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-2xl"
              whileHover={{ scale: 1.05, y: -2 }}
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

            <motion.button
              onClick={() => setShowCallModal(true)}
              className="group relative w-full px-6 py-3.5 bg-white text-gray-800 font-semibold rounded-full overflow-hidden transition-all duration-300 text-sm sm:text-base border-2 border-gray-300 hover:border-pinkcustom flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={18} className="relative z-10" />
              <span className="relative z-10">Schedule Call</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pinkcustom/10 to-purplecustom/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(226, 101, 227, 0)',
                    '0 0 20px rgba(226, 101, 227, 0.4)',
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
        <div className="absolute inset-x-0 bottom-0 h-32 sm:h-48 bg-gradient-to-t from-pinkcustom/5 to-transparent pointer-events-none" />
      </div>
    </StarsBackground>
  );
};

export default Hero;