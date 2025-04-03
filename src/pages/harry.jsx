import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wand2, Trophy, Map, Globe, Sprout, Trash2, Bus, 
  BarChart2, User, Castle, Sparkles, ScrollText, Leaf,
  Trees, Flower2, Mountain, CloudSun, Bird, Gift, MessageCircle, X
} from 'lucide-react';
import { Link } from 'react-router-dom';

const NatureHarryPotterDashboard = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const buttonHover = {
    scale: 1.05,
    boxShadow: "0px 0px 15px rgba(154, 205, 50, 0.3)"
  };

  const buttonTap = {
    scale: 0.98
  };

  // Chatbot state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Stats data - nature themed
  const userStats = [
    { name: 'House Points', value: 375, icon: <Sparkles className="text-amber-500" /> },
    { name: 'Spells Cast', value: 42, icon: <Wand2 className="text-purple-400" /> },
    { name: 'Quests Completed', value: 8, icon: <ScrollText className="text-blue-400" /> },
    { name: 'Trees Planted', value: 15, icon: <Trees className="text-green-500" /> }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { role: "user", content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Comprehensive knowledge paragraphs
      const platformKnowledge = `
        The EcoHagrid platform is a magical sustainability hub where witches and wizards 
        from all houses (Gryffindor, Hufflepuff, Ravenclaw, and Slytherin) compete in 
        eco-friendly challenges. As a proud Hufflepuff member, you currently have 375 
        house points, earned through various green initiatives.
  
        Tree planting is one of our most rewarding activities - each verified planting 
        adds 20 points to your house total. So far you've planted 15 magical trees that 
        appear on our enchanted 3D map. The map visually displays all environmental 
        contributions from your house in real-time.
  
        Your efforts can earn both house points and personal coins. These coins unlock 
        exclusive rewards like magical seeds that grow overnight, enchanted gardening 
        tools, and even access to rare creature habitats. All activities require 
        verification - for tree planting, submit before-and-after photos showing your 
        sapling's progress, while cleanups need proof of the area's transformation.
  
        Special house competitions run monthly, with bonus points for top performers. 
        The current leaderboard shows Gryffindor in the lead, but Hufflepuff is gaining 
        ground thanks to members like you!
      `;
  
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are EcoHagrid, a magical sustainability guide. Use this knowledge:
              ${platformKnowledge}
              Respond in friendly, whimsical tone with Harry Potter references. Keep answers 
              under 3 sentences unless more detail is requested.`
            },
            ...messages.map(msg => ({ 
              role: msg.role, 
              content: msg.content 
            })),
            { role: "user", content: inputMessage }
          ]
        })
      });
  
      // ... [rest of error handling and response processing]
    } catch (error) {
      // ... [error handling]
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-amber-50 to-white text-gray-800 overflow-hidden">
      {/* Nature background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 rounded-full bg-green-300 filter blur-sm opacity-70 animate-pulse"></div>
        <div className="absolute top-1/3 right-16 w-3 h-3 rounded-full bg-amber-300 filter blur-sm opacity-70 animate-pulse delay-200"></div>
        <div className="absolute bottom-1/4 left-1/4 w-5 h-5 rounded-full bg-emerald-300 filter blur-sm opacity-70 animate-pulse delay-300"></div>
        <div className="absolute bottom-32 right-24 w-2 h-2 rounded-full bg-sky-300 filter blur-sm opacity-70 animate-pulse delay-100"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 pb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center border-2 border-amber-400 shadow-sm">
                <User className="text-white" size={24} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center shadow-sm">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
            </div>
            <div>
              <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-400">
                Newt Scamander
              </h1>
              <p className="text-xs text-amber-600">Hufflepuff</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-amber-100 p-2 rounded-lg border border-amber-300 shadow-sm hover:bg-amber-200 transition-colors">
              <Gift className="text-amber-600" size={24} />
            </button>
            <div className="bg-amber-100 p-2 rounded-lg border border-amber-300 shadow-sm">
              <Castle className="text-amber-600" size={24} />
            </div>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <motion.div 
        className="relative z-10 px-6 mb-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h2 className="text-lg font-semibold mb-3 text-gray-700">Magical Ecology Stats</h2>
        <div className="grid grid-cols-2 gap-3">
          {userStats.map((stat, index) => (
            <motion.div
              key={stat.name}
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-200 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">{stat.name}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
                <div className="p-2 rounded-lg bg-white border border-gray-200">
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Dashboard Buttons */}
      <motion.div 
        className="relative z-10 px-6 mb-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h2 className="text-lg font-semibold mb-3 text-gray-700">Magical Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Statistics Button */}
          <motion.button
            variants={itemVariants}
            whileHover={buttonHover}
            whileTap={buttonTap}
            className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl p-4 flex flex-col items-center justify-center space-y-2 border border-purple-200 shadow-sm"
          >
            <div className="p-3 rounded-full bg-purple-100 border border-purple-300">
              <BarChart2 className="text-purple-500" size={24} />
            </div>
            <span className="font-medium text-gray-700">Eco Stats</span>
          </motion.button>

          {/* Leaderboard Button */}
          <motion.button
            variants={itemVariants}
            whileHover={buttonHover}
            whileTap={buttonTap}
            className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl p-4 flex flex-col items-center justify-center space-y-2 border border-amber-200 shadow-sm"
          >
            <div className="p-3 rounded-full bg-amber-100 border border-amber-300">
              <Trophy className="text-amber-600" size={24} />
            </div>
            <span className="font-medium text-gray-700">House Cup</span>
          </motion.button>

          {/* World Map Button */}
          <motion.button
            variants={itemVariants}
            whileHover={buttonHover}
            whileTap={buttonTap}
            className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-4 flex flex-col items-center justify-center space-y-2 border border-blue-200 shadow-sm"
          >
            <div className="p-3 rounded-full bg-blue-100 border border-blue-300">
              <Map className="text-blue-500" size={24} />
            </div>
            <span className="font-medium text-gray-700">Magical Map</span>
          </motion.button>

          {/* My World Button */}
          <motion.button
            variants={itemVariants}
            whileHover={buttonHover}
            whileTap={buttonTap}
            className="bg-gradient-to-br from-green-100 to-green-50 rounded-xl p-4 flex flex-col items-center justify-center space-y-2 border border-green-200 shadow-sm"
          >
            <div className="p-3 rounded-full bg-green-100 border border-green-300">
              <Globe className="text-green-600" size={24} />
            </div>
            <span className="font-medium text-gray-700">Creature Log</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Environmental Actions */}
<motion.div 
  className="relative z-10 px-6 mb-6"
  initial="hidden"
  animate="visible"
  variants={containerVariants}
>
  <h2 className="text-lg font-semibold mb-3 text-gray-700">Conservation Spells</h2>
  <div className="grid grid-cols-3 gap-3">
    <Link to="/plant">
      <motion.button
        variants={itemVariants}
        whileHover={buttonHover}
        whileTap={buttonTap}
        className="bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-lg p-3 flex flex-col items-center justify-center space-y-1 border border-emerald-200 shadow-sm"
      >
        <div className="p-2 rounded-full bg-emerald-100 border border-emerald-300">
          <Sprout className="text-emerald-600" size={20} />
        </div>
        <span className="text-xs font-medium text-gray-700">Plant Tree</span>
      </motion.button>
    </Link>

    <Link to="/trash">
      <motion.button
        variants={itemVariants}
        whileHover={buttonHover}
        whileTap={buttonTap}
        className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg p-3 flex flex-col items-center justify-center space-y-1 border border-amber-200 shadow-sm"
      >
        <div className="p-2 rounded-full bg-amber-100 border border-amber-300">
          <Trash2 className="text-amber-600" size={20} />
        </div>
        <span className="text-xs font-medium text-gray-700">Clean Waste</span>
      </motion.button>
    </Link>

    <Link to="/co2">
      <motion.button
        variants={itemVariants}
        whileHover={buttonHover}
        whileTap={buttonTap}
        className="bg-gradient-to-br from-sky-100 to-sky-50 rounded-lg p-3 flex flex-col items-center justify-center space-y-1 border border-sky-200 shadow-sm"
      >
        <div className="p-2 rounded-full bg-sky-100 border border-sky-300">
          <Bird className="text-sky-600" size={20} />
        </div>
        <span className="text-xs font-medium text-gray-700">Fly Green</span>
      </motion.button>
    </Link>
  </div>
</motion.div>

{/* Recent Activity */}
<motion.div 
  className="relative z-10 px-6 mb-6"
  initial="hidden"
  animate="visible"
  variants={containerVariants}
>
        <h2 className="text-lg font-semibold mb-3 text-gray-700">Daily Prophet - Eco News</h2>
        <div className="space-y-3">
          {[
            { action: "Planted Whomping Willow", points: "+30", time: "2h ago", color: "text-emerald-500" },
            { action: "Used Thestral Carriage", points: "+15", time: "5h ago", color: "text-sky-500" },
            { action: "Cleaned Forbidden Forest", points: "+20", time: "1d ago", color: "text-amber-500" },
            { action: "Brewed Herbicide Potion", points: "+10", time: "1d ago", color: "text-purple-400" }
          ].map((activity, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200 shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-700">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
              <span className={`font-bold ${activity.color}`}>{activity.points}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Navigation */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 z-20 p-3 shadow-lg"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex justify-around">
          {[
            { icon: <Wand2 size={20} className="text-purple-500" />, label: "Spells" },
            { icon: <Map size={20} className="text-blue-500" />, label: "Map" },
            { icon: <Trophy size={20} className="text-amber-500" />, label: "House" },
            { icon: <User size={20} className="text-emerald-500" />, label: "Profile" }
          ].map((item, index) => (
            <button key={index} className="flex flex-col items-center space-y-1">
              <div className="p-2 rounded-full hover:bg-gray-100/50 transition-colors">
                {item.icon}
              </div>
              <span className="text-xs text-gray-600">{item.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Chat Bot */}
      <div className="fixed bottom-4 right-4 z-50">
        {isChatOpen ? (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-xl w-80 max-h-[80vh] flex flex-col border border-amber-200"
          >
            <div className="p-4 border-b border-amber-100 flex justify-between items-center bg-amber-50 rounded-t-xl">
              <h3 className="font-semibold">Magical Eco Assistant</h3>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="p-1 hover:bg-amber-100 rounded-full"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-sm text-gray-500 py-4">
                  Ask me about house points, tree planting, rewards, or anything about our magical eco-system!
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-xl ${
                      msg.role === 'user' 
                        ? 'bg-amber-100 ml-auto' 
                        : 'bg-emerald-100 mr-auto'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-emerald-100 p-3 rounded-xl">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-amber-100 bg-white rounded-b-xl">
              <div className="flex gap-2">
                <input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about eco-actions..."
                  className="flex-1 p-2 text-sm border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsChatOpen(true)}
            className="bg-amber-500 text-white p-4 rounded-full shadow-lg hover:bg-amber-600 transition-colors"
          >
            <MessageCircle size={24} />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default NatureHarryPotterDashboard;