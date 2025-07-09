import { Neighborhood, DataSource } from '../types';

class DataService {
  private dataSources: DataSource[] = [
    {
      name: 'US Census Bureau',
      reliability: 0.95,
      lastUpdated: new Date('2023-01-01'),
      coverage: ['demographics', 'housing']
    },
    {
      name: 'Walk Score API',
      reliability: 0.88,
      lastUpdated: new Date('2024-01-01'),
      coverage: ['walkability', 'transit']
    },
    {
      name: 'Crime Data Portal',
      reliability: 0.82,
      lastUpdated: new Date('2023-06-01'),
      coverage: ['safety']
    },
    {
      name: 'Local Business Directory',
      reliability: 0.75,
      lastUpdated: new Date('2023-09-01'),
      coverage: ['dining', 'nightlife', 'culture']
    }
  ];

  private sampleNeighborhoods: Neighborhood[] = [
    {
      id: 'soma-sf',
      name: 'SoMa',
      city: 'San Francisco',
      state: 'CA',
      coordinates: { lat: 37.7749, lng: -122.4194 },
      scores: {
        walkability: 9,
        transit: 8,
        safety: 6,
        nightlife: 8,
        familyFriendly: 4,
        culture: 9,
        outdoors: 6,
        dining: 9,
        cost: 2
      },
      demographics: {
        medianAge: 35,
        medianIncome: 120000,
        population: 45000,
        density: 18500
      },
      amenities: ['Tech Companies', 'Museums', 'Restaurants', 'Nightlife', 'Public Transit'],
      description: 'Dynamic urban neighborhood with tech companies, modern dining, and cultural attractions.',
      imageUrl: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=800',
      dataQuality: 0.92
    },
    {
      id: 'brooklyn-heights',
      name: 'Brooklyn Heights',
      city: 'Brooklyn',
      state: 'NY',
      coordinates: { lat: 40.6958, lng: -73.9959 },
      scores: {
        walkability: 8,
        transit: 9,
        safety: 8,
        nightlife: 6,
        familyFriendly: 9,
        culture: 8,
        outdoors: 7,
        dining: 8,
        cost: 3
      },
      demographics: {
        medianAge: 42,
        medianIncome: 95000,
        population: 25000,
        density: 12000
      },
      amenities: ['Historic Architecture', 'Promenade', 'Family Parks', 'Fine Dining', 'Schools'],
      description: 'Historic neighborhood with stunning Manhattan views and family-friendly atmosphere.',
      imageUrl: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800',
      dataQuality: 0.89
    },
    {
      id: 'capitol-hill-seattle',
      name: 'Capitol Hill',
      city: 'Seattle',
      state: 'WA',
      coordinates: { lat: 47.6205, lng: -122.3212 },
      scores: {
        walkability: 9,
        transit: 7,
        safety: 7,
        nightlife: 9,
        familyFriendly: 5,
        culture: 9,
        outdoors: 8,
        dining: 8,
        cost: 5
      },
      demographics: {
        medianAge: 30,
        medianIncome: 75000,
        population: 30000,
        density: 15000
      },
      amenities: ['Art Scene', 'Coffee Culture', 'Music Venues', 'Parks', 'LGBTQ+ Friendly'],
      description: 'Vibrant arts district with eclectic dining, music venues, and creative community.',
      imageUrl: 'https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg?auto=compress&cs=tinysrgb&w=800',
      dataQuality: 0.87
    },
    {
      id: 'pearl-portland',
      name: 'Pearl District',
      city: 'Portland',
      state: 'OR',
      coordinates: { lat: 45.5236, lng: -122.6851 },
      scores: {
        walkability: 8,
        transit: 7,
        safety: 8,
        nightlife: 7,
        familyFriendly: 6,
        culture: 8,
        outdoors: 9,
        dining: 8,
        cost: 6
      },
      demographics: {
        medianAge: 38,
        medianIncome: 68000,
        population: 15000,
        density: 8000
      },
      amenities: ['Art Galleries', 'Breweries', 'Farmers Markets', 'Bike Lanes', 'Green Spaces'],
      description: 'Converted warehouse district with art galleries, breweries, and sustainable living focus.',
      imageUrl: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800',
      dataQuality: 0.85
    },
    {
      id: 'riverside-austin',
      name: 'East Riverside',
      city: 'Austin',
      state: 'TX',
      coordinates: { lat: 30.2465, lng: -97.7325 },
      scores: {
        walkability: 6,
        transit: 5,
        safety: 7,
        nightlife: 8,
        familyFriendly: 6,
        culture: 7,
        outdoors: 8,
        dining: 8,
        cost: 7
      },
      demographics: {
        medianAge: 32,
        medianIncome: 55000,
        population: 20000,
        density: 6000
      },
      amenities: ['Live Music', 'Food Trucks', 'Lady Bird Lake', 'Tech Scene', 'Affordability'],
      description: 'Emerging neighborhood with music venues, outdoor recreation, and growing tech presence.',
      imageUrl: 'https://images.pexels.com/photos/1560932/pexels-photo-1560932.jpeg?auto=compress&cs=tinysrgb&w=800',
      dataQuality: 0.83
    },
    {
      id: 'highlands-denver',
      name: 'Highlands',
      city: 'Denver',
      state: 'CO',
      coordinates: { lat: 39.7596, lng: -105.0178 },
      scores: {
        walkability: 7,
        transit: 6,
        safety: 8,
        nightlife: 7,
        familyFriendly: 8,
        culture: 7,
        outdoors: 10,
        dining: 7,
        cost: 6
      },
      demographics: {
        medianAge: 34,
        medianIncome: 72000,
        population: 18000,
        density: 7500
      },
      amenities: ['Mountain Views', 'Outdoor Recreation', 'Craft Breweries', 'Farmers Markets', 'Dog Parks'],
      description: 'Historic neighborhood with mountain access, outdoor culture, and family-friendly atmosphere.',
      imageUrl: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=800',
      dataQuality: 0.81
    }
  ];

