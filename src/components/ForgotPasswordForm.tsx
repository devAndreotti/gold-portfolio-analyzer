import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First, send the reset password email using Supabase Auth
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      // Also send a custom email using our edge function
      try {
        await supabase.functions.invoke('send-reset-password', {
          body: {
            email,
            resetUrl: `${window.location.origin}/reset-password`,
          },
        });
      } catch (emailError) {
        console.log('Custom email failed, but Supabase email should work:', emailError);
      }

      setEmailSent(true);
      toast({
        title: "Email enviado!",
        description: "Verifique seu email para redefinir sua senha",
      });

    } catch (error: any) {
      console.error('Forgot password error:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao enviar email de recuperação",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
        <p className="text-sm text-green-400">
          Email de recuperação enviado! Verifique sua caixa de entrada.
        </p>
        <button
          onClick={() => {
            setEmailSent(false);
            setEmail('');
          }}
          className="text-yellow-400 hover:text-yellow-300 text-xs mt-2 transition-colors duration-300"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <details className="text-left">
      <summary className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors duration-300 cursor-pointer">
        Esqueceu sua senha?
      </summary>
      <form onSubmit={handleForgotPassword} className="mt-4 space-y-3">
        <Input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white/5 border-yellow-500/20 text-white placeholder:text-gray-500 h-10 rounded-xl focus:border-yellow-400 focus:ring-yellow-400/20 text-sm"
        />
        <Button
          type="submit"
          disabled={loading || !email}
          className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 h-10 rounded-xl text-sm transition-all duration-300"
        >
          {loading ? 'Enviando...' : 'Enviar email de recuperação'}
        </Button>
      </form>
    </details>
  );
};

export default ForgotPasswordForm;