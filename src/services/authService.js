import { supabase } from './supabaseClient';

export const loginWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + '/payment', // redirecionar após login
    },
  });
  if (error) console.error('Erro Google:', error.message);
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
