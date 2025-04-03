import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Star, Lock, Trophy, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

const XpLevelSystem = () => {
  const [xp, setXp] = useState(0);
  const scrollContainerRef = useRef(null);
  const levelRefs = useRef([]);
  
  const levels = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      level: i + 1,
      requiredXp: (i + 1) * 100,
    }));
  }, []);

  const currentLevel = useMemo(() => {
    return levels.find(level => xp < level.requiredXp)?.level || levels.length + 1;
  }, [xp, levels]);

  const getLevelStatus = (levelNum) => {
    if (levelNum < currentLevel) return 'completed';
    if (levelNum === currentLevel) return 'current';
    return 'locked';
  };

  // Auto-scroll to current level when XP changes
  useEffect(() => {
    if (levelRefs.current[currentLevel - 1] && scrollContainerRef.current) {
      const levelElement = levelRefs.current[currentLevel - 1];
      const container = scrollContainerRef.current;
      
      const containerWidth = container.offsetWidth;
      const levelLeft = levelElement.offsetLeft;
      const levelWidth = levelElement.offsetWidth;
      
      // Calculate scroll position to center the current level
      const scrollTo = levelLeft - (containerWidth / 2) + (levelWidth / 2);
      
      container.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  }, [currentLevel]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex flex-col items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-full max-w-6xl shadow-2xl">
        {/* XP Control Section */}
        <div className="mb-8 bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-purple-200 text-lg">Experience Points</span>
            </div>
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              {xp} XP
            </div>
          </div>
          <input
            type="range"
            min="0"
            max={levels[levels.length - 1].requiredXp}
            step="10"
            value={xp}
            onChange={(e) => setXp(Number(e.target.value))}
            className="w-full h-2 bg-purple-900/50 rounded-lg appearance-none cursor-pointer 
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 
                     [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full 
                     [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-yellow-300 
                     [&::-webkit-slider-thumb]:to-orange-300"
          />
          <div className="flex justify-between text-xs text-purple-200 mt-1">
            <span>0 XP</span>
            <span>{levels[levels.length - 1].requiredXp} XP</span>
          </div>
        </div>

        {/* Level Progress Section */}
        <div className="mb-4 flex justify-between items-center">
          <div className="text-lg text-purple-200">
            Current Level: <span className="font-bold text-yellow-300">{currentLevel}</span>
          </div>
          <div className="text-lg text-purple-200">
            Next Level: <span className="font-bold">
              {currentLevel <= levels.length ? levels[currentLevel - 1].requiredXp - xp : 0} XP needed
            </span>
          </div>
        </div>

        {/* Scrollable Level Map */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="flex items-center gap-8 px-4">
              {levels.map((level, index) => (
                <React.Fragment key={level.level}>
                  <div 
                    ref={el => levelRefs.current[index] = el}
                    className="flex flex-col items-center transition-all duration-300"
                  >
                    {/* Level Node */}
                    <div
                      className={`relative flex items-center justify-center w-14 h-14 rounded-full 
                        transition-all duration-300 ${
                        getLevelStatus(level.level) === 'completed'
                          ? 'bg-gradient-to-r from-green-400 to-blue-500 shadow-lg shadow-green-500/30'
                          : getLevelStatus(level.level) === 'current'
                          ? 'bg-gradient-to-r from-yellow-300 to-orange-400 shadow-lg shadow-orange-500/30 ring-4 ring-orange-300/30'
                          : 'bg-gray-700/50 shadow-inner'
                      }`}
                    >
                      {getLevelStatus(level.level) === 'completed' ? (
                        <Trophy className="w-6 h-6 text-white drop-shadow" />
                      ) : getLevelStatus(level.level) === 'current' ? (
                        <Star className="w-6 h-6 text-white drop-shadow animate-spin-slow" />
                      ) : (
                        <Lock className="w-6 h-6 text-white/40" />
                      )}
                    </div>
                    
                    {/* Level Info */}
                    <div className="mt-2 text-center">
                      <div className={`font-bold ${
                        getLevelStatus(level.level) === 'current'
                          ? 'text-yellow-300'
                          : getLevelStatus(level.level) === 'completed'
                          ? 'text-green-300'
                          : 'text-gray-400'
                      }`}>
                        {level.level}
                      </div>
                      <div className={`text-xs ${
                        getLevelStatus(level.level) === 'locked'
                          ? 'text-gray-500'
                          : 'text-purple-200'
                      }`}>
                        {level.requiredXp} XP
                      </div>
                    </div>
                  </div>
                  
                  {/* Connection Line (except last level) */}
                  {index < levels.length - 1 && (
                    <div className={`h-1 w-8 rounded-full ${
                      getLevelStatus(level.level) === 'completed'
                        ? 'bg-gradient-to-r from-green-400 to-blue-500'
                        : 'bg-gray-700/50'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XpLevelSystem;