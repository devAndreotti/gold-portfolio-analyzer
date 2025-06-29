
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Shield, Target, Award } from "lucide-react";
import { AnalysisResult } from "@/types/portfolio";

interface AnalysisResultsProps {
  result: AnalysisResult;
}

const AnalysisResults = ({ result }: AnalysisResultsProps) => {
  const COLORS = ['#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f'];

  const allocationData = [
    { name: 'Ações', value: result.allocation.stocks, color: '#fbbf24' },
    { name: 'FIIs', value: result.allocation.fiis, color: '#f59e0b' },
    { name: 'Renda Fixa', value: result.allocation.bonds, color: '#d97706' },
    { name: 'Internacional', value: result.allocation.international, color: '#b45309' },
  ];

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
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-dark border-yellow-500/30">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full golden-gradient flex items-center justify-center mb-4 mx-auto">
              <Award className="h-6 w-6 text-black" />
            </div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">Tipo de Carteira</h3>
            <p className="text-2xl font-bold">{result.portfolioType}</p>
          </CardContent>
        </Card>

        <Card className="glass-dark border-yellow-500/30">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full golden-gradient flex items-center justify-center mb-4 mx-auto">
              <Shield className="h-6 w-6 text-black" />
            </div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">Nível de Risco</h3>
            <p className="text-2xl font-bold">{result.riskLevel}</p>
          </CardContent>
        </Card>

        <Card className="glass-dark border-yellow-500/30">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full golden-gradient flex items-center justify-center mb-4 mx-auto">
              <Target className="h-6 w-6 text-black" />
            </div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">Diversificação</h3>
            <p className="text-2xl font-bold">{result.diversificationScore}/10</p>
          </CardContent>
        </Card>

        <Card className="glass-dark border-yellow-500/30">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full golden-gradient flex items-center justify-center mb-4 mx-auto">
              <TrendingUp className="h-6 w-6 text-black" />
            </div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">Retorno Esperado</h3>
            <p className="text-2xl font-bold">{result.performance.expectedReturn}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Allocation Chart */}
        <Card className="glass-dark border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-yellow-400">Alocação por Classe de Ativo</CardTitle>
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
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sector Distribution */}
        <Card className="glass-dark border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-yellow-400">Distribuição Setorial</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.sectors} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #fbbf24',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="value" fill="#fbbf24" radius={[4, 4, 0, 0]}>
                    {result.sectors.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="glass-dark border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-400">Métricas de Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between mb-2">
                <span>Retorno Esperado</span>
                <span className="font-semibold">{result.performance.expectedReturn}%</span>
              </div>
              <Progress value={(result.performance.expectedReturn / 20) * 100} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span>Volatilidade</span>
                <span className="font-semibold">{result.performance.volatility}%</span>
              </div>
              <Progress value={(result.performance.volatility / 30) * 100} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span>Índice Sharpe</span>
                <span className="font-semibold">{result.performance.sharpeRatio}</span>
              </div>
              <Progress value={(result.performance.sharpeRatio / 2) * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="glass-dark border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-400">Recomendações Estratégicas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-black font-bold text-sm">{index + 1}</span>
                </div>
                <p className="text-foreground">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisResults;
