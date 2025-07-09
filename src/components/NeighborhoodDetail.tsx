import React from 'react';
import { MatchResult } from '../types';
import { 
  MapPin, 
  Users, 
  DollarSign, 
  TrendingUp, 
  ArrowLeft, 
  Star,
  Navigation,
  Shield,
  Heart,
  Car,
  Palette,
  Mountain,
  Utensils,
  Home,
  Zap,
  Brain,
  Target
} from 'lucide-react';

interface NeighborhoodDetailProps {
  result: MatchResult;
  onBack: () => void;
}

const factorIcons: { [key: string]: React.ComponentType<any> } = {
  walkability: Car,
  transit: Navigation,
  safety: Shield,
  nightlife: Heart,
  familyFriendly: Users,
  culture: Palette,
  outdoors: Mountain,
  dining: Utensils,
  cost: DollarSign,
  budget: Home
};

const NeighborhoodDetail: React.FC<NeighborhoodDetailProps> = ({ result, onBack }) => {
  const { neighborhood, score, confidence, reasons, concerns, breakdown } = result;

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'from-green-500 to-emerald-500';
    if (score >= 0.6) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getBarColor = (score: number) => {
    if (score >= 0.8) return 'from-green-500 to-emerald-500';
    if (score >= 0.6) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const sortedFactors = Object.entries(breakdown)
    .sort((a, b) => b[1].impact - a[1].impact);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-orange-400 hover:text-orange-300 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Neural Results
        </button>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden mb-8 neon-glow">
        <div className="relative h-80 bg-gradient-to-br from-orange-500 to-yellow-500">
          {neighborhood.imageUrl && (
            <img
              src={neighborhood.imageUrl}
              alt={neighborhood.name}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute inset-0 cyber-grid opacity-20"></div>
          
          <div className="absolute bottom-8 left-8 text-white">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center neon-glow">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold mb-2 neon-text">{neighborhood.name}</h1>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-xl">{neighborhood.city}, {neighborhood.state}</span>
                  </div>
                  <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-full px-6 py-3">
                    <Target className="w-5 h-5 mr-2 text-orange-400" />
                    <span className="text-xl font-bold">{Math.round(score * 100)}% Neural Match</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="gradient-border">
              <div className="gradient-border-content p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-center">
                  <Zap className="w-6 h-6 mr-2 text-orange-400" />
                  Neural Compatibility
                </h3>
                <div className="text-4xl font-bold mb-4">
                  <span className={`bg-gradient-to-r ${getScoreColor(score)} bg-clip-text text-transparent`}>
                    {Math.round(score * 100)}%
                  </span>
                </div>
                <div className="neon-progress h-4 rounded-full mb-4">
                  <div
                    className={`neon-progress-fill bg-gradient-to-r ${getScoreColor(score)}`}
                    style={{ width: `${score * 100}%` }}
                  />
                </div>
                <div className="text-sm text-gray-400">
                  Confidence: <span className={`font-medium ${confidence >= 0.8 ? 'text-green-400' : confidence >= 0.6 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {Math.round(confidence * 100)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-orange-500/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Users className="w-6 h-6 mr-2 text-orange-400" />
                Population Matrix
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Median Age</span>
                  <span className="font-bold text-white">{neighborhood.demographics.medianAge}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Median Income</span>
                  <span className="font-bold text-white">${neighborhood.demographics.medianIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Population</span>
                  <span className="font-bold text-white">{neighborhood.demographics.population.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Density</span>
                  <span className="font-bold text-white">{neighborhood.demographics.density.toLocaleString()}/sq mi</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-green-500/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-green-400" />
                Data Integrity
              </h3>
              <div className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  {Math.round(neighborhood.dataQuality * 100)}%
                </span>
              </div>
              <div className="neon-progress h-4 rounded-full mb-4">
                <div
                  className="neon-progress-fill bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{ width: `${neighborhood.dataQuality * 100}%` }}
                />
              </div>
              <div className="text-sm text-gray-400">
                Neural network reliability and data completeness assessment
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Brain className="w-6 h-6 mr-3 text-orange-400" />
              Neural Neighborhood Profile
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">{neighborhood.description}</p>
          </div>

          <div className="mb-10">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Star className="w-6 h-6 mr-3 text-orange-400" />
              Neural Infrastructure Matrix
            </h3>
            <div className="flex flex-wrap gap-4">
              {neighborhood.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/40 text-orange-300 px-6 py-3 rounded-full text-sm font-medium hover:border-orange-500/80 transition-colors"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card rounded-2xl p-8 border border-orange-500/20">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
            <Zap className="w-6 h-6 mr-3 text-orange-400" />
            Neural Factor Analysis
          </h3>
          <div className="space-y-6">
            {sortedFactors.map(([factor, data]) => {
              const Icon = factorIcons[factor] || Star;
              const factorLabel = factor === 'familyFriendly' ? 'Family-Friendly' : 
                                factor.replace(/([A-Z])/g, ' $1').trim();
              
              return (
                <div key={factor} className="border-b border-orange-500/20 pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center mr-4">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-white capitalize text-lg">{factorLabel}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-lg font-bold bg-gradient-to-r ${getScoreColor(data.score)} bg-clip-text text-transparent`}>
                        {Math.round(data.score * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="neon-progress h-3 rounded-full">
                        <div
                          className={`neon-progress-fill bg-gradient-to-r ${getBarColor(data.score)}`}
                          style={{ width: `${data.score * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-gray-400 min-w-[80px]">
                      Weight: {data.weight.toFixed(1)}x
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-8">
          {reasons.length > 0 && (
            <div className="glass-card rounded-2xl p-8 border border-green-500/20">
              <h3 className="text-2xl font-bold text-green-400 mb-6 flex items-center">
                <Zap className="w-6 h-6 mr-3" />
                Neural Compatibility Matrix
              </h3>
              <ul className="space-y-4">
                {reasons.map((reason, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-3 mr-4 flex-shrink-0" />
                    <span className="text-gray-300 leading-relaxed">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {concerns.length > 0 && (
            <div className="glass-card rounded-2xl p-8 border border-yellow-500/20">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
                <Brain className="w-6 h-6 mr-3" />
                Neural Considerations
              </h3>
              <ul className="space-y-4">
                {concerns.map((concern, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3 mr-4 flex-shrink-0" />
                    <span className="text-gray-300 leading-relaxed">{concern}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="glass-card rounded-2xl p-8 border border-orange-500/20">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-orange-400" />
              Neural Algorithm Methodology
            </h3>
            <div className="text-sm text-gray-300 space-y-3 leading-relaxed">
              <p>• Neural compatibility computed using multi-dimensional lifestyle vectors</p>
              <p>• Priority factors receive enhanced weighting in the neural network</p>
              <p>• Economic compatibility integrated with lifestyle preference analysis</p>
              <p>• Data integrity affects neural confidence scoring algorithms</p>
              <p>• Results validated through cross-referenced neural network verification</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeighborhoodDetail;