
export interface Asset {
  name: string;
  ticker: string;
  type: 'stock' | 'fii' | 'bond' | 'crypto' | 'etf';
  percentage: number;
  sector?: string;
}

export interface PortfolioData {
  assets: Asset[];
  goal: 'growth' | 'income' | 'inflation-protection' | 'retirement' | 'financial-independence' | 'wealth-preservation';
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
}

export interface AnalysisResult {
  portfolioType: string;
  riskLevel: string;
  diversificationScore: number;
  recommendations: string[];
  allocation: {
    stocks: number;
    fiis: number;
    bonds: number;
    international: number;
  };
  sectors: Array<{
    name: string;
    value: number;
  }>;
  performance: {
    expectedReturn: number;
    volatility: number;
    sharpeRatio: number;
  };
}
