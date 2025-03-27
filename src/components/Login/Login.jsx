import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Flipped } from "react-flip-toolkit";
import styles from "./Login.module.css";
import { GoogleLogo } from "@phosphor-icons/react";
import { loginWithGoogle, loginWithEmail } from "../../services/authService";
import { supabase } from "../../services/supabaseClient";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [justLoggedIn, setJustLoggedIn] = useState(false); // 👈 Novo estado

  useEffect(() => {
    document.title = "Entre em sua conta";

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        try {
          await axios.post(`${API_URL}/api/reports/assign-temp`, {
            tempId: localStorage.getItem('tempId'),
            realEmail: session.user.email
          });
          localStorage.removeItem('tempId');
        } catch (error) {
          console.error("Erro ao associar relatórios:", error);
        }

        // ✅ Redireciona com base na origem do login
        if (justLoggedIn) {
          navigate("/");
        } else {
          navigate("/account");
        }
      }
    };

    checkSession();
  }, [navigate, justLoggedIn]); // 👈 Reage ao justLoggedIn

  const handleGoogleLogin = async () => {
    setJustLoggedIn(true); // 👈 Marca login manual
    await loginWithGoogle();
  };

  const handleEmailLogin = async () => {
    if (!email) {
      setMessage("Digite um e-mail válido.");
      return;
    }
    setJustLoggedIn(true); // 👈 Marca login manual
    await loginWithEmail(email);
    setMessage("Verifique seu e-mail para o link de acesso.");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <Link to="/">
          <h1 className={styles.logo}>
            {["A", "N", "A", "L", "Y", "Z", "E", "R"].map((letter, index) => (
              <Flipped key={index} flipId={`letter-${index}`}>
                <span className={styles.letter}>{letter}</span>
              </Flipped>
            ))}
          </h1>
        </Link>

        <button className={styles.googleButton} onClick={handleGoogleLogin}>
          <GoogleLogo size={20} /> Entrar com Google
        </button>

        <div className={styles.separator}>OU</div>

        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            placeholder="andre@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className={styles.loginButton} onClick={handleEmailLogin}>
          Entrar com Email
        </button>

        {message && <p className={styles.message}>{message}</p>}

        <p className={styles.termsText}>
          Ao continuar, você concorda com nossos <Link to="/termos">Termos de Serviço</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
