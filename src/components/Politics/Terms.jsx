import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Politics.module.css";
import { ArrowLeft } from "@phosphor-icons/react";

const Terms = () => {
  useEffect(() => {
    document.title = "Termos de Uso - Analyzer";
  }, []);

  return (
    <div className={styles.politicsContainer}>
      <Link to="/" className={styles.backButton}>
        <ArrowLeft size={16} />
        Voltar para o site
      </Link>
      <div className={styles.contentWrapper}>
      <h1 className={styles.title}>Termos de Uso</h1>
      <p className={styles.text}>
        Bem-vindo(a) ao <strong>Analyzer</strong>. Ao acessar e utilizar nossa plataforma de análise de sites, você concorda com os seguintes termos e condições de uso. Caso não concorde com qualquer um dos termos, recomendamos que não utilize nosso serviço.
      </p>

      <h2 className={styles.subtitle}>1. Sobre o Serviço</h2>
      <p className={styles.text}>
        O <strong>Analyzer</strong> é uma plataforma que fornece diagnósticos detalhados sobre a performance, SEO, velocidade e segurança de sites, oferecendo insights e recomendações para melhorias.
      </p>

      <h2 className={styles.subtitle}>2. Uso da Plataforma</h2>
      <p className={styles.text}>
        Você concorda em utilizar o serviço apenas para fins legais e dentro das regulamentações vigentes. É proibido:
      </p>
      <ul className={styles.list}>
        <li>Usar a plataforma para atividades fraudulentas ou ilícitas.</li>
        <li>Coletar dados de terceiros sem consentimento.</li>
        <li>Distribuir ou compartilhar informações de maneira não autorizada.</li>
      </ul>

      <h2 className={styles.subtitle}>3. Pagamentos e Assinatura</h2>
      <p className={styles.text}>
        O plano <strong>Pioneiros</strong> é oferecido por um valor único e permite acesso ilimitado às funcionalidades do serviço. Todos os pagamentos são processados de forma segura e não são reembolsáveis, exceto em casos específicos analisados pelo suporte.
      </p>

      <h2 className={styles.subtitle}>4. Privacidade e Dados</h2>
      <p className={styles.text}>
        Nossa política de privacidade detalha como tratamos seus dados. Ao usar o <strong>Analyzer</strong>, você concorda com a coleta e uso de informações conforme descrito na <Link to="/privacidade">Política de Privacidade</Link>.
      </p>

      <h2 className={styles.subtitle}>5. Alterações nos Termos</h2>
      <p className={styles.text}>
        O <strong>Analyzer</strong> pode atualizar estes termos a qualquer momento. Recomendamos revisar esta página periodicamente para estar ciente de quaisquer alterações.
      </p>

      <h2 className={styles.subtitle}>6. Contato</h2>
      <p className={styles.text}>
        Caso tenha dúvidas sobre nossos Termos de Uso, entre em contato conosco através de nossos canais oficiais.
      </p>
      </div>
    </div>
  );
};

export default Terms;
