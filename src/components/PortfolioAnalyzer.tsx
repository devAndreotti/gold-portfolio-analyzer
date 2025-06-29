
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Loader2 } from "lucide-react";
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
    <div id="portfolio-analyzer" className="max-w-4xl mx-auto">
      <Card className="glass-dark border-yellow-500/30">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Configure Seu Portfólio
          </CardTitle>
          <p className="text-muted-foreground">
            Insira os dados da sua carteira para receber uma análise personalizada
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Assets */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-yellow-400">Ativos da Carteira</Label>
            
            {assets.map((asset, index) => (
              <div key={index} className="glass rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div>
                    <Label htmlFor={`name-${index}`}>Nome do Ativo</Label>
                    <Input
                      id={`name-${index}`}
                      placeholder="Ex: Petrobras"
                      value={asset.name}
                      onChange={(e) => updateAsset(index, 'name', e.target.value)}
                      className="bg-black/20 border-yellow-500/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`ticker-${index}`}>Ticker</Label>
                    <Input
                      id={`ticker-${index}`}
                      placeholder="Ex: PETR4"
                      value={asset.ticker}
                      onChange={(e) => updateAsset(index, 'ticker', e.target.value.toUpperCase())}
                      className="bg-black/20 border-yellow-500/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`type-${index}`}>Tipo</Label>
                    <Select value={asset.type} onValueChange={(value: Asset['type']) => updateAsset(index, 'type', value)}>
                      <SelectTrigger className="bg-black/20 border-yellow-500/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stock">Ação</SelectItem>
                        <SelectItem value="fii">FII</SelectItem>
                        <SelectItem value="bond">Renda Fixa</SelectItem>
                        <SelectItem value="etf">ETF</SelectItem>
                        <SelectItem value="crypto">Cripto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label htmlFor={`percentage-${index}`}>% Carteira</Label>
                      <Input
                        id={`percentage-${index}`}
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={asset.percentage || ''}
                        onChange={(e) => updateAsset(index, 'percentage', parseFloat(e.target.value) || 0)}
                        className="bg-black/20 border-yellow-500/30"
                      />
                    </div>
                    
                    {assets.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeAsset(index)}
                        className="mt-6 border-red-500/50 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={addAsset}
                className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Ativo
              </Button>
              
              <div className="text-right">
                <span className={`text-lg font-semibold ${Math.abs(totalPercentage - 100) < 1 ? 'text-green-400' : 'text-red-400'}`}>
                  Total: {totalPercentage.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
          
          {/* Goal and Risk */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-lg font-semibold text-yellow-400">Objetivo Principal</Label>
              <Select value={goal} onValueChange={(value: PortfolioData['goal']) => setGoal(value)}>
                <SelectTrigger className="bg-black/20 border-yellow-500/30 mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="growth">Crescimento de Capital</SelectItem>
                  <SelectItem value="income">Renda Passiva</SelectItem>
                  <SelectItem value="inflation-protection">Proteção contra Inflação</SelectItem>
                  <SelectItem value="retirement">Aposentadoria</SelectItem>
                  <SelectItem value="financial-independence">Independência Financeira</SelectItem>
                  <SelectItem value="wealth-preservation">Preservação de Patrimônio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-lg font-semibold text-yellow-400">Tolerância ao Risco</Label>
              <Select value={riskTolerance} onValueChange={(value: PortfolioData['riskTolerance']) => setRiskTolerance(value)}>
                <SelectTrigger className="bg-black/20 border-yellow-500/30 mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservador</SelectItem>
                  <SelectItem value="moderate">Moderado</SelectItem>
                  <SelectItem value="aggressive">Agressivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="text-center pt-6">
            <Button
              onClick={handleSubmit}
              disabled={isAnalyzing || totalPercentage === 0}
              className="golden-gradient text-black font-semibold px-8 py-3 text-lg hover:scale-105 transition-transform duration-300"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analisando Portfólio...
                </>
              ) : (
                'Analisar Portfólio'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioAnalyzer;
