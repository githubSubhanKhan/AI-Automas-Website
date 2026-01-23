import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <img 
               src="/logos/Aiautomas-colored-01.png"
                alt="SimpliScale"
                className="h-36 sm:h-40 md:h-42 w-auto"
            />

            {/* <div
              className="h-36 sm:h-40 md:h-42 w-[220px] sm:w-[260px] md:w-[300px] 
                        bg-gradient-to-r from-[#e265e3] to-[#9861c5]"
              style={{
                WebkitMaskImage: "url('/logos/FullLogo.png')",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                WebkitMaskPosition: "center",
                maskImage: "url('/logos/FullLogo.png')",
                maskRepeat: "no-repeat",
                maskSize: "contain",
                maskPosition: "center",
              }}
            /> */}

            <span className="ml-3 text-xl sm:text-2xl font-semibold text-white">
            </span>
          </motion.div>

          {/* Get In Touch Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              onClick={() => navigate('/form')}
              className="group relative px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#e265e3] to-[#9861c5] text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center">
                Get In Touch
                <svg 
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#9861c5] to-[#e265e3] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(226, 101, 227, 0)',
                    '0 0 20px rgba(226, 101, 227, 0.6)',
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;