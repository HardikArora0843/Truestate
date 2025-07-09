import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UserProfileForm from './components/UserProfileForm';
import MatchResults from './components/MatchResults';
import NeighborhoodDetail from './components/NeighborhoodDetail';
import LoadingSpinner from './components/LoadingSpinner';
import { UserProfile, MatchResult, Neighborhood } from './types';
import { dataService } from './services/dataService';
import { matchingService } from './services/matchingService';
import { Brain, Database, Zap, Target, Cpu, Network, BarChart3 } from 'lucide-react';

type ViewState = 'welcome' | 'profile' | 'loading' | 'results' | 'detail';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('welcome');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<MatchResult | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('');

  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 10 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 20000);
    };

    const interval = setInterval(createParticle, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleStartMatching = () => {
    setCurrentView('profile');
  };

  const handleProfileSubmit = async (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentView('loading');
    
    try {
      setLoadingMessage('Initializing neural networks...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLoadingMessage('Scanning neighborhood data matrix...');
      const neighborhoods = await dataService.getNeighborhoods();
      
      setLoadingMessage('Running quantum compatibility analysis...');
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setLoadingMessage('Processing algorithmic matches...');
      const results = await matchingService.findMatches(profile, neighborhoods);
      
      setLoadingMessage('Calibrating confidence scores...');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setMatchResults(results);
      setCurrentView('results');
    } catch (error) {
      console.error('Error finding matches:', error);
      setCurrentView('profile');
    }
  };

  const handleViewDetails = (result: MatchResult) => {
    setSelectedResult(result);
    setCurrentView('detail');
  };

  const handleBackToResults = () => {
    setCurrentView('results');
    setSelectedResult(null);
  };

  const handleBackToProfile = () => {
    setCurrentView('profile');
    setMatchResults([]);
  };

  const renderWelcome = () => (
    <div className="min-h-screen gradient-bg cyber-grid">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <div className="relative float-animation">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center neon-glow">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-400 rounded-full animate-ping"></div>
            </div>
          </div>
          
          <h1 className="text-6xl font-bold mb-6">
            <span className="holographic">Neural Neighborhood</span>
            <br />
            <span className="neon-text text-white">Discovery Engine</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed">
            Advanced AI-powered lifestyle matching using quantum algorithms and multi-dimensional 
            data analysis. Discover neighborhoods that resonate with your digital DNA.
          </p>
          
          <button
            onClick={handleStartMatching}
            className="cyber-button px-12 py-4 rounded-xl font-bold text-lg text-white shadow-2xl transform transition-all duration-300"
          >
            <span className="flex items-center space-x-3">
              <Zap className="w-6 h-6" />
              <span>Initialize Neural Scan</span>
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="glass-card cyber-card p-8 rounded-2xl text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Quantum Matching</h3>
            <p className="text-gray-400">Multi-dimensional lifestyle analysis with neural network precision</p>
          </div>
          
          <div className="glass-card cyber-card p-8 rounded-2xl text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center">
              <Database className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Real-Time Data</h3>
            <p className="text-gray-400">Live neighborhood intelligence from multiple data streams</p>
          </div>
          
          <div className="glass-card cyber-card p-8 rounded-2xl text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Confidence AI</h3>
            <p className="text-gray-400">Transparent reliability scoring with predictive analytics</p>
          </div>
          
          <div className="glass-card cyber-card p-8 rounded-2xl text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
              <Network className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Deep Analysis</h3>
            <p className="text-gray-400">Comprehensive neighborhood profiling with behavioral insights</p>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-12 mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="holographic">Neural Processing Pipeline</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center relative">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center neon-glow">
                <span className="text-2xl font-bold text-white">01</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Lifestyle Mapping</h3>
              <p className="text-gray-400">Advanced preference analysis with priority weighting algorithms</p>
              <div className="absolute top-10 -right-6 hidden md:block">
                <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></div>
              </div>
            </div>
            
            <div className="text-center relative">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center neon-glow">
                <span className="text-2xl font-bold text-white">02</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Quantum Analysis</h3>
              <p className="text-gray-400">Multi-source data fusion with real-time compatibility scoring</p>
              <div className="absolute top-10 -right-6 hidden md:block">
                <div className="w-12 h-0.5 bg-gradient-to-r from-teal-500 to-transparent"></div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center neon-glow">
                <span className="text-2xl font-bold text-white">03</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Neural Results</h3>
              <p className="text-gray-400">Ranked matches with confidence metrics and predictive insights</p>
            </div>
          </div>
        </div>

        <div className="gradient-border">
          <div className="gradient-border-content p-12 rounded-xl">
            <h2 className="text-4xl font-bold text-center mb-8">
              <span className="holographic">The Neighborhood Paradox</span>
            </h2>
            <div className="max-w-5xl mx-auto">
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Traditional neighborhood selection operates on primitive heuristics—proximity to work, 
                price points, superficial amenities. This antiquated approach fails to capture the 
                complex interplay between individual lifestyle patterns and neighborhood ecosystems.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                NeighborFit revolutionizes this process through advanced neural matching algorithms 
                that analyze multi-dimensional lifestyle vectors against comprehensive neighborhood 
                data matrices, delivering precision-matched results with quantified confidence metrics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'welcome':
        return renderWelcome();
      case 'profile':
        return (
          <div className="min-h-screen gradient-bg cyber-grid py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <UserProfileForm onProfileSubmit={handleProfileSubmit} />
            </div>
          </div>
        );
      case 'loading':
        return (
          <div className="min-h-screen gradient-bg cyber-grid py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <LoadingSpinner message={loadingMessage} />
            </div>
          </div>
        );
      case 'results':
        return (
          <div className="min-h-screen gradient-bg cyber-grid py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-6">
                <button
                  onClick={handleBackToProfile}
                  className="text-orange-400 hover:text-orange-300 transition-colors flex items-center space-x-2"
                >
                  <span>←</span>
                  <span>Back to Neural Profile</span>
                </button>
              </div>
              <MatchResults results={matchResults} onViewDetails={handleViewDetails} />
            </div>
          </div>
        );
      case 'detail':
        return (
          <div className="min-h-screen gradient-bg cyber-grid py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {selectedResult && (
                <NeighborhoodDetail
                  result={selectedResult}
                  onBack={handleBackToResults}
                />
              )}
            </div>
          </div>
        );
      default:
        return renderWelcome();
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      {currentView !== 'welcome' && <Header />}
      {renderContent()}
    </div>
  );
}

export default App;