import { Bell, Sparkles } from 'lucide-react';

const Header = ({ currentXp = 0, currentLevel = 1 }) => {
  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm w-full fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* XP Display - Left Side */}
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100">
              <Sparkles className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Level {currentLevel}</p>
              <p className="text-sm font-bold text-gray-700">
                {currentXp} XP
              </p>
            </div>
          </div>

          {/* Notification Icon - Right Side */}
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;