import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, DollarSign, Zap, Car, Shield, Users, Palette, Mountain, Utensils, Navigation, Heart } from 'lucide-react';

interface UserProfileFormProps {
  onProfileSubmit: (profile: UserProfile) => void;
  isLoading?: boolean;
}

const lifestyleFactors = [
  { key: 'walkability', label: 'Walkability Matrix', icon: Car, description: 'Neural pathways to daily amenities', color: 'from-blue-500 to-cyan-500' },
  { key: 'transit', label: 'Transit Networks', icon: Navigation, description: 'Multi-modal transportation access', color: 'from-green-500 to-teal-500' },
  { key: 'safety', label: 'Security Index', icon: Shield, description: 'Threat assessment and safety protocols', color: 'from-red-500 to-pink-500' },
  { key: 'nightlife', label: 'Night Economy', icon: Heart, description: 'After-hours entertainment ecosystem', color: 'from-purple-500 to-indigo-500' },
  { key: 'familyFriendly', label: 'Family Optimization', icon: Users, description: 'Child-centric infrastructure analysis', color: 'from-yellow-500 to-orange-500' },
  { key: 'culture', label: 'Cultural Matrix', icon: Palette, description: 'Arts and intellectual stimulation density', color: 'from-pink-500 to-rose-500' },
  { key: 'outdoors', label: 'Nature Interface', icon: Mountain, description: 'Outdoor recreation and green space access', color: 'from-emerald-500 to-green-500' },
  { key: 'dining', label: 'Culinary Networks', icon: Utensils, description: 'Food quality and diversity algorithms', color: 'from-amber-500 to-yellow-500' },
  { key: 'cost', label: 'Economic Efficiency', icon: DollarSign, description: 'Cost optimization and value metrics', color: 'from-teal-500 to-cyan-500' }
];

const UserProfileForm: React.FC<UserProfileFormProps> = ({ onProfileSubmit, isLoading }) => {
  const [formData, setFormData] = useState<Omit<UserProfile, 'id'>>({
    name: '',
    age: 25,
    budget: { min: 1500, max: 3000 },
    lifestyle: {
      walkability: 5,
      transit: 5,
      safety: 8,
      nightlife: 5,
      familyFriendly: 5,
      culture: 5,
      outdoors: 5,
      dining: 5,
      cost: 7
    },
    priorities: []
  });

  const handleSliderChange = (factor: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      lifestyle: {
        ...prev.lifestyle,
        [factor]: value
      }
    }));
  };

  const handlePriorityToggle = (factor: string) => {
    setFormData(prev => ({
      ...prev,
      priorities: prev.priorities.includes(factor)
        ? prev.priorities.filter(p => p !== factor)
        : prev.priorities.length < 3
          ? [...prev.priorities, factor]
          : prev.priorities
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProfileSubmit({
      ...formData,
      id: Date.now().toString()
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center neon-glow">
            <User className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-4xl font-bold mb-4">
          <span className="holographic">Neural Profile Configuration</span>
        </h2>
        <p className="text-gray-400 text-lg">Initialize your lifestyle parameters for quantum neighborhood analysis</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="glass-card rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Zap className="w-6 h-6 mr-3 text-orange-400" />
            Identity Matrix
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Neural Identifier
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-darker border border-orange-500/30 rounded-lg focus-neon text-white placeholder-gray-500"
                placeholder="Enter your designation..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Age Vector</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                className="w-full px-4 py-3 bg-darker border border-orange-500/30 rounded-lg focus-neon text-white"
                min="18"
                max="100"
                required
              />
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <DollarSign className="w-6 h-6 mr-3 text-orange-400" />
            Economic Parameters
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Minimum Threshold</label>
              <input
                type="number"
                value={formData.budget.min}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  budget: { ...prev.budget, min: parseInt(e.target.value) } 
                }))}
                className="w-full px-4 py-3 bg-darker border border-orange-500/30 rounded-lg focus-neon text-white"
                min="500"
                step="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Maximum Allocation</label>
              <input
                type="number"
                value={formData.budget.max}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  budget: { ...prev.budget, max: parseInt(e.target.value) } 
                }))}
                className="w-full px-4 py-3 bg-darker border border-orange-500/30 rounded-lg focus-neon text-white"
                min="500"
                step="100"
              />
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
            <Zap className="w-6 h-6 mr-3 text-orange-400" />
            Lifestyle Neural Network
          </h3>
          
          <div className="space-y-8">
            {lifestyleFactors.map((factor) => {
              const Icon = factor.icon;
              const value = formData.lifestyle[factor.key as keyof typeof formData.lifestyle];
              const isPriority = formData.priorities.includes(factor.key);
              
              return (
                <div key={factor.key} className="gradient-border">
                  <div className="gradient-border-content p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${factor.color} flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg">{factor.label}</h4>
                          <p className="text-sm text-gray-400">{factor.description}</p>
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => handlePriorityToggle(factor.key)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          isPriority 
                            ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white neon-glow' 
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                        disabled={!isPriority && formData.priorities.length >= 3}
                      >
                        {isPriority ? 'PRIORITY' : 'SET PRIORITY'}
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <span className="text-sm text-gray-400 w-20">Minimal</span>
                      <div className="flex-1 relative">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={value}
                          onChange={(e) => handleSliderChange(factor.key, parseInt(e.target.value))}
                          className="neon-slider w-full h-2 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <span className="text-sm text-gray-400 w-20">Critical</span>
                      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold min-w-[3rem] text-center neon-glow">
                        {value}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {formData.priorities.length > 0 && (
          <div className="glass-card rounded-2xl p-6">
            <h4 className="font-bold text-orange-400 mb-4 text-lg">
              Neural Priorities ({formData.priorities.length}/3)
            </h4>
            <div className="flex flex-wrap gap-3">
              {formData.priorities.map(priority => {
                const factor = lifestyleFactors.find(f => f.key === priority);
                return (
                  <span key={priority} className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-medium neon-glow">
                    {factor?.label}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !formData.name.trim()}
          className="w-full cyber-button py-6 px-8 rounded-2xl font-bold text-xl text-white shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="flex items-center justify-center space-x-4">
            <Zap className="w-6 h-6" />
            <span>{isLoading ? 'Initializing Neural Scan...' : 'Execute Neighborhood Analysis'}</span>
          </span>
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;