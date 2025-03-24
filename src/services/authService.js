import { supabase } from './supabaseClient';

export const loginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/account'  // ⚡️ Redireciona direto pra conta após login
      }
    });

    if (error) throw error;
    return data;
};


export const loginWithEmail = async (email) => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: window.location.origin + '/payment', // mesmo redirecionamento
    },
  });
  if (error) console.error('Erro Email:', error.message);
};
