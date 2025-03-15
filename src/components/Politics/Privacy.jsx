import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Politics.module.css";
import { ArrowLeft } from "@phosphor-icons/react";

const Privacy = () => {
  useEffect(() => {
    document.title = "Política de Privacidade - Analyzer";
  }, []);

  return (
    <div className={styles.politicsContainer}>
      <Link to="/" className={styles.backButton}>
        <ArrowLeft size={16} />
        Voltar para o site
      </Link>
      <div className={styles.contentWrapper}>
      <h1 className={styles.title}>Política de Privacidade</h1>
      <p className={styles.text}>
        A sua privacidade é importante para nós. Esta Política de Privacidade explica como coletamos, usamos e protegemos suas informações ao utilizar o <strong>Analyzer</strong>.
      </p>

      <h2 className={styles.subtitle}>1. Informações Coletadas</h2>
      <p className={styles.text}>
        Ao utilizar nossa plataforma, podemos coletar os seguintes tipos de informações:
      </p>
      <ul className={styles.list}>
        <li><strong>Informações fornecidas pelo usuário:</strong> URL do site para análise.</li>
        <li><strong>Dados de navegação:</strong> Cookies, endereço IP e informações de dispositivo.</li>
        <li><strong>Dados de pagamento:</strong> Caso opte pelo plano pago, processamos pagamentos de forma segura através de terceiros.</li>
      </ul>

      <h2 className={styles.subtitle}>2. Uso das Informações</h2>
      <p className={styles.text}>
        Utilizamos seus dados para:
      </p>
      <ul className={styles.list}>
        <li>Fornecer análises e relatórios detalhados sobre seu site.</li>
        <li>Melhorar a experiência do usuário na plataforma.</li>
        <li>Enviar atualizações, comunicações e suporte ao usuário.</li>
      </ul>

      <h2 className={styles.subtitle}>3. Compartilhamento de Dados</h2>
      <p className={styles.text}>
        O <strong>Analyzer</strong> não compartilha seus dados com terceiros, exceto:
      </p>
      <ul className={styles.list}>
        <li>Quando exigido por lei.</li>
        <li>Com prestadores de serviço necessários para a operação da plataforma.</li>
      </ul>

      <h2 className={styles.subtitle}>4. Segurança</h2>
      <p className={styles.text}>
        Implementamos medidas de segurança rigorosas para proteger seus dados contra acessos não autorizados, perdas ou alterações.
      </p>

      <h2 className={styles.subtitle}>5. Cookies</h2>
      <p className={styles.text}>
        Utilizamos cookies para melhorar a experiência do usuário. Você pode desativar os cookies no seu navegador, mas isso pode afetar algumas funcionalidades da plataforma.
      </p>

      <h2 className={styles.subtitle}>6. Alterações na Política</h2>
      <p className={styles.text}>
        Podemos atualizar esta política de tempos em tempos. As alterações serão publicadas nesta página e recomendamos que os usuários revisem regularmente.
      </p>

      <h2 className={styles.subtitle}>7. Contato</h2>
      <p className={styles.text}>
        Caso tenha dúvidas sobre nossa Política de Privacidade, entre em contato conosco através de nossos canais oficiais.
      </p>
      </div>
    </div>
  );
};

export default Privacy;
