import { useState } from "react";
import styles from "./Home.module.css";
import { Plus, X } from "@phosphor-icons/react"; // Ícones de abrir/fechar
import FaqIcon from "../../assets/circle.png"; // Importando a imagem

const faqs = [
  {
    question: "Como a análise do site funciona?",
    answer: "Nosso sistema faz uma varredura completa no seu site, verificando SEO, velocidade, segurança e outros fatores importantes para a performance.",
  },
  {
    question: "A análise do site é gratuita?",
    answer: "Sim! Você pode realizar uma análise inicial gratuita. Para um relatório detalhado com recomendações personalizadas, oferecemos um plano premium.",
  },
  {
    question: "Meu site pode ser penalizado no Google?",
    answer: "Se o seu site não estiver otimizado, pode perder posições no Google. Nossa ferramenta identifica problemas e sugere melhorias para evitar penalizações.",
  },
  {
    question: "Quais aspectos do site são analisados?",
    answer: "Analisamos SEO, segurança, velocidade, responsividade e outros fatores técnicos que influenciam no desempenho do seu site.",
  },
  {
    question: "Como aplicar as melhorias recomendadas?",
    answer: "Nosso relatório fornece instruções claras para otimização. Se precisar de ajuda, oferecemos suporte para implementação.",
  },
  {
    question: "A análise é compatível com qualquer site?",
    answer: "Sim! Nossa ferramenta pode analisar qualquer site, independentemente da plataforma ou tecnologia utilizada.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection} id="faq">
      <div className={styles.faqContainer}>
        <div className={styles.faqLeft}>
          <h2 className={styles.faqTitle}>Perguntas Frequentes</h2>
          <p className={styles.faqSubtitle}>
            Encontre respostas para as dúvidas mais comuns sobre nossa plataforma.
          </p>
          <img src={FaqIcon} className={styles.faqImage} />
        </div>

        <div className={styles.faqRight}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${openIndex === index ? styles.faqOpen : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className={styles.faqQuestion}>
                {faq.question}
                {openIndex === index ? (
                  <X size={20} className={styles.icon} />
                ) : (
                  <Plus size={20} className={styles.icon} />
                )}
              </div>
              {openIndex === index && (
                <div className={styles.faqAnswer}>{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
