
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import PortfolioAnalyzer from "@/components/PortfolioAnalyzer";
import AnalysisResults from "@/components/AnalysisResults";
import { PortfolioData, AnalysisResult } from "@/types/portfolio";

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysis = async (portfolioData: PortfolioData) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock analysis result
    const mockResult: AnalysisResult = {
      portfolioType: "Dividend Focus",
      riskLevel: "Moderado",
      diversificationScore: 7.8,
      recommendations: [
        "Sua carteira está bem balanceada para geração de renda passiva",
        "Considere aumentar exposição internacional para diversificação",
        "FIIs representam boa proteção contra inflação"
      ],
      allocation: {
        stocks: 45,
        fiis: 25,
        bonds: 20,
        international: 10
      },
      sectors: [
        { name: "Financeiro", value: 25 },
        { name: "Energia", value: 20 },
        { name: "Imobiliário", value: 18 },
        { name: "Tecnologia", value: 15 },
        { name: "Commodities", value: 12 },
        { name: "Outros", value: 10 }
      ],
      performance: {
        expectedReturn: 12.5,
        volatility: 18.3,
        sharpeRatio: 0.68
      }
    };
    
    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen">
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
