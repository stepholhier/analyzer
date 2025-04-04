import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { Flipped } from "react-flip-toolkit";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Logo */}
        <Link to="/">
              <h1 className={styles.logo}>
                {["A", "N", "A", "L", "Y", "Z", "E", "R"].map((letter, index) => (
                  <Flipped key={index} flipId={`letter-${index}`}>
                    <span className={styles.letter}>{letter}</span>
                  </Flipped>
                ))}
              </h1>
            </Link>

        {/* Descrição */}
        <p className={styles.footerDescription}>
          Análise avançada para otimizar a performance do seu site.
        </p>

        {/* Copyright automático */}
        <p className={styles.copyright}>
          Copyright &copy; {new Date().getFullYear()} - Todos os direitos reservados.
        </p>
      </div>

      {/* Links legais */}
      <div className={styles.legalLinks}>
        <a href="/termos">Termos de uso</a>
        <a href="/privacidade">Política de privacidade</a>
      </div>
    </footer>
  );
};

export default Footer;
