import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Investidora",
      avatar: "👩‍💼",
      rating: 5,
      text: "A análise identificou pontos de melhoria que eu não havia percebido. Meu portfólio está muito mais equilibrado agora."
    },
    {
      name: "João Santos",
      role: "Empresário",
      avatar: "👨‍💼", 
      rating: 5,
      text: "Excelente ferramenta! As recomendações são precisas e me ajudaram a diversificar melhor meus investimentos."
    },
    {
      name: "Ana Costa",
      role: "Consultora Financeira",
      avatar: "👩‍💻",
      rating: 5,
      text: "Uso com meus clientes e os resultados são impressionantes. A IA consegue identificar riscos que passariam despercebidos."
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-4">
            O Que Nossos Usuários Dizem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Histórias reais de investidores que transformaram seus resultados
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="glass-dark border-yellow-500/30 hover-lift hover-glow transition-all duration-300 stagger-animation group relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-yellow-400/20 group-hover:text-yellow-400/40 transition-colors duration-300">
                <Quote className="h-8 w-8" />
              </div>
              
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-300 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;