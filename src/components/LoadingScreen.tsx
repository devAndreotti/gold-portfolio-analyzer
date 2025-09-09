import { useEffect, useState } from "react";
import { TrendingUp, PieChart, Target, DollarSign, BarChart3, Coins } from "lucide-react";

interface LoadingScreenProps {
  isVisible: boolean;
}

const LoadingScreen = ({ isVisible }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: BarChart3, text: "Analisando ativos da carteira...", color: "text-blue-400" },
    { icon: PieChart, text: "Calculando diversificação...", color: "text-green-400" },
    { icon: TrendingUp, text: "Avaliando performance histórica...", color: "text-yellow-400" },
    { icon: Target, text: "Alinhando com seus objetivos...", color: "text-purple-400" },
    { icon: DollarSign, text: "Projetando retornos esperados...", color: "text-emerald-400" },
    { icon: Coins, text: "Gerando recomendações personalizadas...", color: "text-amber-400" }
  ];

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      setCurrentStep(0);
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return steps.length - 1;
        }
        return prev + 1;
      });
    }, 400);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const CurrentIcon = steps[currentStep]?.icon || TrendingUp;

  return (
    <div className="fixed inset-0 z-[10000] bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center backdrop-blur-sm">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-yellow-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-yellow-500/5 to-amber-500/5 blur-3xl animate-spin-slow"></div>
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Main Loading Icon */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto rounded-full golden-gradient flex items-center justify-center shadow-2xl animate-pulse">
            <CurrentIcon className={`h-16 w-16 text-black animate-bounce ${steps[currentStep]?.color}`} />
          </div>
          
          {/* Rotating Rings */}
          <div className="absolute inset-0 w-32 h-32 mx-auto">
            <div className="w-full h-full rounded-full border-4 border-yellow-500/30 animate-spin"></div>
          </div>
          <div className="absolute inset-2 w-28 h-28 mx-auto">
            <div className="w-full h-full rounded-full border-2 border-amber-400/40 animate-spin-reverse"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full golden-gradient transition-all duration-500 ease-out rounded-full shadow-lg"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <div className="text-yellow-400 text-sm font-medium mt-2">
            {Math.min(Math.round(progress), 100)}% concluído
          </div>
        </div>

        {/* Current Step */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white mb-2">
            Analisando seu Portfólio
          </h3>
          <div className="flex items-center justify-center space-x-3">
            <CurrentIcon className={`h-5 w-5 ${steps[currentStep]?.color} animate-pulse`} />
            <p className="text-lg text-gray-300 animate-fade-in">
              {steps[currentStep]?.text}
            </p>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index <= currentStep 
                  ? 'bg-yellow-400 scale-125' 
                  : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Fun Facts */}
        <div className="mt-8 p-4 bg-white/5 rounded-xl border border-yellow-500/20">
          <p className="text-sm text-gray-400">
            💡 <span className="text-yellow-400">Dica:</span> Diversificação é fundamental para reduzir riscos e otimizar retornos no longo prazo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;