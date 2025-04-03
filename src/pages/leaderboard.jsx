import { useState } from 'react';

const HouseCupLeaderboard = () => {
  const [activeTab, setActiveTab] = useState('house');

  // House data with team names and XP
  const houseTeams = [
    { name: 'Gryffindor Guardians', xp: 8450, house: 'gryffindor', teamName: 'LIONHEARTS' },
    { name: 'Slytherin Shadows', xp: 7920, house: 'slytherin', teamName: 'SERPENTINE' },
    { name: 'Hufflepuff Harvesters', xp: 6745, house: 'hufflepuff', teamName: 'BADGER BRIGADE' },
    { name: 'Ravenclaw Scholars', xp: 7100, house: 'ravenclaw', teamName: 'WISE OWLS' }
  ];

  const individualPlayers = [
    { name: 'Harry Green', xp: 2450, house: 'gryffindor', teamName: 'LIONHEARTS' },
    { name: 'Hermione Earth', xp: 2300, house: 'ravenclaw', teamName: 'WISE OWLS' },
    { name: 'Draco Eco', xp: 2150, house: 'slytherin', teamName: 'SERPENTINE' },
    { name: 'Luna Wild', xp: 1980, house: 'hufflepuff', teamName: 'BADGER BRIGADE' }
  ];

  // House color mappings (light theme variants)
  const houseColors = {
    gryffindor: { bg: 'bg-[#FF9999]', text: 'text-[#A50000]' },
    slytherin: { bg: 'bg-[#99CC99]', text: 'text-[#005500]' },
    hufflepuff: { bg: 'bg-[#FFEE99]', text: 'text-[#AA7700]' },
    ravenclaw: { bg: 'bg-[#99CCFF]', text: 'text-[#003366]' }
  };

  // Team badge component
  const TeamBadge = ({ house, teamName }) => (
    <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${houseColors[house].bg} ${houseColors[house].text}`}>
      {teamName}
    </span>
  );

  // Leaderboard slot component
  const LeaderboardSlot = ({ xp, name, house, teamName }) => (
    <div className="flex items-center py-3 border-b border-gray-200">
      <div className="flex flex-col items-center justify-center w-14 h-14 rounded-full border-2 border-amber-600 bg-amber-50 mr-4">
        <span className="text-lg font-bold text-amber-700 leading-none">{xp}</span>
        <span className="text-xs text-amber-700 mt-0.5">XP</span>
      </div>
      <div className="flex-1">
        <div className="text-gray-800 font-medium">{name}</div>
        <TeamBadge house={house} teamName={teamName} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-amber-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 to-amber-600 p-5">
          <h1 className="text-2xl text-center text-white font-bold">House Cup Eco-Wars</h1>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-amber-200 bg-amber-100">
          <button
            className={`flex-1 py-3 font-medium text-sm ${activeTab === 'house' ? 'text-amber-800 border-b-2 border-amber-600' : 'text-amber-700 hover:text-amber-800'}`}
            onClick={() => setActiveTab('house')}
          >
            House Alliances
          </button>
          <button
            className={`flex-1 py-3 font-medium text-sm ${activeTab === 'individual' ? 'text-amber-800 border-b-2 border-amber-600' : 'text-amber-700 hover:text-amber-800'}`}
            onClick={() => setActiveTab('individual')}
          >
            Wizard Champions
          </button>
        </div>

        {/* Leaderboard Content */}
        <div className="p-5">
          <div className="space-y-4">
            {activeTab === 'house' ? (
              houseTeams.map((team) => (
                <LeaderboardSlot key={team.name} {...team} />
              ))
            ) : (
              individualPlayers.map((player) => (
                <LeaderboardSlot key={player.name} {...player} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseCupLeaderboard;