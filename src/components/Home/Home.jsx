import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './Home.module.css';
import { supabase } from '../../services/supabaseClient'; // Importa Supabase
import OpenAILogo from '../../assets/openailogo.svg';
import AreaAbout from './AreaAbout';
import Price from './Price';
import Faq from './Faq';

const SiteAnalyzer = () => {
  useEffect(() => {
    document.title = "Analyzer";
  }, []);

  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const vantaRef = useRef(null);

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

    setIsLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const email = session?.user?.email;

      if (!email) {
        alert("Faça login antes de analisar.");
        window.location.href = "/login";
        return;
      }

      // Envia para backend com IA
      const response = await axios.post('http://localhost:5001/api/ia/analyze', {
        email,
        url
      });

      console.log("Relatório gerado:", response.data);

      // Redireciona após sucesso
      window.location.href = "/account";

    } catch (error) {
      console.error('Erro ao analisar o site:', error);
      alert("Erro ao analisar o site.");
    } finally {
      setIsLoading(false);
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

          {/* Botão com loading animado */}
          {isLoading ? (
            <button className={styles.loadingButton} disabled>
              🔍 Analisando seu site...
            </button>
          ) : (
            <button onClick={handleAnalyze} className={styles.button}>
              Analisar agora
            </button>
          )}
        </div>
      </div>

      {/* Área About */}
      <AreaAbout />

      {/* Price */}
      <Price />

      {/* FAQ */}
      <Faq />
    </div>
  );
};

export default SiteAnalyzer;
