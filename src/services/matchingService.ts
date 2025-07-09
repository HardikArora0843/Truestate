import { UserProfile, Neighborhood, MatchResult, MatchingConfig } from '../types';

class MatchingService {
  private config: MatchingConfig = {
    weights: {
      walkability: 1.0,
      transit: 1.0,
      safety: 1.2,
      nightlife: 0.8,
      familyFriendly: 1.0,
      culture: 0.9,
      outdoors: 0.9,
      dining: 0.8,
      cost: 1.3 
    },
    thresholds: {
      minScore: 0.4,
      minConfidence: 0.6,
      maxResults: 8
    },
    penalties: {
      incompleteData: 0.1,
      outdatedData: 0.05,
      lowReliability: 0.08
    }
  };

  calculateMatch(user: UserProfile, neighborhood: Neighborhood): MatchResult {
    const breakdown: { [key: string]: { score: number; weight: number; impact: number } } = {};
    let totalScore = 0;
    let totalWeight = 0;

    Object.keys(user.lifestyle).forEach(factor => {
      const userPreference = user.lifestyle[factor as keyof typeof user.lifestyle];
      const neighborhoodScore = neighborhood.scores[factor as keyof typeof neighborhood.scores];
      const weight = this.config.weights[factor] || 1.0;

      const priorityBonus = user.priorities.includes(factor) ? 0.3 : 0;
      const finalWeight = weight * (1 + priorityBonus);

      const compatibility = 1 - Math.abs(userPreference - neighborhoodScore) / 10;
      const weightedScore = compatibility * finalWeight;

      breakdown[factor] = {
        score: compatibility,
        weight: finalWeight,
        impact: weightedScore
      };

      totalScore += weightedScore;
      totalWeight += finalWeight;
    });

    const budgetCompatibility = this.calculateBudgetCompatibility(user, neighborhood);
    breakdown.budget = {
      score: budgetCompatibility,
      weight: 1.5,
      impact: budgetCompatibility * 1.5
    };
    totalScore += budgetCompatibility * 1.5;
    totalWeight += 1.5;

    let normalizedScore = totalScore / totalWeight;

    const dataQualityPenalty = (1 - neighborhood.dataQuality) * this.config.penalties.incompleteData;
    normalizedScore = Math.max(0, normalizedScore - dataQualityPenalty);

    const confidence = this.calculateConfidence(neighborhood, normalizedScore, breakdown);

    const { reasons, concerns } = this.generateInsights(user, neighborhood, breakdown);

    return {
      neighborhood,
      score: normalizedScore,
      confidence,
      reasons,
      concerns,
      breakdown
    };
  }

  private calculateBudgetCompatibility(user: UserProfile, neighborhood: Neighborhood): number {
    const estimatedRent = this.estimateRent(neighborhood);
    const userBudgetMid = (user.budget.min + user.budget.max) / 2;

    if (estimatedRent <= user.budget.max && estimatedRent >= user.budget.min) {
      return 1.0; 
    } else if (estimatedRent < user.budget.min) {
      return 0.8; 
    } else {
      const overBudget = estimatedRent - user.budget.max;
      const budgetFlexibility = user.budget.max - user.budget.min;
      const penalty = Math.min(1, overBudget / budgetFlexibility);
      return Math.max(0, 1 - penalty);
    }
  }

  private estimateRent(neighborhood: Neighborhood): number {
    const baseCost = 2000; 
    const costMultiplier = (11 - neighborhood.scores.cost) / 10; 
    const incomeMultiplier = neighborhood.demographics.medianIncome / 60000; 
    return baseCost * costMultiplier * incomeMultiplier;
  }

  private calculateConfidence(neighborhood: Neighborhood, score: number, breakdown: any): number {
    let confidence = neighborhood.dataQuality;

    const scores = Object.values(breakdown).map(b => b.score);
    const variance = this.calculateVariance(scores);
    const consistencyBonus = Math.max(0, 0.2 - variance); 
    confidence += consistencyBonus;

    if (score > 0.95 || score < 0.1) {
      confidence *= 0.9;
    }

    return Math.min(1, Math.max(0, confidence));
  }

