
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Area, AreaChart } from 'recharts';
import { TrendingUp, Shield, Target, Award, AlertTriangle, CheckCircle, TrendingDown, BarChart3, PieChart as PieChartIcon, Activity, DollarSign, Percent } from "lucide-react";
import { AnalysisResult } from "@/types/portfolio";

interface AnalysisResultsProps {
  result: AnalysisResult;
}

const AnalysisResults = ({ result }: AnalysisResultsProps) => {
  const COLORS = ['#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f'];

  const allocationData = [
    ...(result.allocation.stocks > 0 ? [{ name: 'Ações', value: result.allocation.stocks, color: '#fbbf24' }] : []),
    ...(result.allocation.fiis > 0 ? [{ name: 'FIIs', value: result.allocation.fiis, color: '#f59e0b' }] : []),
    ...(result.allocation.bonds > 0 ? [{ name: 'Renda Fixa', value: result.allocation.bonds, color: '#d97706' }] : []),
    ...(result.allocation.international > 0 ? [{ name: 'Internacional', value: result.allocation.international, color: '#b45309' }] : []),
    ...(result.allocation.crypto > 0 ? [{ name: 'Criptomoedas', value: result.allocation.crypto, color: '#f97316' }] : []),
  ];

  // Dados para gráfico de performance histórica simulada
  const performanceData = [
    { month: 'Jan', portfolio: 100, benchmark: 100 },
    { month: 'Fev', portfolio: 102 + (result.performance.expectedReturn * 0.1), benchmark: 101.5 },
    { month: 'Mar', portfolio: 105 + (result.performance.expectedReturn * 0.15), benchmark: 103 },
    { month: 'Abr', portfolio: 103 + (result.performance.expectedReturn * 0.12), benchmark: 102.5 },
    { month: 'Mai', portfolio: 108 + (result.performance.expectedReturn * 0.2), benchmark: 105 },
    { month: 'Jun', portfolio: 110 + (result.performance.expectedReturn * 0.25), benchmark: 106.5 },
  ];

  // Dados para gráfico radar de análise de risco
  const riskAnalysisData = [
    { subject: 'Liquidez', A: Math.max(10, 100 - result.allocation.crypto * 2), fullMark: 100 },
    { subject: 'Diversificação', A: result.diversificationScore * 10, fullMark: 100 },
    { subject: 'Potencial Retorno', A: Math.min(100, result.performance.expectedReturn * 5), fullMark: 100 },
    { subject: 'Estabilidade', A: Math.max(10, 100 - result.performance.volatility * 2), fullMark: 100 },
    { subject: 'Proteção Inflação', A: (result.allocation.stocks + result.allocation.fiis + result.allocation.crypto) * 0.8, fullMark: 100 },
    { subject: 'Renda Passiva', A: result.allocation.fiis * 4 + result.allocation.bonds * 2, fullMark: 100 },
  ];

  // Categorização das recomendações
  const categorizedRecommendations = {
    critical: result.recommendations.filter(rec => rec.includes('🚨') || rec.includes('extrema')),
    warning: result.recommendations.filter(rec => rec.includes('⚡') || rec.includes('₿') || rec.includes('Alta')),
    suggestion: result.recommendations.filter(rec => !rec.includes('🚨') && !rec.includes('⚡') && !rec.includes('₿') && !rec.includes('extrema') && !rec.includes('Alta'))
  };

  // Métricas adicionais calculadas
  const additionalMetrics = {
    riskAdjustedReturn: Number((result.performance.expectedReturn / result.performance.volatility).toFixed(2)),
    concentrationRisk: Math.max(...Object.values(result.allocation)),
    defensiveAllocation: result.allocation.bonds + result.allocation.fiis,
    aggressiveAllocation: result.allocation.stocks + result.allocation.crypto,
  };

  return (
    <div className="mt-16 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-4">
          Análise do Seu Portfólio
        </h2>
        <p className="text-xl text-muted-foreground">
          Insights estratégicos baseados na composição da sua carteira
        </p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4 slide-in-bottom">
        <Card className="glass-dark border-yellow-500/30 hover-glow hover-lift transition-all duration-300 stagger-animation group">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 rounded-full golden-gradient flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Award className="h-5 w-5 text-black" />
            </div>
            <h3 className="text-sm font-semibold text-yellow-400 mb-1">Tipo de Carteira</h3>
            <p className="text-lg font-bold">{result.portfolioType}</p>
          </CardContent>
        </Card>

        <Card className="glass-dark border-yellow-500/30 hover-glow hover-lift transition-all duration-300 stagger-animation group">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 rounded-full golden-gradient flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-5 w-5 text-black" />
            </div>
            <h3 className="text-sm font-semibold text-yellow-400 mb-1">Nível de Risco</h3>
            <p className="text-lg font-bold">{result.riskLevel}</p>
          </CardContent>
        </Card>

        <Card className="glass-dark border-yellow-500/30 hover-glow hover-lift transition-all duration-300 stagger-animation group">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 rounded-full golden-gradient flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Target className="h-5 w-5 text-black" />
            </div>
            <h3 className="text-sm font-semibold text-yellow-400 mb-1">Diversificação</h3>
            <p className="text-lg font-bold">{result.diversificationScore}/10</p>
          </CardContent>
        </Card>

        <Card className="glass-dark border-yellow-500/30 hover-glow hover-lift transition-all duration-300 stagger-animation group">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 rounded-full golden-gradient flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="h-5 w-5 text-black" />
            </div>
            <h3 className="text-sm font-semibold text-yellow-400 mb-1">Retorno Esperado</h3>
            <p className="text-lg font-bold">{result.performance.expectedReturn}%</p>
          </CardContent>
        </Card>

        <Card className="glass-dark border-yellow-500/30 hover-glow hover-lift transition-all duration-300 stagger-animation group">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 rounded-full golden-gradient flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Activity className="h-5 w-5 text-black" />
            </div>
            <h3 className="text-sm font-semibold text-yellow-400 mb-1">Sharpe Ratio</h3>
            <p className="text-lg font-bold">{result.performance.sharpeRatio}</p>
          </CardContent>
        </Card>

        <Card className="glass-dark border-yellow-500/30 hover-glow hover-lift transition-all duration-300 stagger-animation group">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 rounded-full golden-gradient flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Percent className="h-5 w-5 text-black" />
            </div>
            <h3 className="text-sm font-semibold text-yellow-400 mb-1">Volatilidade</h3>
            <p className="text-lg font-bold">{result.performance.volatility}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Grid */}
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6 slide-in-left">
        {/* Allocation Chart */}
        <Card className="glass-dark border-yellow-500/30 hover-glow hover-lift transition-all duration-300 stagger-animation">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <PieChartIcon className="h-5 w-5 text-yellow-400" />
              <CardTitle className="text-yellow-400">Alocação por Classe</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${value}%`}
                    outerRadius={85}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="#1F2937"
                    strokeWidth={2}
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #fbbf24',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(251, 191, 36, 0.3)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {allocationData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sector Distribution */}
        <Card className="glass-dark border-yellow-500/30 hover-glow hover-lift transition-all duration-300 stagger-animation">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-yellow-400" />
              <CardTitle className="text-yellow-400">Distribuição Setorial</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.sectors} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF"
                    fontSize={11}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#9CA3AF" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #fbbf24',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(251, 191, 36, 0.3)'
                    }}
                  />
                  <Bar dataKey="value" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Risk Analysis Radar */}
        <Card className="glass-dark border-yellow-500/30 hover-glow hover-lift transition-all duration-300 stagger-animation">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-yellow-400" />
              <CardTitle className="text-yellow-400">Análise de Risco</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={riskAnalysisData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                  <Radar
                    name="Portfolio"
                    dataKey="A"
                    stroke="#fbbf24"
                    fill="#fbbf24"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #fbbf24',
                      borderRadius: '8px'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid lg:grid-cols-2 gap-6 slide-in-right">
        {/* Performance Simulation */}
        <Card className="glass-dark border-yellow-500/30 hover-glow hover-lift transition-all duration-300 stagger-animation">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-yellow-400" />
              <CardTitle className="text-yellow-400">Performance Simulada (6M)</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#fbbf24" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
                  <XAxis dataKey="month" stroke="#9CA3AF" fontSize={11} />
                  <YAxis stroke="#9CA3AF" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #fbbf24',
                      borderRadius: '8px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="portfolio"
                    stroke="#fbbf24"
                    fillOpacity={1}
                    fill="url(#portfolioGradient)"
                    strokeWidth={3}
                    name="Seu Portfólio"
                  />
                  <Area
                    type="monotone"
                    dataKey="benchmark"
                    stroke="#6366f1"
                    fillOpacity={1}
                    fill="url(#benchmarkGradient)"
                    strokeWidth={2}
                    name="Benchmark"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Additional Metrics */}
        <Card className="glass-dark border-yellow-500/30 hover-glow hover-lift transition-all duration-300 stagger-animation">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-yellow-400" />
              <CardTitle className="text-yellow-400">Métricas Avançadas</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Retorno Ajustado ao Risco</span>
                  <Badge variant={additionalMetrics.riskAdjustedReturn > 0.5 ? "default" : "secondary"}>
                    {additionalMetrics.riskAdjustedReturn}
                  </Badge>
                </div>
                <Progress 
                  value={Math.min(100, additionalMetrics.riskAdjustedReturn * 50)} 
                  className="h-2" 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Risco de Concentração</span>
                  <Badge variant={additionalMetrics.concentrationRisk > 50 ? "destructive" : "default"}>
                    {additionalMetrics.concentrationRisk.toFixed(1)}%
                  </Badge>
                </div>
                <Progress 
                  value={additionalMetrics.concentrationRisk} 
                  className="h-2" 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Alocação Defensiva</span>
                  <Badge variant="outline">
                    {additionalMetrics.defensiveAllocation.toFixed(1)}%
                  </Badge>
                </div>
                <Progress 
                  value={additionalMetrics.defensiveAllocation} 
                  className="h-2" 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Alocação Agressiva</span>
                  <Badge variant="outline">
                    {additionalMetrics.aggressiveAllocation.toFixed(1)}%
                  </Badge>
                </div>
                <Progress 
                  value={additionalMetrics.aggressiveAllocation} 
                  className="h-2" 
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="glass-dark border-yellow-500/30 hover-glow transition-all duration-300">
        <CardHeader className="flex flex-row items-center space-y-0 pb-4">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-yellow-400" />
            <CardTitle className="text-yellow-400">Métricas de Performance</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Retorno Esperado</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="font-bold text-lg">{result.performance.expectedReturn}%</span>
                </div>
              </div>
              <Progress 
                value={Math.min((result.performance.expectedReturn / 30) * 100, 100)} 
                className="h-3 bg-gray-800" 
              />
              <p className="text-xs text-muted-foreground">
                {result.performance.expectedReturn > 15 ? 'Excelente potencial' : 
                 result.performance.expectedReturn > 10 ? 'Bom retorno esperado' : 'Retorno conservador'}
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Volatilidade</span>
                <div className="flex items-center space-x-2">
                  <Activity className={`h-4 w-4 ${result.performance.volatility > 25 ? 'text-red-400' : result.performance.volatility > 15 ? 'text-yellow-400' : 'text-green-400'}`} />
                  <span className="font-bold text-lg">{result.performance.volatility}%</span>
                </div>
              </div>
              <Progress 
                value={Math.min((result.performance.volatility / 50) * 100, 100)} 
                className="h-3 bg-gray-800" 
              />
              <p className="text-xs text-muted-foreground">
                {result.performance.volatility > 25 ? 'Alta volatilidade' : 
                 result.performance.volatility > 15 ? 'Volatilidade moderada' : 'Baixa volatilidade'}
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Índice Sharpe</span>
                <div className="flex items-center space-x-2">
                  <Target className={`h-4 w-4 ${result.performance.sharpeRatio > 1 ? 'text-green-400' : result.performance.sharpeRatio > 0.5 ? 'text-yellow-400' : 'text-red-400'}`} />
                  <span className="font-bold text-lg">{result.performance.sharpeRatio}</span>
                </div>
              </div>
              <Progress 
                value={Math.max(0, Math.min((result.performance.sharpeRatio / 1.5) * 100, 100))} 
                className="h-3 bg-gray-800" 
              />
              <p className="text-xs text-muted-foreground">
                {result.performance.sharpeRatio > 1 ? 'Excelente eficiência' : 
                 result.performance.sharpeRatio > 0.5 ? 'Boa relação risco/retorno' : 'Baixa eficiência'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Recommendations */}
      <div className="space-y-6">
        {categorizedRecommendations.critical.length > 0 && (
          <Card className="glass-dark border-red-500/50 hover-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center space-y-0 pb-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                <CardTitle className="text-red-400">Ações Críticas Necessárias</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categorizedRecommendations.critical.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30 animate-pulse">
                    <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-foreground font-medium">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {categorizedRecommendations.warning.length > 0 && (
          <Card className="glass-dark border-yellow-500/50 hover-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center space-y-0 pb-4">
              <div className="flex items-center space-x-2">
                <TrendingDown className="h-5 w-5 text-yellow-400" />
                <CardTitle className="text-yellow-400">Oportunidades de Melhoria</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categorizedRecommendations.warning.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                    <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-black font-bold text-xs">!</span>
                    </div>
                    <p className="text-foreground">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {categorizedRecommendations.suggestion.length > 0 && (
          <Card className="glass-dark border-green-500/50 hover-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center space-y-0 pb-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <CardTitle className="text-green-400">Sugestões Estratégicas</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categorizedRecommendations.suggestion.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-foreground">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AnalysisResults;
