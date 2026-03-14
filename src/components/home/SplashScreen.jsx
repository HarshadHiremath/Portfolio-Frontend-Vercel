import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiCommandLine, HiCpuChip, HiShieldCheck } from 'react-icons/hi2';

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 5000; // 5 seconds
    const intervalTime = 50; // Update every 50ms for smoothness
    const increment = (intervalTime / totalDuration) * 150;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Small delay at 100% so the user sees completion before moving on
          setTimeout(() => {
            // onComplete();
          }, 600); 
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 font-mono overflow-hidden">
      {/* Background Matrix Glow */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_#00ff00_0%,_transparent_70%)]"></div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative flex flex-col items-center space-y-10 z-10"
      >
        {/* Terminal Icon Animation */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5] 
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-green-500 text-7xl drop-shadow-[0_0_15px_rgba(0,255,0,0.6)]"
        >
          <HiCommandLine />
        </motion.div>

        {/* Brand Name */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-500 tracking-[0.2em] uppercase">
            Harshad Hiremath
          </h1>
          <p className="text-green-800 text-xs mt-2 tracking-widest animate-pulse">
            {progress < 100 ? "INITIALIZING_SYSTEM_CORE..." : "ACCESS_GRANTED"}
          </p>
        </div>

        {/* Progress Section */}
        <div className="w-80 space-y-4">
          <div className="flex justify-between text-[10px] text-green-500 font-bold tracking-tighter">
            <span>STATUS: {progress < 100 ? 'UPLOADING_SKILLS' : 'COMPLETE'}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          
          {/* Progress Bar Body */}
          <div className="h-3 w-full bg-green-950/40 border border-green-500/50 rounded-none overflow-hidden p-[2px]">
            <motion.div 
              className="h-full bg-green-500 shadow-[0_0_15px_#00ff00]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          {/* System Check Icons */}
          <div className="flex justify-center space-x-6 text-2xl mt-4">
            <HiCpuChip className={`${progress > 33 ? "text-green-400" : "text-green-900"} transition-colors duration-300`} />
            <HiShieldCheck className={`${progress > 75 ? "text-green-400" : "text-green-900"} transition-colors duration-300`} />
          </div>
        </div>
      </motion.div>

      {/* Retro CRT Scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_3px,3px_100%]"></div>
    </div>
  );
};

export default SplashScreen;