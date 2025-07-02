
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Loader2, TrendingUp, PieChart, Target } from "lucide-react";
import { Asset, PortfolioData } from "@/types/portfolio";

interface PortfolioAnalyzerProps {
  onAnalyze: (data: PortfolioData) => void;
  isAnalyzing: boolean;
}

const PortfolioAnalyzer = ({ onAnalyze, isAnalyzing }: PortfolioAnalyzerProps) => {
  const [assets, setAssets] = useState<Asset[]>([
    { name: "", ticker: "", type: "stock", percentage: 0 }
  ]);
  const [goal, setGoal] = useState<PortfolioData['goal']>('growth');
  const [riskTolerance, setRiskTolerance] = useState<PortfolioData['riskTolerance']>('moderate');

  const addAsset = () => {
    setAssets([...assets, { name: "", ticker: "", type: "stock", percentage: 0 }]);
  };

  const removeAsset = (index: number) => {
    setAssets(assets.filter((_, i) => i !== index));
  };

  const updateAsset = (index: number, field: keyof Asset, value: any) => {
    const updatedAssets = assets.map((asset, i) => 
      i === index ? { ...asset, [field]: value } : asset
    );
    setAssets(updatedAssets);
  };

  const handleSubmit = () => {
    const validAssets = assets.filter(asset => asset.name && asset.ticker && asset.percentage > 0);
    
    if (validAssets.length === 0) {
      alert('Por favor, adicione pelo menos um ativo válido');
      return;
    }

    const totalPercentage = validAssets.reduce((sum, asset) => sum + asset.percentage, 0);
    if (Math.abs(totalPercentage - 100) > 1) {
      alert('A soma das porcentagens deve ser igual a 100%');
      return;
    }

    onAnalyze({
      assets: validAssets,
      goal,
      riskTolerance
    });
  };

  const totalPercentage = assets.reduce((sum, asset) => sum + (asset.percentage || 0), 0);

  return (
    <div id="portfolio-analyzer" className="max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 bg-clip-text text-transparent mb-4">
          Configure Seu Portfólio
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Insira os dados da sua carteira para receber uma análise personalizada e descobrir oportunidades de otimização
        </p>
      </div>

      {/* Main Configuration Card */}
      <Card className="glass-dark border-yellow-500/30 shadow-2xl backdrop-blur-xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-b border-yellow-500/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full golden-gradient flex items-center justify-center">
              <PieChart className="h-6 w-6 text-black" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white">
                Dados da Carteira
              </CardTitle>
              <p className="text-gray-400">Configure os ativos e parâmetros de análise</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-8 space-y-8">
          {/* Assets Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-yellow-400" />
              </div>
              <Label className="text-xl font-semibold text-yellow-400">Ativos da Carteira</Label>
            </div>
            
            {assets.map((asset, index) => (
              <div key={index} className="glass rounded-2xl p-6 space-y-4 border border-yellow-500/10 hover:border-yellow-500/20 transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor={`name-${index}`} className="text-sm font-medium text-gray-300 mb-2 block">Nome do Ativo</Label>
                    <Input
                      id={`name-${index}`}
                      placeholder="Ex: Petrobras"
                      value={asset.name}
                      onChange={(e) => updateAsset(index, 'name', e.target.value)}
                      className="bg-black/30 border-yellow-500/20 text-white placeholder:text-gray-500 h-11 rounded-xl focus:border-yellow-400"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`ticker-${index}`} className="text-sm font-medium text-gray-300 mb-2 block">Ticker</Label>
                    <Input
                      id={`ticker-${index}`}
                      placeholder="Ex: PETR4"
                      value={asset.ticker}
                      onChange={(e) => updateAsset(index, 'ticker', e.target.value.toUpperCase())}
                      className="bg-black/30 border-yellow-500/20 text-white placeholder:text-gray-500 h-11 rounded-xl focus:border-yellow-400 font-mono"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`type-${index}`} className="text-sm font-medium text-gray-300 mb-2 block">Tipo</Label>
                    <Select value={asset.type} onValueChange={(value: Asset['type']) => updateAsset(index, 'type', value)}>
                      <SelectTrigger className="bg-black/30 border-yellow-500/20 text-white h-11 rounded-xl focus:border-yellow-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-yellow-500/30">
                        <SelectItem value="stock">📈 Ação</SelectItem>
                        <SelectItem value="fii">🏢 FII</SelectItem>
                        <SelectItem value="bond">💰 Renda Fixa</SelectItem>
                        <SelectItem value="etf">📊 ETF</SelectItem>
                        <SelectItem value="crypto">₿ Cripto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Label htmlFor={`percentage-${index}`} className="text-sm font-medium text-gray-300 mb-2 block">% Carteira</Label>
                      <Input
                        id={`percentage-${index}`}
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        placeholder="0.0"
                        value={asset.percentage || ''}
                        onChange={(e) => updateAsset(index, 'percentage', parseFloat(e.target.value) || 0)}
                        className="bg-black/30 border-yellow-500/20 text-white placeholder:text-gray-500 h-11 rounded-xl focus:border-yellow-400"
                      />
                    </div>
                    
                    {assets.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeAsset(index)}
                        className="mt-7 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 w-11 h-11 rounded-xl"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={addAsset}
                className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500/50 rounded-xl h-11 px-6"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Ativo
              </Button>
              
              <div className="text-right">
                <div className="text-sm text-gray-400 mb-1">Total da carteira</div>
                <span className={`text-2xl font-bold ${Math.abs(totalPercentage - 100) < 1 ? 'text-green-400' : 'text-red-400'}`}>
                  {totalPercentage.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
          
          {/* Goals and Risk Section */}
          <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-yellow-500/20">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Target className="h-4 w-4 text-yellow-400" />
                </div>
                <Label className="text-xl font-semibold text-yellow-400">Objetivo Principal</Label>
              </div>
              <Select value={goal} onValueChange={(value: PortfolioData['goal']) => setGoal(value)}>
                <SelectTrigger className="bg-black/30 border-yellow-500/20 text-white h-12 rounded-xl focus:border-yellow-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-yellow-500/30">
                  <SelectItem value="growth">🚀 Crescimento de Capital</SelectItem>
                  <SelectItem value="income">💵 Renda Passiva</SelectItem>
                  <SelectItem value="inflation-protection">🛡️ Proteção contra Inflação</SelectItem>
                  <SelectItem value="retirement">🏖️ Aposentadoria</SelectItem>
                  <SelectItem value="financial-independence">💎 Independência Financeira</SelectItem>
                  <SelectItem value="wealth-preservation">🏛️ Preservação de Patrimônio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <PieChart className="h-4 w-4 text-yellow-400" />
                </div>
                <Label className="text-xl font-semibold text-yellow-400">Tolerância ao Risco</Label>
              </div>
              <Select value={riskTolerance} onValueChange={(value: PortfolioData['riskTolerance']) => setRiskTolerance(value)}>
                <SelectTrigger className="bg-black/30 border-yellow-500/20 text-white h-12 rounded-xl focus:border-yellow-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-yellow-500/30">
                  <SelectItem value="conservative">🛡️ Conservador</SelectItem>
                  <SelectItem value="moderate">⚖️ Moderado</SelectItem>
                  <SelectItem value="aggressive">🎯 Agressivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="text-center pt-8">
            <Button
              onClick={handleSubmit}
              disabled={isAnalyzing || totalPercentage === 0}
              className="golden-gradient text-black font-bold px-12 py-4 text-lg hover:scale-105 transition-all duration-300 rounded-2xl h-14 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                  Analisando Portfólio...
                </>
              ) : (
                <>
                  <TrendingUp className="mr-3 h-6 w-6" />
                  Analisar Meu Portfólio
                </>
              )}
            </Button>
            <p className="text-sm text-gray-400 mt-3">
              Análise completa em segundos com inteligência artificial
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioAnalyzer;
