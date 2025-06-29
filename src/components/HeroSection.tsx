
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Target } from "lucide-react";

const HeroSection = () => {
  const scrollToAnalyzer = () => {
    const element = document.getElementById('portfolio-analyzer');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-transparent to-orange-900/20" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full golden-gradient opacity-20 blur-3xl float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-amber-500/30 to-yellow-500/30 opacity-30 blur-3xl float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Main content */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 bg-clip-text text-transparent">
            Análise Inteligente de Portfólio
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Descubra o potencial da sua carteira de investimentos com análise estratégica baseada em IA. 
            Identifique oportunidades, gerencie riscos e otimize seus retornos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="golden-gradient text-black font-semibold hover:scale-105 transition-transform duration-300"
              onClick={scrollToAnalyzer}
            >
              Analisar Meu Portfólio
              <TrendingUp className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 hover:scale-105 transition-all duration-300"
            >
              Ver Exemplo
            </Button>
          </div>
          
          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 rounded-full golden-gradient flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-yellow-400">Análise Estratégica</h3>
              <p className="text-muted-foreground">
                Identifique o estilo da sua carteira e receba insights personalizados baseados nos seus objetivos.
              </p>
            </div>
            
            <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 rounded-full golden-gradient flex items-center justify-center mb-4 mx-auto">
                <Shield className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-yellow-400">Gestão de Risco</h3>
              <p className="text-muted-foreground">
                Avalie a diversificação e identifique concentrações excessivas que podem comprometer seus resultados.
              </p>
            </div>
            
            <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 rounded-full golden-gradient flex items-center justify-center mb-4 mx-auto">
                <Target className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-yellow-400">Metas Financeiras</h3>
              <p className="text-muted-foreground">
                Alinhe sua carteira com seus objetivos: renda passiva, crescimento, aposentadoria ou preservação.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
