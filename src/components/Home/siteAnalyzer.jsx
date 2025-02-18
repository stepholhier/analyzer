import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './siteAnalyzer.module.css';

const LoadingScreen = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#1e1e2f',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    zIndex: 1000,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };

  return (
    <div style={containerStyle}>
      <div style={{ fontSize: '4rem', animation: 'fly 1.5s infinite ease-in-out' }}>🚀</div>
      <p>Analisando...</p>
    </div>
  );
};

const SiteAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFullReport, setShowFullReport] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
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

      return () => {
        if (vantaEffect) vantaEffect.destroy();
      };
    }
  }, []);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setReport(null);

    try {
      const response = await axios.post('http://localhost:3001/api/analyze-site', { url });
      setReport(response.data.analysis);

      console.log("Resposta da API:", response.data);
    } catch (error) {
      console.error('Error analyzing site:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={vantaRef} className={styles.container}>
      {isLoading && <LoadingScreen />}
      <div className={styles.content}>
        <h1 className={`${styles.titleAbout} ${styles.animatedTitle}`}>
          Potencialize seu site agora
        </h1>
        <p className={styles.pAbout}>Analise, otimize e acelere seu site em segundos!</p>
        <div className={styles.inputGroup}>
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

        {report && (
          <div className={styles.report}>
            <h3 className={styles.reportTitle}>Relatório de Análise</h3>
            <ul className={styles.reportList}>
              {report.topics.slice(0, 3).map((topic, index) => (
                <li key={index} className={styles.reportItem}>
                  <span className={topic.status === 'ok' ? styles.statusOk : styles.statusError}>
                    {topic.status === 'ok' ? '✔️' : '❌'}
                  </span>
                  <span className={styles.reportText}>{topic.name}</span>
                  {topic.status === 'error' && (
                    <p className={styles.suggestion}>{topic.suggestion}</p>
                  )}
                </li>
              ))}
            </ul>

            {!showFullReport && (
              <div className={styles.blurredSection}>
                <p className={styles.blurredText}>
                  🔒 Descubra agora o relatório completo!
                </p>
                <button className={styles.unlockButton} onClick={() => setShowPopup(true)}>
                  Quero meu relatório completo
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Crie sua conta e obtenha o relatório completo</h3>
            <p>Cadastre-se agora para acessar todas as informações do seu site.</p>
            <button className={styles.registerButton} onClick={() => window.location.href = "/register"}>
              Criar Conta
            </button>
            <button className={styles.closeButton} onClick={() => setShowPopup(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteAnalyzer;
