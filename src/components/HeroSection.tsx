
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Target, ArrowRight, Sparkles, BarChart3, Zap } from "lucide-react";

const HeroSection = () => {
  const scrollToAnalyzer = () => {
    const element = document.getElementById('portfolio-analyzer');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced layered background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/30 via-transparent to-orange-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-600/20 via-transparent to-transparent" />
      
      {/* Dynamic animated orbs with better positioning and effects */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full golden-gradient opacity-20 blur-3xl animate-[float_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-amber-500/25 to-yellow-500/25 opacity-25 blur-3xl animate-[float_12s_ease-in-out_infinite] [animation-delay:2s]" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-orange-500/15 to-yellow-500/15 opacity-30 blur-2xl animate-[float_10s_ease-in-out_infinite] [animation-delay:4s]" />
      <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-gradient-to-r from-yellow-400/20 to-amber-400/20 opacity-30 blur-2xl animate-[float_6s_ease-in-out_infinite] [animation-delay:1s]" />
      <div className="absolute bottom-20 left-20 w-56 h-56 rounded-full bg-gradient-to-r from-orange-400/15 to-yellow-400/15 opacity-25 blur-2xl animate-[float_14s_ease-in-out_infinite] [animation-delay:3s]" />
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Main content with enhanced spacing and animations */}
        <div className="max-w-6xl mx-auto">
          {/* Animated badge */}
          <div className="mb-12 opacity-0 animate-[fade-in_1s_ease-out_0.2s_forwards]">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/15 to-amber-500/15 border border-yellow-500/30 rounded-full px-6 py-3 mb-8 hover:from-yellow-500/20 hover:to-amber-500/20 hover:border-yellow-400/50 transition-all duration-500 hover-glow backdrop-blur-sm group">
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span className="text-yellow-300 text-sm font-semibold tracking-wide">Powered by AI</span>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse group-hover:scale-125 transition-transform duration-300"></div>
            </div>
            
            {/* Enhanced main headline with better typography */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 bg-clip-text text-transparent leading-[0.9] tracking-tight">
              Análise Inteligente
              <br />
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-300 bg-clip-text text-transparent">de Portfólio</span>
            </h1>
          </div>
          
          {/* Enhanced description with better hierarchy */}
          <div className="mb-16 opacity-0 animate-[fade-in_1s_ease-out_0.6s_forwards]">
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-6 max-w-5xl mx-auto leading-relaxed font-light">
              Descubra o potencial da sua carteira de investimentos com análise estratégica baseada em IA.
            </p>
            <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed">
              Identifique oportunidades, gerencie riscos e otimize seus retornos.
            </p>
            <p className="text-lg md:text-xl text-yellow-300 font-semibold max-w-4xl mx-auto leading-relaxed">
              <Zap className="inline w-5 h-5 mr-2 text-yellow-400" />
              Análise completa em segundos, insights que transformam resultados.
            </p>
          </div>
          
          {/* Enhanced call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-24 opacity-0 animate-[fade-in_1s_ease-out_1s_forwards]">
            <Button 
              size="lg" 
              className="golden-gradient text-black font-bold hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/30 transition-all duration-500 h-16 px-10 text-lg rounded-2xl shadow-xl group border-2 border-yellow-400/20 hover:border-yellow-300/40 relative overflow-hidden"
              onClick={scrollToAnalyzer}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <BarChart3 className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              Analisar Meu Portfólio
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-yellow-500/60 text-yellow-300 hover:bg-yellow-500/20 hover:border-yellow-400/80 hover:text-yellow-200 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-500 h-16 px-10 text-lg rounded-2xl backdrop-blur-sm bg-black/20 group"
            >
              <Sparkles className="mr-3 h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
              Ver Exemplo
            </Button>
          </div>
          
          {/* Premium feature cards with enhanced design */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-32 opacity-0 animate-[fade-in_1s_ease-out_1.4s_forwards]">
            <div className="relative bg-gradient-to-br from-yellow-900/40 via-amber-900/30 to-orange-900/40 backdrop-blur-2xl rounded-3xl p-10 hover:scale-[1.02] hover:from-yellow-800/50 hover:via-amber-800/40 hover:to-orange-800/50 transition-all duration-700 group border border-yellow-500/40 hover:border-yellow-400/60 shadow-2xl hover:shadow-yellow-500/30 hover:-translate-y-2 overflow-hidden">
              {/* Card shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-3xl golden-gradient flex items-center justify-center mb-8 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-yellow-500/30">
                  <TrendingUp className="h-10 w-10 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-yellow-200 group-hover:text-yellow-100 transition-colors duration-300 text-center">Análise Estratégica</h3>
                <p className="text-gray-300 group-hover:text-gray-200 leading-relaxed transition-colors duration-300 text-center text-lg">
                  Identifique o estilo da sua carteira e receba insights personalizados baseados nos seus objetivos de investimento.
                </p>
              </div>
            </div>
            
            <div className="relative bg-gradient-to-br from-yellow-900/40 via-amber-900/30 to-orange-900/40 backdrop-blur-2xl rounded-3xl p-10 hover:scale-[1.02] hover:from-yellow-800/50 hover:via-amber-800/40 hover:to-orange-800/50 transition-all duration-700 group border border-yellow-500/40 hover:border-yellow-400/60 shadow-2xl hover:shadow-yellow-500/30 hover:-translate-y-2 overflow-hidden [animation-delay:0.2s]">
              {/* Card shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-3xl golden-gradient flex items-center justify-center mb-8 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-yellow-500/30">
                  <Shield className="h-10 w-10 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-yellow-200 group-hover:text-yellow-100 transition-colors duration-300 text-center">Gestão de Risco</h3>
                <p className="text-gray-300 group-hover:text-gray-200 leading-relaxed transition-colors duration-300 text-center text-lg">
                  Avalie a diversificação e identifique concentrações excessivas que podem comprometer seus resultados.
                </p>
              </div>
            </div>
            
            <div className="relative bg-gradient-to-br from-yellow-900/40 via-amber-900/30 to-orange-900/40 backdrop-blur-2xl rounded-3xl p-10 hover:scale-[1.02] hover:from-yellow-800/50 hover:via-amber-800/40 hover:to-orange-800/50 transition-all duration-700 group border border-yellow-500/40 hover:border-yellow-400/60 shadow-2xl hover:shadow-yellow-500/30 hover:-translate-y-2 overflow-hidden [animation-delay:0.4s]">
              {/* Card shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-3xl golden-gradient flex items-center justify-center mb-8 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-yellow-500/30">
                  <Target className="h-10 w-10 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-yellow-200 group-hover:text-yellow-100 transition-colors duration-300 text-center">Metas Financeiras</h3>
                <p className="text-gray-300 group-hover:text-gray-200 leading-relaxed transition-colors duration-300 text-center text-lg">
                  Alinhe sua carteira com seus objetivos: renda passiva, crescimento, aposentadoria ou preservação.
                </p>
              </div>
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
