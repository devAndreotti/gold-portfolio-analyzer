import { PortfolioData } from "@/types/portfolio";

export const portfolioExamples: { 
  name: string; 
  description: string; 
  data: PortfolioData;
  icon: string;
}[] = [
  {
    name: "Portfolio Conservador",
    description: "Focado em preservação de capital com baixo risco",
    icon: "🛡️",
    data: {
      assets: [
        { name: "Tesouro Selic", ticker: "SELIC", type: "bond", percentage: 40 },
        { name: "Itaú Unibanco", ticker: "ITUB4", type: "stock", percentage: 15 },
        { name: "Bradesco", ticker: "BBDC4", type: "stock", percentage: 15 },
        { name: "FII BTG Pactual Corporate Office", ticker: "BTCR11", type: "fii", percentage: 20 },
        { name: "IVVB11", ticker: "IVVB11", type: "etf", percentage: 10 }
      ],
      goal: "wealth-preservation",
      riskTolerance: "conservative"
    }
  },
  {
    name: "Portfolio Crescimento",
    description: "Foco em crescimento de capital com risco moderado",
    icon: "🚀",
    data: {
      assets: [
        { name: "Vale", ticker: "VALE3", type: "stock", percentage: 20 },
        { name: "Magazine Luiza", ticker: "MGLU3", type: "stock", percentage: 15 },
        { name: "B3", ticker: "B3SA3", type: "stock", percentage: 15 },
        { name: "IVVB11", ticker: "IVVB11", type: "etf", percentage: 25 },
        { name: "FII XP Log", ticker: "XPLG11", type: "fii", percentage: 15 },
        { name: "Tesouro IPCA+", ticker: "IPCA", type: "bond", percentage: 10 }
      ],
      goal: "growth",
      riskTolerance: "moderate"
    }
  },
  {
    name: "Portfolio Agressivo",
    description: "Máximo crescimento com alta tolerância ao risco",
    icon: "⚡",
    data: {
      assets: [
        { name: "Bitcoin", ticker: "BTC", type: "crypto", percentage: 15 },
        { name: "Tesla", ticker: "TSLA", type: "stock", percentage: 10 },
        { name: "Nvidia", ticker: "NVDA", type: "stock", percentage: 10 },
        { name: "PETR4", ticker: "PETR4", type: "stock", percentage: 15 },
        { name: "MGLU3", ticker: "MGLU3", type: "stock", percentage: 15 },
        { name: "BPAC11", ticker: "BPAC11", type: "etf", percentage: 20 },
        { name: "FII Kinea Índices", ticker: "KNCR11", type: "fii", percentage: 15 }
      ],
      goal: "growth",
      riskTolerance: "aggressive"
    }
  }
];