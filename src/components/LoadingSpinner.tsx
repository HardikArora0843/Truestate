import React from 'react';
import { Brain, Zap } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Processing...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative mb-8">
        <div className="w-24 h-24 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
        
        <div className="absolute inset-2 w-20 h-20 border-2 border-yellow-500/50 border-b-yellow-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <Brain className="w-8 h-8 text-orange-400 animate-pulse" />
        </div>
        
        <div className="absolute -inset-4 w-32 h-32 border border-orange-500/20 rounded-full animate-ping"></div>
      </div>
      
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center space-x-2">
          <Zap className="w-6 h-6 text-orange-400" />
          <span className="holographic">Neural Processing</span>
        </h3>
        <p className="text-orange-400 text-lg font-medium mb-4">{message}</p>
        <div className="text-sm text-gray-400 max-w-md">
          Analyzing multi-dimensional lifestyle vectors against comprehensive neighborhood data matrices...
        </div>
      </div>
      
      <div className="mt-8 flex space-x-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;