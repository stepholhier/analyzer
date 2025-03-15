import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./Home.module.css";
import Img1 from '../../assets/01.png';
import Img2 from '../../assets/02.png';
import Img3 from '../../assets/03.png';

const AnimatedSection = () => {
  const cardsRef = useRef([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

        setVisibleCards((prev) => {
          const alreadyVisible = prev.includes(index);

          if (isVisible && !alreadyVisible) {
            return [...prev, index]; // Adiciona se estiver visível
          } else if (!isVisible && alreadyVisible && scrollY < lastScrollY) {
            return prev.filter((i) => i !== index); // Remove se sumir da tela ao subir
          }

          return prev;
        });
      });

      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className={styles.sectionWrapper} id="oquee">
      <motion.div
        className={styles.animatedSection}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <h2>Descubra como melhorar seu site <br /> Tenha um relatório completo</h2>

        <div className={styles.cardsContainer}>
          {[
            {
              title: "Identifique e corrija falhas",
              desc: "Receba um diagnóstico detalhado e saiba exatamente onde melhorar.",
              img: Img1,
            },
            {
              title: "Melhore velocidade e SEO",
              desc: "Crie respostas precisas e relevantes que representem sua marca.",
              img: Img2,
            },
            {
              title: "Proteja seu site e seus visitantes",
              desc: "Detecte vulnerabilidades e garanta um ambiente confiável, prevenindo falhas e ameaças digitais.",
              img: Img3,
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={styles.card}
              initial={{ opacity: 0 }}
              animate={{ opacity: visibleCards.includes(index) ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: index * 0.3 }} // Delay diferente para cada card
            >
              <img src={card.img} alt={card.title} />
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedSection;