  private calculateVariance(scores: number[]): number {
    const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const squaredDiffs = scores.map(score => Math.pow(score - mean, 2));
    return squaredDiffs.reduce((sum, diff) => sum + diff, 0) / scores.length;
  }

  private generateInsights(user: UserProfile, neighborhood: Neighborhood, breakdown: any): {
    reasons: string[];
    concerns: string[];
  } {
    const reasons: string[] = [];
    const concerns: string[] = [];

    const sortedFactors = Object.entries(breakdown)
      .sort((a, b) => b[1].impact - a[1].impact)
      .slice(0, 3);

    sortedFactors.forEach(([factor, data]) => {
      if (data.score > 0.8) {
        reasons.push(this.getPositiveInsight(factor, neighborhood));
      }
    });

    Object.entries(breakdown).forEach(([factor, data]) => {
      if (data.score < 0.4 && user.priorities.includes(factor)) {
        concerns.push(this.getNegativeInsight(factor, neighborhood));
      }
    });

    if (breakdown.budget.score < 0.6) {
      concerns.push(`Housing costs may exceed your budget range of $${user.budget.min.toLocaleString()}-$${user.budget.max.toLocaleString()}`);
    }

    if (neighborhood.dataQuality < 0.8) {
      concerns.push(`Limited data available for this neighborhood (${Math.round(neighborhood.dataQuality * 100)}% complete)`);
    }

    return { reasons, concerns };
  }

  private getPositiveInsight(factor: string, neighborhood: Neighborhood): string {
    const insights: { [key: string]: string } = {
      walkability: `Excellent walkability with easy access to daily amenities`,
      transit: `Strong public transportation connections`,
      safety: `Well-regarded safety record and community security`,
      nightlife: `Vibrant nightlife and entertainment options`,
      familyFriendly: `Family-oriented community with good schools and parks`,
      culture: `Rich cultural scene with arts, museums, and events`,
      outdoors: `Great outdoor recreation and green spaces`,
      dining: `Diverse and high-quality dining options`,
      cost: `Affordable housing options within your budget`,
      budget: `Housing costs align well with your budget range`
    };

    return insights[factor] || `Strong ${factor} rating`;
  }

  private getNegativeInsight(factor: string, neighborhood: Neighborhood): string {
    const insights: { [key: string]: string } = {
      walkability: `Limited walkability - may require car for daily errands`,
      transit: `Public transportation options are limited`,
      safety: `Safety concerns based on available data`,
      nightlife: `Limited nightlife and entertainment options`,
      familyFriendly: `May not be ideal for families with children`,
      culture: `Limited cultural amenities and activities`,
      outdoors: `Few outdoor recreation opportunities`,
      dining: `Limited dining variety and quality`,
      cost: `Higher cost of living than typical preferences`,
      budget: `Housing costs may strain your budget`
    };

    return insights[factor] || `Concerns about ${factor} rating`;
  }

  async findMatches(user: UserProfile, neighborhoods: Neighborhood[]): Promise<MatchResult[]> {
    const results = neighborhoods.map(neighborhood => this.calculateMatch(user, neighborhood));
    
    const filtered = results.filter(result => 
      result.score >= this.config.thresholds.minScore &&
      result.confidence >= this.config.thresholds.minConfidence
    );

    const sorted = filtered.sort((a, b) => {
      const aWeighted = a.score * 0.7 + a.confidence * 0.3;
      const bWeighted = b.score * 0.7 + b.confidence * 0.3;
      return bWeighted - aWeighted;
    });

    return sorted.slice(0, this.config.thresholds.maxResults);
  }

  updateMatchingConfig(updates: Partial<MatchingConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  getMatchingConfig(): MatchingConfig {
    return { ...this.config };
  }
}

export const matchingService = new MatchingService();