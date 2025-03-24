import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Flipped } from "react-flip-toolkit";
import styles from "./Login.module.css";
import { GoogleLogo } from "@phosphor-icons/react";
import { loginWithGoogle, loginWithEmail } from "../../services/authService"

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.title = "Entre em sua conta";

    // Opcional: redirecionar se já estiver logado (Supabase tem método pra isso)
    // Exemplo:
    // const session = await supabase.auth.getSession();
    // if (session) navigate("/account");
  }, [navigate]);

  const handleGoogleLogin = async () => {
    await loginWithGoogle(); // Redireciona para Google → payment
  };

  const handleEmailLogin = async () => {
    if (!email) {
      setMessage("Digite um e-mail válido.");
      return;
    }
    await loginWithEmail(email);
    setMessage("Verifique seu e-mail para o link de acesso.");
  };

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
        <button className={styles.googleButton} onClick={handleGoogleLogin}>
          <GoogleLogo size={20} /> Entrar com Google
        </button>

        {/* Separador */}
        <div className={styles.separator}>OU</div>

        {/* Campo de Email */}
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            placeholder="andre@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Botão de Login com Email */}
        <button className={styles.loginButton} onClick={handleEmailLogin}>
          Entrar com Email
        </button>

        {message && <p className={styles.message}>{message}</p>}

        {/* Texto sobre Termos */}
        <p className={styles.termsText}>
          Ao continuar, você concorda com nossos <Link to="/termos">Termos de Serviço</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
