import { useEffect } from 'react';
import axios from 'axios';
import { supabase } from '../../services/supabaseClient';

const API_URL = import.meta.env.VITE_API_URL;

const Payment = () => {
  useEffect(() => {
    const processPayment = async () => {
      const url = localStorage.getItem('pendingUrl');
      const { data: { session } } = await supabase.auth.getSession();
      const email = session?.user?.email;

      if (!url || !email) {
        alert("Erro ao processar pagamento.");
        return;
      }

      const reportText = `
🔍 Relatório de Análise para: ${url}
1. Conteúdo bom.
2. SEO bom.
3. Imagens otimizadas.
4. Acessível.
5. Sugestões: otimize carregamento.`;

      try {
        await axios.post(`${API_URL}/api/reports/save`, {
          url,
          content: reportText,
          userEmail: email,
        });

        localStorage.removeItem('pendingUrl');
        window.location.href = "/account";

      } catch (error) {
        console.error("Erro ao salvar relatório:", error);
        alert("Erro ao salvar relatório.");
      }
    };

    processPayment();
  }, []);

  return <div>Processando pagamento... ⏳</div>;
};

export default Payment;
