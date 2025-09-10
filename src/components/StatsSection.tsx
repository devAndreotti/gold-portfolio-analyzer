import { TrendingUp, Users, BarChart3, Award } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: "50,000+",
      label: "Investidores Ativos",
      description: "Confiam em nossa plataforma"
    },
    {
      icon: BarChart3,
      value: "R$ 2.5B+",
      label: "Patrimônio Analisado",
      description: "Volume total processado"
    },
    {
      icon: TrendingUp,
      value: "94%",
      label: "Taxa de Sucesso",
      description: "Recomendações efetivas"
    },
    {
      icon: Award,
      value: "4.9/5",
      label: "Avaliação dos Usuários",
      description: "Satisfação comprovada"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-4">
            Números que Inspiram Confiança
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Resultados comprovados por milhares de investidores que transformaram seus portfólios
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover-lift stagger-animation"
            >
              <div className="w-20 h-20 rounded-full golden-gradient flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <stat.icon className="h-10 w-10 text-black" />
              </div>
              <div className="text-4xl font-bold text-yellow-400 mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                {stat.value}
              </div>
              <h3 className="text-xl font-semibold mb-2">{stat.label}</h3>
              <p className="text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;