import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import PortfolioAnalyzer from "@/components/PortfolioAnalyzer";
import AnalysisResults from "@/components/AnalysisResults";
import { PortfolioData, AnalysisResult } from "@/types/portfolio";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { user, signOut } = useAuth();

  const analyzePortfolio = (portfolioData: PortfolioData): AnalysisResult => {
    // Calculate real allocation based on asset types
    const allocation = {
      stocks: 0,
      fiis: 0,
      bonds: 0,
      international: 0,
      crypto: 0
    };

    const sectors: { [key: string]: number } = {};

    portfolioData.assets.forEach(asset => {
      switch (asset.type) {
        case 'stock':
          allocation.stocks += asset.percentage;
          break;
        case 'fii':
          allocation.fiis += asset.percentage;
          break;
        case 'bond':
          allocation.bonds += asset.percentage;
          break;
        case 'crypto':
          allocation.crypto += asset.percentage;
          break;
        case 'etf':
          // ETFs can be international or domestic
          if (asset.ticker.includes('IVVB') || asset.ticker.includes('BOVA') || asset.name.toLowerCase().includes('internacional')) {
            allocation.international += asset.percentage;
          } else {
            allocation.stocks += asset.percentage;
          }
          break;
      }

      // Sector analysis
      const sector = asset.sector || getSectorFromTicker(asset.ticker, asset.name);
      sectors[sector] = (sectors[sector] || 0) + asset.percentage;
    });

    // Determine portfolio type based on allocation
    let portfolioType = "Balanceado";
    if (allocation.crypto > 50) {
      portfolioType = "Crypto Focus";
    } else if (allocation.stocks > 60) {
      portfolioType = "Growth Aggressive";
    } else if (allocation.fiis > 30) {
      portfolioType = "Dividend Focus";
    } else if (allocation.bonds > 40) {
      portfolioType = "Conservative";
    } else if (allocation.international > 25) {
      portfolioType = "Global Diversified";
    }

    // Risk level based on allocation
    let riskLevel = "Moderado";
    if (allocation.crypto > 30 || allocation.stocks > 70) {
      riskLevel = "Alto";
    } else if (allocation.bonds > 50 || (allocation.fiis + allocation.bonds) > 60) {
      riskLevel = "Baixo";
    }

    // Diversification score
    const nonZeroAllocations = Object.values(allocation).filter(val => val > 0).length;
    const maxConcentration = Math.max(...Object.values(allocation));
    let diversificationScore = 5 + nonZeroAllocations;
    if (maxConcentration > 70) diversificationScore -= 2;
    if (maxConcentration > 80) diversificationScore -= 1;
    diversificationScore = Math.min(10, Math.max(1, diversificationScore));

    // Performance expectations
    let expectedReturn = 8;
    let volatility = 15;
    
    if (allocation.crypto > 50) {
      expectedReturn = 25;
      volatility = 45;
    } else if (allocation.stocks > 60) {
      expectedReturn = 12;
      volatility = 20;
    } else if (allocation.bonds > 50) {
      expectedReturn = 6;
      volatility = 8;
    }

    // Adjust for crypto specifically
    expectedReturn += (allocation.crypto * 0.3);
    volatility += (allocation.crypto * 0.4);

    const sharpeRatio = Number(((expectedReturn - 5) / volatility).toFixed(2));

    // Generate recommendations
    const recommendations = generateRecommendations(allocation, portfolioData.goal, riskLevel);

    // Convert sectors object to array
    const sectorsArray = Object.entries(sectors)
      .map(([name, value]) => ({ name, value: Number(value.toFixed(1)) }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);

    return {
      portfolioType,
      riskLevel,
      diversificationScore: Number(diversificationScore.toFixed(1)),
      recommendations,
      allocation: {
        stocks: Number(allocation.stocks.toFixed(1)),
        fiis: Number(allocation.fiis.toFixed(1)),
        bonds: Number(allocation.bonds.toFixed(1)),
        international: Number(allocation.international.toFixed(1)),
        crypto: Number(allocation.crypto.toFixed(1))
      },
      sectors: sectorsArray,
      performance: {
        expectedReturn: Number(expectedReturn.toFixed(1)),
        volatility: Number(volatility.toFixed(1)),
        sharpeRatio
      }
    };
  };

  const getSectorFromTicker = (ticker: string, name: string): string => {
    const tickerUpper = ticker.toUpperCase();
    const nameLower = name.toLowerCase();
    
    if (tickerUpper.includes('BTC') || nameLower.includes('bitcoin')) return 'Criptomoedas';
    if (tickerUpper.includes('ETH') || nameLower.includes('ethereum')) return 'Criptomoedas';
    if (tickerUpper.includes('PETR') || nameLower.includes('petrobras')) return 'Energia';
    if (tickerUpper.includes('VALE') || nameLower.includes('vale')) return 'Mineração';
    if (tickerUpper.includes('ITUB') || tickerUpper.includes('BBDC') || nameLower.includes('banco')) return 'Financeiro';
    if (tickerUpper.includes('MGLU') || tickerUpper.includes('AMER') || nameLower.includes('magazine')) return 'Varejo';
    if (tickerUpper.includes('WEGE') || nameLower.includes('weg')) return 'Industrial';
    if (tickerUpper.includes('RRRP') || tickerUpper.includes('HGLG') || nameLower.includes('fii')) return 'Imobiliário';
    
    return 'Outros';
  };

  const generateRecommendations = (allocation: any, goal: string, riskLevel: string): string[] => {
    const recommendations: string[] = [];
    
    if (allocation.crypto > 70) {
      recommendations.push("Sua carteira tem alta concentração em criptomoedas. Considere diversificar para reduzir volatilidade.");
      recommendations.push("Com mais de 70% em crypto, considere definir estratégias de take profit para realizar ganhos.");
    } else if (allocation.crypto > 50) {
      recommendations.push("Carteira focada em criptomoedas com boa perspectiva de crescimento, mas com alta volatilidade.");
      recommendations.push("Considere adicionar alguns ativos tradicionais para estabilizar o portfólio.");
    }
    
    if (allocation.stocks > 70) {
      recommendations.push("Portfolio agressivo focado em crescimento. Considere adicionar renda fixa para equilibrar.");
    }
    
    if (allocation.bonds > 50) {
      recommendations.push("Carteira conservadora. Para maior retorno, considere adicionar mais ações ou FIIs.");
    }
    
    if (allocation.international < 10 && allocation.crypto < 30) {
      recommendations.push("Baixa exposição internacional. Considere ETFs globais para diversificação.");
    }
    
    if (goal === 'growth' && allocation.bonds > 30) {
      recommendations.push("Para objetivo de crescimento, considere reduzir renda fixa e aumentar ações.");
    }
    
    if (goal === 'income' && allocation.fiis < 20) {
      recommendations.push("Para foco em renda, considere aumentar posição em FIIs e ações pagadoras de dividendos.");
    }

    // Ensure at least 3 recommendations
    if (recommendations.length < 3) {
      recommendations.push("Monitore regularmente o rebalanceamento da carteira conforme seus objetivos.");
      recommendations.push("Considere aportes regulares para aproveitar o custo médio dos investimentos.");
    }
    
    return recommendations.slice(0, 4);
  };

  const handleAnalysis = async (portfolioData: PortfolioData) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Generate real analysis based on input data
    const analysisResult = analyzePortfolio(portfolioData);
    
    setAnalysisResult(analysisResult);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen">
      <div className="absolute top-4 right-4 z-50">
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-lg px-4 py-2 border border-white/20">
          <span className="text-white text-sm">
            Olá, {user?.email}
          </span>
          <Button
            onClick={signOut}
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Sair
          </Button>
        </div>
      </div>

      <HeroSection />
      
      <div className="container mx-auto px-4 py-16">
        <PortfolioAnalyzer 
          onAnalyze={handleAnalysis} 
          isAnalyzing={isAnalyzing}
        />
        
        {analysisResult && (
          <AnalysisResults result={analysisResult} />
        )}
      </div>
    </div>
  );
};

export default Index;
