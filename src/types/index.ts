export interface UserProfile {
  id: string;
  name: string;
  age: number;
  budget: {
    min: number;
    max: number;
  };
  lifestyle: {
    walkability: number;
    transit: number;
    nightlife: number;
    safety: number;
    familyFriendly: number;
    culture: number;
    outdoors: number;
    dining: number;
    cost: number; 
  };
  priorities: string[]; 
  currentLocation?: {
    lat: number;
    lng: number;
  };
}

export interface Neighborhood {
  id: string;
  name: string;
  city: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  scores: {
    walkability: number;
    transit: number;
    safety: number;
    nightlife: number;
    familyFriendly: number;
    culture: number;
    outdoors: number;
    dining: number;
    cost: number; 
  };
  demographics: {
    medianAge: number;
    medianIncome: number;
    population: number;
    density: number;
  };
  amenities: string[];
  description: string;
  imageUrl?: string;
  dataQuality: number; 
}

export interface MatchResult {
  neighborhood: Neighborhood;
  score: number;
  confidence: number;
  reasons: string[];
  concerns: string[];
  breakdown: {
    [key: string]: {
      score: number;
      weight: number;
      impact: number;
    };
  };
}

export interface DataSource {
  name: string;
  reliability: number;
  lastUpdated: Date;
  coverage: string[];
}

export interface MatchingConfig {
  weights: {
    [key: string]: number;
  };
  thresholds: {
    minScore: number;
    minConfidence: number;
    maxResults: number;
  };
  penalties: {
    incompleteData: number;
    outdatedData: number;
    lowReliability: number;
  };
}