import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../services/supabaseClient';
import { loadStripe } from '@stripe/stripe-js';
import styles from './Home.module.css';
import OpenAILogo from '../../assets/openailogo.svg';
import AreaAbout from './AreaAbout';
import Price from './Price';
import Faq from './Faq';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

const SiteAnalyzer = () => {
  const [url, setUrl] = useState('');
  const vantaRef = useRef(null);

  useEffect(() => {
    document.title = "Analyzer";
  }, []);

  useEffect(() => {
    if (window.VANTA) {
      const vantaEffect = window.VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x1e1e1e,
        backgroundColor: 0x000000,
        showDots: false,
      });

      return () => vantaEffect && vantaEffect.destroy();
    }
  }, []);

  const handleAnalyze = async () => {
    if (!url) {
      alert("Por favor, insira a URL do site.");
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      alert("Faça login antes de analisar o site.");
      window.location.href = "/login";
      return;
    }

    try {
      const email = session.user.email;

      const response = await axios.post(`${API_URL}/api/stripe/create-checkout-session`, {
        url,
        email,
      });

      const { id } = response.data;

      const stripe = await loadStripe(STRIPE_KEY);
      await stripe.redirectToCheckout({ sessionId: id });

    } catch (error) {
      console.error("Erro ao criar sessão Stripe:", error);
      alert("Erro ao iniciar pagamento.");
    }
  };

  return (
    <div ref={vantaRef} className={styles.container} id="siteInput">
      <div className={styles.technologyBadge}>
        <span>Com tecnologia oficial da</span>
        <img src={OpenAILogo} alt="OpenAI Logo" className={styles.badgeIcon} />
      </div>

      <div className={styles.content}>
        <h1 className={`${styles.titleAbout} ${styles.animatedTitle}`}>
          Potencialize seu site agora
        </h1>

        <p className={styles.pAbout}>Analise, otimize e acelere seu site em segundos!</p>

        <div className={styles.inputGroup}>
          <div className={styles.inputGlow}></div>
          <input
            type="text"
            placeholder="Insira a URL do seu site"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={styles.input}
          />

          <button onClick={handleAnalyze} className={styles.button}>
            Analisar agora
          </button>
        </div>
      </div>

      <AreaAbout />
      <Price />
      <Faq />
    </div>
  );
};

export default SiteAnalyzer;
