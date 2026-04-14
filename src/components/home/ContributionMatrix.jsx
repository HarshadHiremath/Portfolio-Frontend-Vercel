import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ContributionMatrix = () => {
  const [hoverData, setHoverData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const { weeks, monthLabels } = useMemo(() => {
    const totalWeeks = 53;
    const today = new Date();
    
    // Step 1: Find the start date by going back 52 weeks + the days passed in current week
    const startDate = new Date();
    startDate.setDate(today.getDate() - (totalWeeks * 7) + (today.getDay() + 1));

    const tempWeeks = [];
    const tempMonths = [];
    let lastMonth = -1;

    for (let w = 0; w < totalWeeks; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const targetDate = new Date(startDate);
        targetDate.setDate(startDate.getDate() + (w * 7 + d));

        // Step 2: If the calculated date is in the future, it should be empty/hidden
        if (targetDate > today) {
          days.push({ date: null, level: -1 });
        } else {
          // Month Labeling: Only add if month changes and it's the start of a week
          if (d === 0 && targetDate.getMonth() !== lastMonth) {
            tempMonths.push({ 
                name: targetDate.toLocaleString('default', { month: 'short' }), 
                weekIndex: w 
            });
            lastMonth = targetDate.getMonth();
          }

          // 85% Activity Density
          const rand = Math.random();
          let level = 0;
          if (rand > 0.15) {
            if (rand < 0.40) level = 1;
            else if (rand < 0.65) level = 2;
            else if (rand < 0.85) level = 3;
            else level = 4;
          }

          days.push({ 
            date: targetDate.toLocaleDateString('en-US', { 
                month: 'short', day: 'numeric', year: 'numeric' 
            }), 
            level 
          });
        }
      }
      tempWeeks.push(days);
    }
    return { weeks: tempWeeks, monthLabels: tempMonths };
  }, []);

  const getLevelColor = (level) => {
    switch (level) {
      case 0: return "#161b22";
      case 1: return "#0e4429";
      case 2: return "#006d32";
      case 3: return "#26a641";
      case 4: return "#39d353";
      default: return "transparent"; // For future/empty boxes
    }
  };

  const handleMouseMove = (e) => {
    const x = Math.min(Math.max(e.clientX, 100), window.innerWidth - 100);
    setTooltipPos({ x, y: e.clientY });
  };

  return (
    <div className="w-full bg-[#0d1117] border border-slate-800 p-4 md:p-8 rounded-xl relative select-none">
      <div className="overflow-x-auto custom-scrollbar">
        <div className="flex flex-col min-w-[780px]">
          
          {/* Months Header */}
          <div className="flex mb-3 h-4 relative ml-10">
            {monthLabels.map((m, i) => (
              <span 
                key={i} 
                className="absolute text-[11px] text-slate-500 font-bold uppercase tracking-tighter"
                style={{ left: `${(m.weekIndex / 53) * 100}%` }}
              >
                {m.name}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            {/* Weekdays Sidebar */}
            <div className="flex flex-col justify-between text-[10px] text-slate-600 font-bold py-1 h-[100px] w-7">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* Grid Matrix */}
            <div className="flex gap-[3px]" onMouseMove={handleMouseMove}>
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      onMouseEnter={() => day.date && setHoverData(day)}
                      onMouseLeave={() => setHoverData(null)}
                      className={`w-[12px] h-[12px] rounded-[2px] transition-all duration-200 ${
                        day.level !== -1 ? "hover:ring-2 hover:ring-white/50 cursor-crosshair" : ""
                      }`}
                      style={{ backgroundColor: getLevelColor(day.level) }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-start items-center gap-2 mt-4 text-[11px] text-slate-600 font-bold">
            <span>Less</span>
            <div className="flex gap-[3px]">
              {[0, 1, 2, 3, 4].map(l => (
                <div key={l} className="w-[12px] h-[12px] rounded-[2px]" style={{ backgroundColor: getLevelColor(l) }} />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Floating Tooltip */}
      <AnimatePresence>
        {hoverData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed',
              left: tooltipPos.x,
              top: tooltipPos.y - 50,
              transform: 'translateX(-50%)'
            }}
            className="pointer-events-none z-[999] bg-[#161b22] border border-slate-700 px-4 py-2 rounded-lg shadow-2xl text-[12px] text-white"
          >
            <p className="font-mono">
                <span className="text-green-500 font-bold">{hoverData.level * 3 } Solves on</span>
                <br />
                <span className="text-slate-400">{hoverData.date}</span>
            </p>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#161b22] border-r border-b border-slate-700 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContributionMatrix;