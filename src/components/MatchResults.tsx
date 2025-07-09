import React, { useState } from 'react';
import { MatchResult } from '../types';
import { MapPin, Star, TrendingUp, AlertCircle, Eye, DollarSign, Navigation, Shield, Zap, Target } from 'lucide-react';

interface MatchResultsProps {
  results: MatchResult[];
  onViewDetails: (result: MatchResult) => void;
}

const MatchResults: React.FC<MatchResultsProps> = ({ results, onViewDetails }) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  if (results.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
          <AlertCircle className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">No Neural Matches Found</h3>
        <p className="text-gray-400 text-lg">Recalibrate your parameters or expand your search matrix to discover compatible neighborhoods.</p>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'from-green-500 to-emerald-500';
    if (score >= 0.6) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-400';
    if (confidence >= 0.6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center neon-glow">
            <Target className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-4xl font-bold mb-4">
          <span className="holographic">Neural Match Results</span>
        </h2>
        <p className="text-gray-400 text-lg">Discovered {results.length} neighborhoods with quantum compatibility</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {results.map((result, index) => {
          const isExpanded = expandedCard === result.neighborhood.id;
          const topFactors = Object.entries(result.breakdown)
            .filter(([key]) => key !== 'budget')
            .sort((a, b) => b[1].impact - a[1].impact)
            .slice(0, 3);

          return (
            <div
              key={result.neighborhood.id}
              className={`glass-card cyber-card rounded-2xl overflow-hidden transition-all duration-500 ${
                isExpanded ? 'ring-2 ring-orange-500 neon-glow' : ''
              }`}
            >
              <div className="relative h-48 bg-gradient-to-br from-orange-500 to-yellow-500">
                {result.neighborhood.imageUrl && (
                  <img
                    src={result.neighborhood.imageUrl}
                    alt={result.neighborhood.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full px-4 py-2 flex items-center space-x-2 neon-glow">
                  <span className="text-sm font-bold text-white">#{index + 1}</span>
                  <Star className="w-4 h-4 text-white fill-current" />
                </div>
                
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className={`text-sm font-bold bg-gradient-to-r ${getScoreColor(result.score)} bg-clip-text text-transparent`}>
                    {Math.round(result.score * 100)}%
                  </span>
                </div>
                
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-orange-400" />
                    <span className="text-white text-sm font-medium">Neural Match</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {result.neighborhood.name}
                  </h3>
                  <div className="flex items-center text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{result.neighborhood.city}, {result.neighborhood.state}</span>
                  </div>
                </div>

                <div className="mb-6 p-4 bg-darker rounded-xl border border-orange-500/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-300">Compatibility Index</span>
                    <span className={`text-sm font-bold bg-gradient-to-r ${getScoreColor(result.score)} bg-clip-text text-transparent`}>
                      {Math.round(result.score * 100)}%
                    </span>
                  </div>
                  <div className="neon-progress h-3 rounded-full">
                    <div
                      className={`neon-progress-fill bg-gradient-to-r ${getScoreColor(result.score)}`}
                      style={{ width: `${result.score * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">Neural Confidence</span>
                    <span className={`text-xs font-medium ${getConfidenceColor(result.confidence)}`}>
                      {Math.round(result.confidence * 100)}%
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-orange-400 mb-3">Top Neural Matches</h4>
                  <div className="space-y-2">
                    {topFactors.map(([factor, data]) => (
                      <div key={factor} className="flex items-center justify-between text-sm">
                        <span className="text-gray-300 capitalize">{factor.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className={`font-medium bg-gradient-to-r ${getScoreColor(data.score)} bg-clip-text text-transparent`}>
                          {Math.round(data.score * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">
                      ${(result.neighborhood.demographics.medianIncome / 1000).toFixed(0)}k median
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Navigation className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">
                      {result.neighborhood.scores.walkability}/10 walkable
                    </span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-orange-500/20 space-y-6">
                    {result.reasons.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-green-400 mb-3 flex items-center">
                          <Zap className="w-4 h-4 mr-2" />
                          Neural Compatibility Factors:
                        </h5>
                        <ul className="text-sm text-gray-300 space-y-2">
                          {result.reasons.map((reason, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-green-400 mr-2 mt-1">▶</span>
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.concerns.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-yellow-400 mb-3 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Neural Considerations:
                        </h5>
                        <ul className="text-sm text-gray-300 space-y-2">
                          {result.concerns.map((concern, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-yellow-400 mr-2 mt-1">⚠</span>
                              {concern}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <h5 className="text-sm font-medium text-orange-400 mb-3">Neural Infrastructure:</h5>
                      <div className="flex flex-wrap gap-2">
                        {result.neighborhood.amenities.slice(0, 4).map((amenity, i) => (
                          <span
                            key={i}
                            className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 text-orange-300 text-xs px-3 py-1 rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => setExpandedCard(isExpanded ? null : result.neighborhood.id)}
                    className="flex-1 bg-darker hover:bg-lighter border border-orange-500/30 hover:border-orange-500/60 text-gray-300 hover:text-white py-3 px-4 rounded-lg transition-all duration-200 text-sm font-medium"
                  >
                    {isExpanded ? 'Collapse Analysis' : 'Expand Analysis'}
                  </button>
                  <button
                    onClick={() => onViewDetails(result)}
                    className="flex-1 cyber-button py-3 px-4 rounded-lg transition-all duration-200 text-sm font-medium text-white flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Neural Deep Dive</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-card rounded-2xl p-6 border border-yellow-500/30">
        <div className="flex items-start">
          <AlertCircle className="w-6 h-6 text-yellow-400 mr-4 mt-1 flex-shrink-0" />
          <div>
            <h4 className="text-lg font-medium text-yellow-400 mb-2">Neural Data Integrity Notice</h4>
            <p className="text-gray-300 leading-relaxed">
              Neural matches are computed using advanced algorithms with multi-source data validation. 
              Results represent statistical compatibility and should be verified through physical reconnaissance 
              and additional neural network analysis for optimal decision-making.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchResults;