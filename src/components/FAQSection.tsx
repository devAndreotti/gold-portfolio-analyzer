import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Como funciona a análise de portfólio?",
      answer: "Nossa IA analisa a composição dos seus investimentos, avalia diversificação, risco e retorno esperado, comparando com benchmarks de mercado e fornecendo recomendações personalizadas baseadas no seu perfil."
    },
    {
      question: "Meus dados estão seguros?",
      answer: "Sim! Todos os dados são criptografados e processados localmente. Não armazenamos informações pessoais ou detalhes dos seus investimentos em nossos servidores."
    },
    {
      question: "Posso analisar qualquer tipo de ativo?",
      answer: "Suportamos ações brasileiras e americanas, FIIs, ETFs, renda fixa e criptomoedas. Nossa base de dados é atualizada constantemente para incluir novos ativos."
    },
    {
      question: "Com que frequência devo refazer a análise?",
      answer: "Recomendamos uma análise mensal ou sempre que houver mudanças significativas no seu portfólio, como novos aportes ou mudança de estratégia."
    },
    {
      question: "As recomendações substituem um consultor financeiro?",
      answer: "Nossa ferramenta oferece insights valiosos, mas não substitui o aconselhamento profissional personalizado. Use como complemento à orientação de especialistas."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-full golden-gradient flex items-center justify-center mb-6 mx-auto">
            <HelpCircle className="h-8 w-8 text-black" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tire suas dúvidas sobre nossa plataforma de análise de investimentos
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="glass-dark border-yellow-500/30 hover-glow transition-all duration-300 stagger-animation"
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-yellow-500/5 transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                  <ChevronDown
                    className={`h-5 w-5 text-yellow-400 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-yellow-500/20">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;