
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Target, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const scrollToAnalyzer = () => {
    const element = document.getElementById('portfolio-analyzer');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-transparent to-orange-900/20" />
      
      {/* Animated floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full golden-gradient opacity-15 blur-3xl float animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 opacity-20 blur-3xl float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-orange-500/10 to-yellow-500/10 opacity-30 blur-2xl float" style={{ animationDelay: '4s' }} />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Main content */}
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-yellow-400 text-sm font-medium">Powered by AI</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 bg-clip-text text-transparent leading-tight">
              Análise Inteligente
              <br />
              <span className="text-4xl md:text-6xl">de Portfólio</span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Descubra o potencial da sua carteira de investimentos com análise estratégica baseada em IA. 
            <br className="hidden md:block" />
            Identifique oportunidades, gerencie riscos e otimize seus retornos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Button 
              size="lg" 
              className="golden-gradient text-black font-bold hover:scale-105 transition-all duration-300 h-14 px-8 text-lg rounded-2xl shadow-xl group"
              onClick={scrollToAnalyzer}
            >
              Analisar Meu Portfólio
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 hover:scale-105 transition-all duration-300 h-14 px-8 text-lg rounded-2xl backdrop-blur-sm"
            >
              Ver Exemplo
            </Button>
          </div>
          
          {/* Enhanced feature cards with more bottom spacing */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-32 slide-in-bottom">
            <div className="bg-gradient-to-br from-yellow-900/30 via-amber-900/20 to-orange-900/30 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 hover:from-yellow-800/40 hover:via-amber-800/30 hover:to-orange-800/40 transition-all duration-500 group border border-yellow-500/30 hover:border-yellow-400/50 shadow-2xl hover:shadow-yellow-500/20 hover-lift stagger-animation">
              <div className="w-16 h-16 rounded-2xl golden-gradient flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <TrendingUp className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-300 group-hover:text-yellow-200 transition-colors duration-300">Análise Estratégica</h3>
              <p className="text-gray-300 group-hover:text-gray-200 leading-relaxed transition-colors duration-300">
                Identifique o estilo da sua carteira e receba insights personalizados baseados nos seus objetivos de investimento.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-900/30 via-amber-900/20 to-orange-900/30 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 hover:from-yellow-800/40 hover:via-amber-800/30 hover:to-orange-800/40 transition-all duration-500 group border border-yellow-500/30 hover:border-yellow-400/50 shadow-2xl hover:shadow-yellow-500/20 hover-lift stagger-animation">
              <div className="w-16 h-16 rounded-2xl golden-gradient flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-300 group-hover:text-yellow-200 transition-colors duration-300">Gestão de Risco</h3>
              <p className="text-gray-300 group-hover:text-gray-200 leading-relaxed transition-colors duration-300">
                Avalie a diversificação e identifique concentrações excessivas que podem comprometer seus resultados.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-900/30 via-amber-900/20 to-orange-900/30 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 hover:from-yellow-800/40 hover:via-amber-800/30 hover:to-orange-800/40 transition-all duration-500 group border border-yellow-500/30 hover:border-yellow-400/50 shadow-2xl hover:shadow-yellow-500/20 hover-lift stagger-animation">
              <div className="w-16 h-16 rounded-2xl golden-gradient flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Target className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-300 group-hover:text-yellow-200 transition-colors duration-300">Metas Financeiras</h3>
              <p className="text-gray-300 group-hover:text-gray-200 leading-relaxed transition-colors duration-300">
                Alinhe sua carteira com seus objetivos: renda passiva, crescimento, aposentadoria ou preservação.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </section>
  );
};

export default HeroSection;
