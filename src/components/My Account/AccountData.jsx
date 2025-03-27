import { useState, useEffect } from "react";
import styles from "./Account.module.css";
import { supabase } from "../../services/supabaseClient";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const MeusDados = () => {
  const [dados, setDados] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    nascimento: "",
  });

  const [cpfBloqueado, setCpfBloqueado] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const email = session?.user?.email;
      const nome = session?.user?.user_metadata?.full_name || "";

      if (email) {
        try {
          const { data } = await axios.post(`${API_URL}/api/userdata/save`, dados);
          setDados(data || { email, nome, cpf: "", telefone: "", nascimento: "" });
          if (data?.cpf) setCpfBloqueado(true);
        } catch (err) {
          console.error("Erro ao buscar dados:", err);
          setDados({ email, nome, cpf: "", telefone: "", nascimento: "" });
        }
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cpf" && value.length >= 11) {
      setCpfBloqueado(true);
    }

    setDados((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSalvar = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
  
    const email = session?.user?.email;
  
    if (!email) {
      alert("Não foi possível identificar o usuário.");
      return;
    }
  
    try {
      await axios.post(`${API_URL}/api/userdata/save`, {
        ...dados,
        email, // força o email
      });
      alert("Dados salvos com sucesso! ✔️");
    } catch (err) {
      console.error("Erro ao salvar dados:", err);
      alert("Erro ao salvar dados.");
    }
  };
  

  return (
    <div className={styles.formContainer}>
      <h2>Meus Dados</h2>
      <div className={styles.gridForm}>
        <div className={styles.formGroup}>
          <label>Nome *</label>
          <input
            type="text"
            name="nome"
            value={dados.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email *</label>
          <input type="email" value={dados.email} disabled />
        </div>

        <div className={styles.formGroup}>
          <label>CPF *</label>
          <input
            type="text"
            name="cpf"
            value={dados.cpf}
            onChange={handleChange}
            required
            disabled={cpfBloqueado}
            placeholder="123.456.789-00"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Data de nascimento *</label>
          <input
            type="date"
            name="nascimento"
            value={dados.nascimento}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Telefone *</label>
          <input
            type="tel"
            name="telefone"
            value={dados.telefone}
            onChange={handleChange}
            required
            placeholder="(11) 99999-9999"
          />
        </div>
      </div>

      <button className={styles.saveButton} onClick={handleSalvar}>
        Salvar
      </button>
    </div>
  );
};

export default MeusDados;
