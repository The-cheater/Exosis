import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Globe } from 'lucide-react';

const LocationPopup = ({ location, onClose }) => {
  // Default demo data when location prop isn't provided
  const demoLocation = {
    name: "Sample Location",
    lat: 40.7128,
    lon: -74.0060,
    userId: "demo123"
  };

  const displayLocation = location || demoLocation;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="fixed top-4 right-4 bg-white rounded-xl shadow-2xl p-6 min-w-[300px] z-50 border border-gray-200"
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <MapPin className="mr-2 w-5 h-5 text-teal-500" />
            {displayLocation.name}
          </h2>
          <button 
            onClick={onClose || (() => console.log("Close clicked"))} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close popup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600">
            <span className="mr-2 text-gray-400">Latitude:</span>
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
              {displayLocation.lat.toFixed(4)}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="mr-2 text-gray-400">Longitude:</span>
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
              {displayLocation.lon.toFixed(4)}
            </span>
          </div>
        </div>

        <button 
          onClick={() => window.location.href = `/user/${displayLocation?.userId}`}
          className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium flex items-center justify-center transition-colors"
        >
          <Globe className="mr-2 w-4 h-4" />
          Visit World
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default LocationPopup;