import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./Home.module.css";
import { Check } from "@phosphor-icons/react";
import FireGif from "../../assets/fire.gif";

const Price = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className={styles.priceSection}>
      {/* SVG de fundo */}
      <svg className={styles.priceBg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <defs>
          <linearGradient id="fadeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#fadeGrad)" />
      </svg>

      <motion.div
        className={styles.priceContainer}
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <h2 className={styles.priceTitle} id="precos">Preços</h2>
        <p className={styles.priceSubtitle}>
          Aproveite a nossa oferta especial e analise seu site agora mesmo.
        </p>

        <div className={styles.priceCard}>
          <span className={styles.limitedOffer}>
          <img src={FireGif} alt="Fogo animado" className={styles.fireIcon} />
            Por tempo limitado
          </span>
          <h3 className={styles.planName}>Pioneiros</h3>
          <p className={styles.planDesc}>
            Otimize seu site com nossa análise avançada e personalizada
          </p>
          <div className={styles.planPrice}>
            <strong>R$ 59</strong> <span>/único</span>
          </div>
          <button className={styles.priceButton} onClick={() => document.getElementById("siteInput").scrollIntoView({ behavior: "smooth" })}>Analisar meu site</button>

          <ul className={styles.benefitsList}>
            {[
              "Análise Completa do Site",
              "Relatório Detalhado",
              "Correções Recomendadas",
              "Acompanhamento por IA",
              "Acesso Vitalício",
            ].map((benefit, index) => (
              <li key={index}>
                <Check size={18} weight="bold" className={styles.checkIcon} />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Price;
