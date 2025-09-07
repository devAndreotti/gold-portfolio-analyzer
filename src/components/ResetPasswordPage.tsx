import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Lock, ArrowLeft } from 'lucide-react';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const { toast } = useToast();

  // Extract tokens from different possible URL formats
  const accessToken = searchParams.get('access_token') || searchParams.get('token');
  const refreshToken = searchParams.get('refresh_token');
  const type = searchParams.get('type');

  useEffect(() => {
    const setupSession = async () => {
      try {
        // Check if this is a password recovery link
        if (type === 'recovery' && accessToken) {
          console.log('Setting up session for password recovery');
          
          if (refreshToken) {
            // Use both tokens if available
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            
            if (error) {
              console.error('Session setup error:', error);
              throw error;
            }
          } else {
            // Use only access token for recovery
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: '', // Empty refresh token for recovery
            });
            
            if (error) {
              console.error('Session setup error:', error);
              throw error;
            }
          }
          
          setSessionReady(true);
        } else if (!accessToken) {
          // No token, redirect to auth
          toast({
            title: "Link inválido",
            description: "Link de recuperação inválido ou expirado",
            variant: "destructive",
          });
          navigate('/auth');
        } else {
          setSessionReady(true);
        }
      } catch (error: any) {
        console.error('Error setting up session:', error);
        toast({
          title: "Erro",
          description: "Link de recuperação inválido ou expirado",
          variant: "destructive",
        });
        navigate('/auth');
      }
    };

    setupSession();
  }, [accessToken, refreshToken, type, navigate, toast]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Update the password
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Sucesso!",
        description: "Sua senha foi redefinida com sucesso",
      });

      // Sign out and redirect to login
      await supabase.auth.signOut();
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error: any) {
      console.error('Reset password error:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao redefinir senha",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!sessionReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Verificando link de recuperação...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full golden-gradient opacity-10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 opacity-30 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="glass-dark rounded-3xl p-8 border border-yellow-500/20 shadow-2xl backdrop-blur-xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full golden-gradient flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-black" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-2">
                Redefinir Senha
              </h1>
              <p className="text-gray-400">
                Digite sua nova senha para continuar
              </p>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <Input
                  type="password"
                  placeholder="Nova senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/5 border-yellow-500/20 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-yellow-400 focus:ring-yellow-400/20"
                />
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Confirmar nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-white/5 border-yellow-500/20 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-yellow-400 focus:ring-yellow-400/20"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full golden-gradient text-black font-semibold h-12 rounded-xl hover:scale-[1.02] transition-all duration-300"
              >
                {loading ? 'Redefinindo...' : 'Redefinir Senha'}
              </Button>
            </form>

            <div className="text-center mt-6">
              <button
                onClick={() => navigate('/auth')}
                className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar ao login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;