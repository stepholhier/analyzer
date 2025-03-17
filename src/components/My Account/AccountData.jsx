import { useState, useEffect } from "react";
import styles from "./Account.module.css";

const MeusDados = () => {
  const [dados, setDados] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    nascimento: "",
  });

  const [cpfBloqueado, setCpfBloqueado] = useState(false);

  // Carregar dados salvos ao abrir a página
  useEffect(() => {
    const dadosSalvos = localStorage.getItem("meusDados");
    if (dadosSalvos) {
      const parsedDados = JSON.parse(dadosSalvos);
      setDados(parsedDados);
      if (parsedDados.cpf) setCpfBloqueado(true);
    }
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

  const handleSalvar = () => {
    localStorage.setItem("meusDados", JSON.stringify(dados));
    alert("Dados salvos com sucesso! ✔️");
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
