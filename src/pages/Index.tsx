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
    // Enhanced allocation calculation with sector mapping
    const allocation = {
      stocks: 0,
      fiis: 0,
      bonds: 0,
      international: 0,
      crypto: 0
    };

    const sectors: { [key: string]: number } = {};
    const assetConcentration: { [key: string]: number } = {};

    portfolioData.assets.forEach(asset => {
      // Track individual asset concentration
      assetConcentration[asset.ticker] = asset.percentage;

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
          // Enhanced ETF classification
          if (asset.ticker.includes('IVVB') || asset.ticker.includes('SPY') || 
              asset.ticker.includes('EWZ') || asset.name.toLowerCase().includes('internacional') ||
              asset.name.toLowerCase().includes('global')) {
            allocation.international += asset.percentage;
          } else {
            allocation.stocks += asset.percentage;
          }
          break;
      }

      // Enhanced sector analysis with fallback
      const sector = asset.sector || getSectorFromTicker(asset.ticker, asset.name);
      sectors[sector] = (sectors[sector] || 0) + asset.percentage;
    });

    // Advanced portfolio classification
    let portfolioType = "Balanceado Diversificado";
    if (allocation.crypto > 40) {
      portfolioType = "Cripto Dominante";
    } else if (allocation.stocks > 70) {
      portfolioType = "Growth Agressivo";
    } else if (allocation.fiis > 40) {
      portfolioType = "Renda Passiva";
    } else if (allocation.bonds > 50) {
      portfolioType = "Conservador";
    } else if (allocation.international > 30) {
      portfolioType = "Global Diversificado";
    } else if (allocation.stocks > 50 && allocation.fiis > 20) {
      portfolioType = "Híbrido Growth + Renda";
    }

    // Enhanced risk assessment
    let riskLevel = "Moderado";
    const cryptoRisk = allocation.crypto * 2; // Crypto has double weight in risk
    const stockRisk = allocation.stocks * 1.2; // Stocks have moderate weight
    const totalRiskScore = cryptoRisk + stockRisk + (allocation.bonds * 0.3);

    if (totalRiskScore > 80 || allocation.crypto > 25) {
      riskLevel = "Alto";
    } else if (totalRiskScore < 40 || allocation.bonds > 60) {
      riskLevel = "Baixo";
    }

    // Enhanced diversification score (1-10)
    const numAssetTypes = Object.values(allocation).filter(val => val > 0).length;
    const numSectors = Object.keys(sectors).length;
    const maxAssetConcentration = Math.max(...Object.values(assetConcentration));
    const maxSectorConcentration = Math.max(...Object.values(sectors));
    
    let diversificationScore = numAssetTypes * 1.5 + numSectors * 0.8;
    
    // Penalize concentration
    if (maxAssetConcentration > 30) diversificationScore -= 2;
    if (maxAssetConcentration > 50) diversificationScore -= 2;
    if (maxSectorConcentration > 40) diversificationScore -= 1.5;
    
    // Bonus for international exposure
    if (allocation.international > 10) diversificationScore += 1;
    
    diversificationScore = Math.min(10, Math.max(1, Math.round(diversificationScore)));

    // Advanced performance modeling
    let expectedReturn = 7; // Base return
    let volatility = 12; // Base volatility
    
    // Asset class contributions to return and risk
    expectedReturn += (allocation.crypto / 100) * 20; // Crypto: +20% expected return
    expectedReturn += (allocation.stocks / 100) * 8; // Stocks: +8% expected return
    expectedReturn += (allocation.fiis / 100) * 4; // FIIs: +4% expected return
    expectedReturn += (allocation.international / 100) * 6; // International: +6% expected return
    expectedReturn += (allocation.bonds / 100) * 2; // Bonds: +2% expected return
    
    volatility += (allocation.crypto / 100) * 35; // Crypto adds significant volatility
    volatility += (allocation.stocks / 100) * 12; // Stocks add moderate volatility
    volatility += (allocation.fiis / 100) * 8; // FIIs add low volatility
    volatility += (allocation.international / 100) * 10; // International adds some volatility
    volatility += (allocation.bonds / 100) * 2; // Bonds add minimal volatility
    
    // Adjust for goal alignment
    if (portfolioData.goal === 'growth' && allocation.stocks < 50) {
      expectedReturn -= 1; // Penalize growth goal without enough stocks
    }
    if (portfolioData.goal === 'income' && allocation.fiis < 30) {
      expectedReturn -= 0.5; // Penalize income goal without enough FIIs
    }

    // Calculate Sharpe Ratio (simplified)
    const riskFreeRate = 5.5; // Approximate Brazilian risk-free rate (CDI)
    const sharpeRatio = Math.max(0, Number(((expectedReturn - riskFreeRate) / volatility).toFixed(2)));

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
    
    const totalEquity = allocation.stocks + allocation.fiis + allocation.crypto;
    const maxConcentration = Math.max(...Object.values(allocation).map(Number));
    
    // Enhanced crypto analysis
    if (allocation.crypto > 70) {
      recommendations.push("🚨 Concentração extrema em cripto (70%+). Risco muito alto - considere diversificar urgentemente.");
      recommendations.push("💰 Realize lucros parciais em criptos e realoque para ativos menos voláteis.");
    } else if (allocation.crypto > 30) {
      recommendations.push("₿ Alta exposição em cripto. Para estabilidade, limite a 15-20% do portfólio.");
      recommendations.push("📊 Considere ETFs de criptomoedas para exposição mais estável ao setor.");
    } else if (allocation.crypto > 15) {
      recommendations.push("⚡ Boa exposição a cripto. Monitore volatilidade e tenha estratégia de saída definida.");
    }
    
    // Stock concentration
    if (allocation.stocks > 70 && allocation.crypto < 30) {
      recommendations.push("📈 Portfolio agressivo em ações. Adicione 15-25% em renda fixa para reduzir volatilidade.");
      recommendations.push("🏢 Considere incluir FIIs (10-20%) para diversificação e renda mensal.");
    }
    
    // Conservative portfolios
    if (allocation.bonds > 60) {
      recommendations.push("🛡️ Carteira muito conservadora. Para inflation-beating, adicione 20-30% em ações.");
      recommendations.push("💎 FIIs podem oferecer renda com crescimento potencial melhor que renda fixa.");
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
