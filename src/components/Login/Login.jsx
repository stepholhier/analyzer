import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Flipped } from "react-flip-toolkit";
import styles from "./Login.module.css";
import { GoogleLogo } from "@phosphor-icons/react";

const Login = () => {

    useEffect(() => {
        document.title = "Entre em sua conta";
      }, []);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
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

        {/* Botão de Login com Google */}
        <button className={styles.googleButton}>
          <GoogleLogo size={20} /> Entrar com Google
        </button>

        {/* Separador */}
        <div className={styles.separator}>OU</div>

        {/* Campo de Email */}
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input type="email" placeholder="andre@example.com" />
        </div>

        {/* Botão de Login com Email */}
        <button className={styles.loginButton}>Entrar com Email</button>

        {/* Texto sobre Termos */}
        <p className={styles.termsText}>
          Ao continuar, você concorda com nossos <Link to="/termos">Termos de Serviço</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
