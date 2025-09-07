
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';
import { TrendingUp, Shield, Target } from 'lucide-react';
import ForgotPasswordForm from './ForgotPasswordForm';

interface AuthPageProps {
  onAuthSuccess: (user: User) => void;
}

const AuthPage = ({ onAuthSuccess }: AuthPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        onAuthSuccess(session.user);
      }
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth event:', event, session);
        if (event === 'SIGNED_IN' && session?.user) {
          onAuthSuccess(session.user);
          toast({
            title: "Login realizado com sucesso!",
            description: "Bem-vindo ao Portfolio Analyzer",
          });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [onAuthSuccess, toast]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        if (data.user) {
          onAuthSuccess(data.user);
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`
          }
        });
        
        if (error) throw error;
        
        toast({
          title: "Conta criada com sucesso!",
          description: "Verifique seu email para confirmar a conta",
        });
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Erro na autenticação",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        console.error('Google auth error:', error);
        throw error;
      }
    } catch (error: any) {
      console.error('Google auth failed:', error);
      toast({
        title: "Erro no login com Google",
        description: error.message || "Falha na autenticação com Google",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full golden-gradient opacity-10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 opacity-30 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left side - Hero content */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 bg-clip-text text-transparent leading-tight">
              Análise Inteligente de Portfólio
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Descubra o potencial da sua carteira de investimentos com análise estratégica baseada em IA. 
              Identifique oportunidades, gerencie riscos e otimize seus retornos.
            </p>
            
            {/* Feature highlights */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full golden-gradient flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-1">Análise Estratégica</h3>
                  <p className="text-gray-400 text-sm">Identifique o estilo da sua carteira e receba insights personalizados</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full golden-gradient flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-1">Gestão de Risco</h3>
                  <p className="text-gray-400 text-sm">Avalie diversificação e identifique concentrações excessivas</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full golden-gradient flex items-center justify-center flex-shrink-0">
                  <Target className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-1">Metas Financeiras</h3>
                  <p className="text-gray-400 text-sm">Alinhe sua carteira com seus objetivos de investimento</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth form */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="glass-dark rounded-3xl p-8 border border-yellow-500/20 shadow-2xl backdrop-blur-xl">
              {/* Mobile header */}
              <div className="lg:hidden text-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-2">
                  Portfolio Analyzer
                </h1>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {isLogin ? 'Bem-vindo de volta' : 'Criar conta'}
                </h2>
                <p className="text-gray-400">
                  {isLogin ? 'Entre na sua conta para continuar' : 'Comece sua jornada de investimentos'}
                </p>
              </div>

              <div className="space-y-6">
                <Button
                  onClick={handleGoogleAuth}
                  disabled={loading}
                  className="w-full bg-white text-black hover:bg-gray-100 border-0 flex items-center justify-center gap-3 h-12 font-medium transition-all duration-300 hover:scale-[1.02]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {loading ? 'Carregando...' : 'Continuar com Google'}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-yellow-500/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-transparent text-gray-400">ou continue com email</span>
                  </div>
                </div>

                <form onSubmit={handleEmailAuth} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Seu melhor email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/5 border-yellow-500/20 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-yellow-400 focus:ring-yellow-400/20"
                    />
                  </div>
                  
                  <div>
                    <Input
                      type="password"
                      placeholder="Sua senha secreta"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-white/5 border-yellow-500/20 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-yellow-400 focus:ring-yellow-400/20"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full golden-gradient text-black font-semibold h-12 rounded-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    {loading ? 'Carregando...' : (isLogin ? 'Entrar agora' : 'Criar conta grátis')}
                  </Button>
                </form>

                <div className="text-center space-y-3">
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors duration-300 block w-full"
                  >
                    {isLogin ? 'Não tem conta? Criar uma agora' : 'Já tem conta? Entrar'}
                  </button>
                  
                  {isLogin && (
                    <ForgotPasswordForm />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
