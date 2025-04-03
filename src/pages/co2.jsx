import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Check, Wand, Sparkles, Bus, RotateCw } from 'lucide-react';

const WizardCO2Verification = () => {
  // State management
  const [ticketImage, setTicketImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentXP, setCurrentXP] = useState(0);
  const [targetXP, setTargetXP] = useState(150);
  const [house, setHouse] = useState('');
  const [teamXP, setTeamXP] = useState(0);
  const [co2Reduction, setCo2Reduction] = useState(0);
  const [level, setLevel] = useState(1);
  const fileInputRef = useRef(null);

  // Houses and wizard avatars
  const houses = {
    gryffindor: { color: 'bg-red-100 text-red-700', avatar: '🦁' },
    slytherin: { color: 'bg-green-100 text-green-700', avatar: '🐍' },
    hufflepuff: { color: 'bg-yellow-100 text-yellow-700', avatar: '🦡' },
    ravenclaw: { color: 'bg-blue-100 text-blue-700', avatar: '🦅' }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setTicketImage(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset form
  const resetForm = () => {
    setTicketImage(null);
    setShowSuccess(false);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Simulate verification with incremental XP
  const simulateVerification = () => {
    if (!ticketImage) return;

    setIsLoading(true);
    setProgress(0);
    
    // Simulate verification progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    // After verification completes
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      
      // Generate rewards
      const reduction = (2 + Math.random() * 1.5).toFixed(1);
      const xpGain = 20 + Math.floor(Math.random() * 11); // 20-30 XP
      const houseKeys = Object.keys(houses);
      const randomHouse = houseKeys[Math.floor(Math.random() * houseKeys.length)];
      
      setCo2Reduction(reduction);
      setHouse(randomHouse);
      setTeamXP(Math.floor(xpGain * 0.3));

      // Calculate new XP
      setCurrentXP(prev => {
        const newXP = prev + xpGain;
        if (newXP >= targetXP) {
          setLevel(l => l + 1);
          setTargetXP(prevTarget => prevTarget + 50);
          return newXP - targetXP;
        }
        return newXP;
      });

    }, 2000);
  };

  // XP progress bar calculation
  const xpProgress = () => {
    return (currentXP / targetXP) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-6 md:mb-8 text-center"
        >
          <div className="flex items-center justify-center mb-2">
            <Wand className="text-purple-600 mr-2" />
            <h1 className="text-2xl md:text-3xl font-bold text-purple-700">Magical Transport Challenge</h1>
          </div>
          <p className="text-purple-600">Earn house points by reducing CO₂ emissions</p>
        </motion.div>

        {/* Progress Bar */}
        {isLoading && (
          <div className="mb-4 bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-purple-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        )}

        {/* Main Content */}
        {!showSuccess ? (
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-white p-6 rounded-xl shadow-md border border-purple-200"
          >
            <div className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-3">
                <h3 className="font-medium text-purple-700 flex items-center">
                  <Sparkles className="mr-2" size={16} />
                  Public Transport Ticket
                </h3>
                <div className="h-64 bg-purple-100 rounded-lg overflow-hidden border-2 border-dashed border-purple-300 flex items-center justify-center">
                  {ticketImage ? (
                    <img 
                      src={ticketImage} 
                      alt="Transport Ticket" 
                      className="w-full h-full object-contain bg-white p-2"
                    />
                  ) : (
                    <label className="cursor-pointer text-center p-4 w-full">
                      <div className="mx-auto w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mb-3">
                        <Leaf className="text-purple-600 w-8 h-8" />
                      </div>
                      <p className="text-purple-600 font-medium">Upload Ticket Image</p>
                      <p className="text-sm text-purple-500 mt-1">(Any transport ticket)</p>
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        className="mt-3 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm"
                      >
                        Select File
                      </button>
                    </label>
                  )}
                </div>
                {ticketImage && (
                  <button 
                    onClick={() => setTicketImage(null)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Remove Ticket
                  </button>
                )}
              </div>

              {/* Verify Button */}
              <button
                onClick={simulateVerification}
                disabled={!ticketImage || isLoading}
                className={`w-full py-3 rounded-lg font-medium flex items-center justify-center ${
                  ticketImage 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                    : 'bg-gray-200 cursor-not-allowed text-gray-500'
                }`}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="mr-2"
                    >
                      <RotateCw size={18} />
                    </motion.div>
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify CO₂ Reduction
                    <Leaf className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence>
            {/* Success Popup */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-2 border-purple-300"
            >
              {/* Header */}
              <div className="text-center mb-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4"
                >
                  <Check className="text-green-600 w-10 h-10" />
                </motion.div>
                <h2 className="text-2xl font-bold text-green-700 mb-2">Verification Successful!</h2>
                <div className="flex items-center justify-center text-purple-700">
                  <Bus className="mr-2" />
                  <span className="font-medium">Bus Ticket Verified</span>
                </div>
              </div>

              {/* CO₂ Reduction */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6 p-4 bg-blue-50 rounded-lg"
              >
                <p className="text-center text-blue-700">
                  You reduced <span className="font-bold">{co2Reduction}kg</span> of CO₂ emissions!
                </p>
              </motion.div>

              {/* Wizard Avatar and House */}
              {house && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className={`mb-6 p-4 rounded-lg flex items-center ${houses[house].color}`}
                >
                  <div className="text-4xl mr-4">{houses[house].avatar}</div>
                  <div>
                    <p className="font-bold">{house.charAt(0).toUpperCase() + house.slice(1)}</p>
                    <p className="text-sm">+{teamXP} team XP</p>
                  </div>
                </motion.div>
              )}

              {/* XP Progress */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-6"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-purple-700">Level {level} XP</span>
                  <span className="font-bold">{currentXP}/{targetXP}</span>
                </div>
                <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="bg-purple-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${xpProgress()}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                {currentXP >= targetXP && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-2 text-center text-purple-600 font-medium flex items-center justify-center"
                  >
                    <Sparkles className="mr-1" size={16} />
                    Level Up!
                  </motion.div>
                )}
              </motion.div>

              {/* Action Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  onClick={resetForm}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium flex items-center justify-center"
                >
                  Verify Another Ticket
                  <Wand className="ml-2" size={18} />
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default WizardCO2Verification;