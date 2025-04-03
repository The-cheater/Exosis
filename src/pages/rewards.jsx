import { useState } from 'react';

const EcoHogwartsEmporium = () => {
  const [impact, setImpact] = useState({
    treesPlanted: 42,
    trashCleaned: 18, // now represents number of cleanups
    publicTransportUses: 36
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [isRedeeming, setIsRedeeming] = useState(false);

  // Replace these with your own image paths
  const merchandiseImages = {
    hoodie: "src/assets/Gray Modern Black Hoodie Premium Quality Instagram Post.png",
    pen: "src/assets/WHite Black Modern The Luxury Pen Series Instagram Post (130 x 130 mm).png",
    map: "src/assets/10-1_2.jpg",
    herbology: "src/assets/Modern Gardening Tools Kit Amazon Product Images.png",
    owl: "src/assets/Untitled design.png",
    scarf: "src/assets/Beige Brown Scarf & Fashion Store Presentation  (130 x 130 mm).png"
  };

  const merchandise = [
    {
      id: 1,
      name: "Hogwarts Hoodie",
      description: "House-colored hoodie with crest embroidery (organic cotton)",
      cost: { treesPlanted: 8 },
      image: merchandiseImages.hoodie,
      eco: true
    },
    {
      id: 2,
      name: "Phoenix Feather Pen",
      description: "Self-inking magical quill pen (sustainably sourced)",
      cost: { trashCleaned: 4 },
      image: merchandiseImages.pen,
      eco: true
    },
    {
      id: 3,
      name: "Marauder's Map",
      description: "Replica parchment with moving ink (recycled materials)",
      cost: { publicTransportUses: 12 },
      image: merchandiseImages.map,
      eco: true
    },
    {
      id: 4,
      name: "Herbology Starter Kit",
      description: "Magical plants kit with biodegradable pots",
      cost: { treesPlanted: 6 },
      image: merchandiseImages.herbology,
      eco: true
    },
    {
      id: 5,
      name: "Owl Plush",
      description: "Hedwig plush made from recycled fabrics",
      cost: { trashCleaned: 5 },
      image: merchandiseImages.owl,
      eco: true
    },
    {
      id: 6,
      name: "Solar-Powered Scarf",
      description: "House scarf with solar-thread warming charm",
      cost: { publicTransportUses: 7 },
      image: merchandiseImages.scarf,
      eco: true
    }
  ];

  const canAfford = (item) => {
    return Object.entries(item.cost).every(([key, value]) => impact[key] >= value);
  };

  const redeemItem = (item) => {
    if (canAfford(item)) {
      setIsRedeeming(true);
      setSelectedItem(item);
      
      setTimeout(() => {
        const newImpact = {...impact};
        Object.entries(item.cost).forEach(([key, value]) => {
          newImpact[key] -= value;
        });
        setImpact(newImpact);
        setIsRedeeming(false);
        setSelectedItem(null);
      }, 1500);
    }
  };

  const formatCost = (cost) => {
    return Object.entries(cost).map(([key, value]) => {
      const label = {
        treesPlanted: `${value} tree${value !== 1 ? 's' : ''}`,
        trashCleaned: `${value} cleanup${value !== 1 ? 's' : ''}`,
        publicTransportUses: `${value} transit use${value !== 1 ? 's' : ''}`
      }[key];
      return (
        <span key={key} className="inline-block bg-amber-100 text-amber-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
          {label}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-800 mb-2">Hogwarts Eco-Emporium</h1>
          <div className="bg-white rounded-lg shadow-lg p-4 inline-block border-2 border-amber-200">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-amber-50 rounded-lg p-3 text-center min-w-[120px]">
                <div className="text-2xl font-bold text-amber-700">{impact.treesPlanted}</div>
                <div className="text-sm text-amber-600">Trees Planted</div>
              </div>
              <div className="bg-amber-50 rounded-lg p-3 text-center min-w-[120px]">
                <div className="text-2xl font-bold text-amber-700">{impact.trashCleaned}</div>
                <div className="text-sm text-amber-600">Trash Cleanups</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center min-w-[120px]">
                <div className="text-2xl font-bold text-green-700">{impact.publicTransportUses}</div>
                <div className="text-sm text-green-600">Transit Uses</div>
              </div>
            </div>
          </div>
        </header>

        {/* Merchandise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {merchandise.map((item) => (
            <div 
              key={item.id}
              className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 ${
                canAfford(item) ? "border-amber-200" : "border-gray-200 opacity-70"
              }`}
            >
              <div className="p-4 flex flex-col h-full">
                <div className="flex justify-center mb-4 h-48 bg-amber-50 rounded-lg overflow-hidden">
                  {/* Image option - replace with your own images */}
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center text-amber-300 w-full h-full">
                      <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>
                
                <div className="mb-3">
                  <div className="text-sm font-medium text-gray-500 mb-1">Eco Impact Cost:</div>
                  <div className="flex flex-wrap">
                    {formatCost(item.cost)}
                  </div>
                </div>
                
                <button
                  onClick={() => redeemItem(item)}
                  disabled={!canAfford(item) || isRedeeming}
                  className={`w-full mt-auto px-4 py-2 rounded-lg font-medium transition-colors ${
                    !canAfford(item)
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  } ${
                    selectedItem?.id === item.id && isRedeeming ? "animate-pulse" : ""
                  }`}
                >
                  {isRedeeming && selectedItem?.id === item.id ? "Redeeming..." : "Redeem Now"}
                </button>
                
                {item.eco && (
                  <div className="mt-2 flex items-center justify-center text-green-600">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Eco-Friendly Product</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Success Animation */}
        {isRedeeming && selectedItem && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-xl max-w-sm text-center animate-bounce border-2 border-green-300">
              {selectedItem.image ? (
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.name}
                  className="w-24 h-24 object-cover mx-auto mb-4 rounded-lg"
                />
              ) : (
                <div className="w-24 h-24 bg-amber-50 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Redeeming {selectedItem.name}!</h3>
              <p className="text-gray-600 mb-4">
                -{Object.entries(selectedItem.cost).map(([key, value]) => `${value} ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`).join(", ")}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EcoHogwartsEmporium;