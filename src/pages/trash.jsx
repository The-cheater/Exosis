import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Check, Trash2, Sparkles, RotateCw } from 'lucide-react';

const EmissionCleanupPage = () => {
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [isVerified, setIsVerified] = useState(null);
  const [currentXP, setCurrentXP] = useState(0);
  const [targetXP, setTargetXP] = useState(150);
  const [level, setLevel] = useState(1);
  const [house, setHouse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const beforeInputRef = useRef(null);
  const afterInputRef = useRef(null);

  const houses = {
    gryffindor: { color: 'bg-red-100 text-red-800', avatar: '🦁' },
    slytherin: { color: 'bg-green-100 text-green-800', avatar: '🐍' },
    hufflepuff: { color: 'bg-yellow-100 text-yellow-800', avatar: '🦡' },
    ravenclaw: { color: 'bg-blue-100 text-blue-800', avatar: '🦅' }
  };

  const handleImageUpload = (setImage) => (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setBeforeImage(null);
    setAfterImage(null);
    setIsVerified(null);
    setShowSuccess(false);
    if (beforeInputRef.current) beforeInputRef.current.value = '';
    if (afterInputRef.current) afterInputRef.current.value = '';
  };

  const simulateVerification = () => {
    if (!beforeImage || !afterImage) return;

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
      const xpGain = 25 + Math.floor(Math.random() * 15);
      setCurrentXP(prev => {
        const newXP = prev + xpGain;
        if (newXP >= targetXP) {
          setLevel(l => l + 1);
          setTargetXP(prevTarget => prevTarget + 50);
          return newXP - targetXP;
        }
        return newXP;
      });
      setHouse(['gryffindor', 'slytherin', 'hufflepuff', 'ravenclaw'][Math.floor(Math.random() * 4)]);
    }, 2000);
  };

  const xpProgress = () => (currentXP / targetXP) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-teal-50 to-white p-4 md:p-6"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-6 md:mb-8 text-center"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-teal-700 mb-2">Emission Reduction Challenge</h1>
          <p className="text-teal-600">Help reduce pollution and earn carbon credits!</p>
        </motion.div>

        {/* Progress Bar */}
        {isLoading && (
          <div className="mb-4 bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-teal-500 h-3 rounded-full"
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
            className="bg-white p-6 rounded-xl shadow-md border border-teal-200"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-3">
                <h3 className="font-medium text-teal-700">Before Cleanup</h3>
                <div className="h-48 bg-teal-100 rounded-lg overflow-hidden border-2 border-dashed border-teal-300 flex items-center justify-center">
                  {beforeImage ? (
                    <img src={beforeImage} alt="Before" className="w-full h-full object-cover" />
                  ) : (
                    <label className="cursor-pointer text-center p-4">
                      <div className="mx-auto w-12 h-12 bg-teal-200 rounded-full flex items-center justify-center mb-2">
                        <Trash2 className="text-teal-600" />
                      </div>
                      <p className="text-teal-600 font-medium">Upload Before Image</p>
                      <input 
                        ref={beforeInputRef}
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload(setBeforeImage)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                {beforeImage && (
                  <button 
                    onClick={() => setBeforeImage(null)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Remove Image
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="font-medium text-teal-700">After Cleanup</h3>
                <div className="h-48 bg-teal-100 rounded-lg overflow-hidden border-2 border-dashed border-teal-300 flex items-center justify-center">
                  {afterImage ? (
                    <img src={afterImage} alt="After" className="w-full h-full object-cover" />
                  ) : (
                    <label className="cursor-pointer text-center p-4">
                      <div className="mx-auto w-12 h-12 bg-teal-200 rounded-full flex items-center justify-center mb-2">
                        <Leaf className="text-teal-600" />
                      </div>
                      <p className="text-teal-600 font-medium">Upload After Image</p>
                      <input 
                        ref={afterInputRef}
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload(setAfterImage)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                {afterImage && (
                  <button 
                    onClick={() => setAfterImage(null)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={simulateVerification}
              disabled={!beforeImage || !afterImage || isLoading}
              className={`w-full py-3 rounded-lg font-medium flex items-center justify-center ${
                beforeImage && afterImage 
                  ? 'bg-teal-600 hover:bg-teal-700 text-white' 
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
                  Verify Emission Reduction
                  <Leaf className="ml-2" />
                </>
              )}
            </button>
          </motion.div>
        ) : (
          <AnimatePresence>
            {/* Success Popup */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-2 border-teal-300"
            >
              {/* Header */}
              <div className="text-center mb-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-20 h-20 mx-auto rounded-full bg-teal-100 flex items-center justify-center mb-4"
                >
                  <Check className="text-teal-600 w-10 h-10" />
                </motion.div>
                <h2 className="text-2xl font-bold text-teal-700 mb-2">Verification Successful!</h2>
                <div className="flex items-center justify-center text-teal-700">
                  <Leaf className="mr-2" />
                  <span className="font-medium">Emission Reduction Verified</span>
                </div>
              </div>

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
                    <p className="text-sm">+{Math.floor(xpProgress() * 0.3)} team XP</p>
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
                  <span className="font-medium text-teal-700">Level {level} XP</span>
                  <span className="font-bold">{currentXP}/{targetXP}</span>
                </div>
                <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="bg-teal-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${xpProgress()}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                {currentXP >= targetXP && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-2 text-center text-teal-600 font-medium flex items-center justify-center"
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
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium flex items-center justify-center"
                >
                  Verify Another Reduction
                  <Leaf className="ml-2" size={18} />
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default EmissionCleanupPage;