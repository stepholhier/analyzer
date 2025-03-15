import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './Home.module.css';
import { CheckCircle, XCircle, LockKey } from "@phosphor-icons/react";
import OpenAILogo from '../../assets/openailogo.svg';
import  AreaAbout from './AreaAbout';
import Price from './Price';
import Faq from './Faq';


const SiteAnalyzer = () => {

  useEffect(() => {
    document.title = "Analyzer";
  }, []);
  
  const [url, setUrl] = useState('');
  const [report, setReport] = useState(false
  //       {
  //    topics: [
  //     { name: "SEO", status: "ok" },
  //    { name: "Velocidade", status: "error", suggestion: "Melhore o tempo de carregamento." },
  //     { name: "Segurança", status: "ok" },
  //     { name: "Banners", status: "ok" },
  //     { name: "Logo", status: "error", suggestion: "Melhore a qualidade do logo e tamanho" }
  //   ]
  // }
  );
  // const [showPopup, setShowPopup] = useState(false);
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
    setReport(null);
    try {
      const response = await axios.post('http://localhost:3001/api/analyze-site', { url });
      setReport(response.data.analysis);
    } catch (error) {
      console.error('Erro ao analisar o site:', error);
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

        {report && (
          <div className={styles.containerBlurred}>
  <div className={styles.blurredSection}>
    <h3 className={styles.reportTitle}>Relatório de Análise</h3>

    {/* Lista de tópicos visíveis */}
    <ul className={styles.reportList}>
      {report.topics.slice(0, 3).map((topic, index) => (
        <li key={index} className={styles.reportItem}>
          {/* Ícones bonitos para status */}
          {topic.status === 'ok' ? (
            <CheckCircle size={20} weight="fill" className={styles.iconOk} />
          ) : (
            <XCircle size={20} weight="fill" className={styles.iconError} />
          )}

          <span className={styles.reportText}>
            {topic.name}:
          </span>

          {/* Exibir mensagem personalizada quando estiver OK */}
          {topic.status === 'ok' ? (
            <span className={styles.successMessage}>
              {`${topic.name} configurado corretamente.`}
            </span>
          ) : (
            <span className={styles.suggestion}>{topic.suggestion}</span>
          )}
        </li>
      ))}
    </ul>

    {/* Seção bloqueada com blur correto */}
    <div className={styles.lockedSection}>
      <ul className={styles.lockedList}>
        {report.topics.slice(3).map((topic, index) => (
          <li key={index} className={styles.lockedItem}>
            <span className={styles.blurredText}>{topic.name}: 🔒 Informação Bloqueada</span>
          </li>
        ))}
      </ul>

      <button className={styles.unlockButton} onClick={() => window.location.href = "/signin"}>
        <LockKey size={16} /> Quero meu relatório completo
      </button>
    </div>
  </div>
  </div>
)}
      </div>

      {/* {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Obtenha o relatório completo</h3>
            <p>Cadastre-se agora para acessar todas as informações do seu site.</p>
            <button className={styles.registerButton} onClick={() => window.location.href = "/signin"}>
              Criar Conta
            </button>
            <button className={styles.closeButton} onClick={() => setShowPopup(false)}>
              Fechar
            </button>
          </div>
        </div>
      )} */}


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