  async getNeighborhoods(): Promise<Neighborhood[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return this.sampleNeighborhoods.map(neighborhood => ({
      ...neighborhood,
      scores: {
        ...neighborhood.scores,
        walkability: Math.min(10, Math.max(1, neighborhood.scores.walkability + (Math.random() - 0.5) * 0.5)),
        transit: Math.min(10, Math.max(1, neighborhood.scores.transit + (Math.random() - 0.5) * 0.5)),
        safety: Math.min(10, Math.max(1, neighborhood.scores.safety + (Math.random() - 0.5) * 0.5)),
      }
    }));
  }

  async getNeighborhoodById(id: string): Promise<Neighborhood | null> {
    const neighborhoods = await this.getNeighborhoods();
    return neighborhoods.find(n => n.id === id) || null;
  }

  getDataSources(): DataSource[] {
    return this.dataSources;
  }

  async enrichNeighborhoodData(neighborhood: Neighborhood): Promise<Neighborhood> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const availableSources = this.dataSources.filter(source => 
      source.coverage.some(category => Object.keys(neighborhood.scores).includes(category))
    );
    
    const avgReliability = availableSources.reduce((sum, source) => sum + source.reliability, 0) / availableSources.length;
    
    return {
      ...neighborhood,
      dataQuality: Math.min(1, avgReliability * 0.95) 
    };
  }

  async validateDataConsistency(neighborhoods: Neighborhood[]): Promise<{
    valid: boolean;
    issues: string[];
    confidence: number;
  }> {
    const issues: string[] = [];
    let totalConfidence = 0;

    for (const neighborhood of neighborhoods) {
      if (neighborhood.dataQuality < 0.8) {
        issues.push(`${neighborhood.name}: Low data quality (${Math.round(neighborhood.dataQuality * 100)}%)`);
      }

      if (neighborhood.scores.cost > 7 && neighborhood.demographics.medianIncome > 100000) {
        issues.push(`${neighborhood.name}: High affordability score but high median income - potential data inconsistency`);
      }

      if (neighborhood.scores.familyFriendly > 8 && neighborhood.demographics.medianAge < 25) {
        issues.push(`${neighborhood.name}: High family-friendly score but low median age - verify demographics`);
      }

      totalConfidence += neighborhood.dataQuality;
    }

    return {
      valid: issues.length === 0,
      issues,
      confidence: totalConfidence / neighborhoods.length
    };
  }
}

export const dataService = new DataService();