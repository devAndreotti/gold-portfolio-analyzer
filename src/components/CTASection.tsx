import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  const scrollToAnalyzer = () => {
    const element = document.getElementById('portfolio-analyzer');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-amber-500/20 to-orange-500/10 rounded-3xl blur-3xl"></div>
            
            <div className="relative glass-dark border border-yellow-500/30 rounded-3xl p-12 hover-glow">
              <div className="w-20 h-20 rounded-full golden-gradient flex items-center justify-center mb-8 mx-auto float">
                <Sparkles className="h-10 w-10 text-black" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 bg-clip-text text-transparent mb-6 leading-tight">
                Pronto para Otimizar
                <br />
                Seu Portfólio?
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Junte-se a milhares de investidores que já descobriram o potencial oculto de suas carteiras.
                Análise completa em segundos, insights que transformam resultados.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="golden-gradient text-black font-bold hover:scale-105 transition-all duration-300 h-14 px-8 text-lg rounded-2xl shadow-xl group"
                  onClick={scrollToAnalyzer}
                >
                  <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Começar Análise Gratuita
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 hover:scale-105 transition-all duration-300 h-14 px-8 text-lg rounded-2xl backdrop-blur-sm"
                >
                  Ver Demonstração
                </Button>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Gratuito para começar
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Sem cartão de crédito
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Análise instantânea
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;