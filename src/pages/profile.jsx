import React from 'react';
import { motion } from 'framer-motion';
import { Wand, Leaf, Trash2, Bus, Star, Trophy, Sparkles, Castle, Award, ScrollText } from 'lucide-react';

const UserProfileCard = () => {
  // Enhanced user data
  const user = {
    name: "Hermione Green",
    title: "Environmental Auror",
    xp: 2245,
    xpToNextLevel: 3000,
    treesPlanted: 18,
    trashCleaned: 12,
    co2Reduced: 23,
    house: "Ravenclaw",
    team: "Wise Owls",
    achievements: 4,
    housePoints: 375
  };

  const houseStyles = {
    gryffindor: {
      primary: 'bg-gradient-to-br from-red-700 to-amber-600',
      secondary: 'bg-red-100 text-red-800',
      accent: 'border-amber-400'
    },
    slytherin: {
      primary: 'bg-gradient-to-br from-emerald-800 to-slate-500',
      secondary: 'bg-emerald-100 text-emerald-800',
      accent: 'border-silver-300'
    },
    hufflepuff: {
      primary: 'bg-gradient-to-br from-amber-600 to-yellow-300',
      secondary: 'bg-amber-100 text-amber-800',
      accent: 'border-yellow-400'
    },
    ravenclaw: {
      primary: 'bg-gradient-to-br from-blue-800 to-bronze-500',
      secondary: 'bg-blue-100 text-blue-800',
      accent: 'border-bronze-400'
    }
  };

  const currentHouse = houseStyles[user.house.toLowerCase()];
  const xpPercentage = Math.min(100, (user.xp / user.xpToNextLevel) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative max-w-lg w-full mx-auto rounded-xl overflow-hidden shadow-2xl ${currentHouse.primary} text-white`}
    >
      {/* Animated parchment background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 0.4 }}
        className="absolute inset-0 bg-[url('')] bg-cover mix-blend-overlay"
      />
      
      {/* Floating magical particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            y: [0, Math.random() * 40 - 20],
            x: [0, Math.random() * 40 - 20],
            rotate: [0, Math.random() * 360]
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
          className="absolute text-yellow-300 opacity-70"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 10 + 10}px`
          }}
        >
          ✨
        </motion.div>
      ))}

      <div className="relative z-10 p-6">
        {/* Header with house banner */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          className={`flex items-center justify-between mb-6 p-3 rounded-lg ${currentHouse.secondary} border ${currentHouse.accent}`}
        >
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-sm opacity-80">{user.title}</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className={`w-14 h-14 rounded-full flex items-center justify-center ${currentHouse.secondary} border-2 ${currentHouse.accent}`}
          >
            <Castle size={24} />
          </motion.div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column - Stats */}
          <div>
            {/* XP Progress */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-6 bg-white bg-opacity-10 p-4 rounded-xl backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Wand className="mr-2 text-yellow-300" />
                  <span className="font-medium">Magical XP</span>
                </div>
                <span className="text-sm font-bold">{user.xp}/{user.xpToNextLevel}</span>
              </div>
              <div className="w-full bg-black bg-opacity-30 rounded-full h-3 mb-1">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPercentage}%` }}
                  transition={{ duration: 1.5, delay: 0.4 }}
                  className="bg-gradient-to-r from-yellow-300 to-amber-500 h-3 rounded-full relative overflow-hidden"
                >
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                </motion.div>
              </div>
              <div className="text-right text-xs opacity-80">
                Level {Math.floor(user.xp / 500) + 1} Wizard ({xpPercentage.toFixed(0)}%)
              </div>
            </motion.div>

            {/* Environmental Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-3 mb-6"
            >
              <StatCard 
                icon={<Leaf className="text-green-400" />} 
                value={user.treesPlanted} 
                label="Trees" 
                delay={0.5}
              />
              <StatCard 
                icon={<Trash2 className="text-blue-400" />} 
                value={user.trashCleaned} 
                label="Cleanups" 
                delay={0.6}
              />
              <StatCard 
                icon={<Bus className="text-purple-400" />} 
                value={user.co2Reduced} 
                label="CO₂ Reduced" 
                delay={0.7}
              />
            </motion.div>
          </div>

          {/* Right column - House Info */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white bg-opacity-10 p-4 rounded-xl backdrop-blur-sm mb-4"
            >
              <h3 className="font-bold mb-3 flex items-center">
                <ScrollText className="mr-2" />
                House Achievements
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-80">House:</span>
                  <span className="font-medium">{user.house}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-80">Team:</span>
                  <span className="font-medium">{user.team}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-80">House Points:</span>
                  <span className="font-medium flex items-center">
                    {user.housePoints}
                    <Star className="ml-1 text-yellow-300" size={14} />
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white bg-opacity-10 p-4 rounded-xl backdrop-blur-sm"
            >
              <h3 className="font-bold mb-3 flex items-center">
                <Award className="mr-2" />
                Recent Achievements
              </h3>
              <div className="flex flex-wrap gap-2">
                {[...Array(user.achievements)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="bg-yellow-500 bg-opacity-20 text-yellow-300 px-3 py-1 rounded-full text-xs flex items-center"
                  >
                    <Trophy size={12} className="mr-1" />
                    Achievement {i+1}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 pt-4 border-t border-white/10 text-center text-sm opacity-80"
        >
          "Every small act of environmental magic contributes to a greater spell of planetary healing."
        </motion.div>
      </div>
    </motion.div>
  );
};

// Animated Stat Card Component
const StatCard = ({ icon, value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ y: -5 }}
    className="bg-black bg-opacity-20 p-3 rounded-lg text-center backdrop-blur-sm"
  >
    <div className="flex justify-center mb-1">
      {icon}
    </div>
    <div className="text-xl font-bold">{value}</div>
    <div className="text-xs opacity-80">{label}</div>
  </motion.div>
);

export default UserProfileCard;