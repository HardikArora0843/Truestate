import React from 'react';
import { Zap, Github, Users, Cpu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-darker border-b border-orange-500/20 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="hexagon"></div>
              <Zap className="w-6 h-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div>
              <h1 className="text-2xl font-bold holographic">NeighborFit</h1>
              <p className="text-xs text-gray-400">Neural Neighborhood Matching</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#algorithm" className="text-gray-300 hover:text-orange-400 transition-colors relative group">
              Algorithm
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#data" className="text-gray-300 hover:text-orange-400 transition-colors relative group">
              Data Sources
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#methodology" className="text-gray-300 hover:text-orange-400 transition-colors relative group">
              Methodology
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all group-hover:w-full"></span>
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-orange-400 transition-colors p-2 rounded-lg hover:bg-orange-500/10">
              <Users className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-orange-400 transition-colors p-2 rounded-lg hover:bg-orange-500/10">
              <Github className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-orange-400 transition-colors p-2 rounded-lg hover:bg-orange-500/10">
              <Cpu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;