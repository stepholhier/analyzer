import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { supabase } from '../../services/supabaseClient';
import styles from './Payment.module.css';

const API_URL = import.meta.env.VITE_API_URL;

const Payment = () => {
  const [error, setError] = useState(null);
  const alreadyProcessed = useRef(false);

  useEffect(() => {
    document.title = "Analyzer - Pagamento";
  }, []);

  useEffect(() => {
    const processPayment = async () => {
      if (alreadyProcessed.current) return;
      alreadyProcessed.current = true;

      const url = localStorage.getItem('pendingUrl');
      const { data: { session } } = await supabase.auth.getSession();
      const email = session?.user?.email;

      if (!url || !email) {
        setError("Erro ao processar pagamento. Tente novamente mais tarde!");
        return;
      }

      try {
        await axios.post(`${API_URL}/api/ia/analyze`, {
          url,
          email,
        });

        localStorage.removeItem('pendingUrl');
        window.location.href = "/account";

      } catch (error) {
        console.error("Erro ao salvar relatório:", error);
        setError("Erro ao salvar relatório.");
      }
    };

    processPayment();
  }, []);

  return (
    <div className={styles.wrapper}>
      {error ? (
        <div className={styles.errorBox}>
          <p className={styles.error}>{error}</p>
          <button className={styles.backButton} onClick={() => window.location.href = "/"}>
            Voltar para Home
          </button>
        </div>
      ) : (
        <div className={styles.loadingBox}>
          <div className={styles.loader}></div>
          <p className={styles.message}>Gerando relatório, aguarde!</p>
        </div>
      )}
    </div>
  );
};

export default Payment;
