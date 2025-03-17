import { useState } from "react";
import styles from "./Account.module.css";
import { User, ShoppingCart, FileText, SignOut } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import AccountData from './AccountData';

const Account = () => {
  const [selected, setSelected] = useState("dados");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false"); // Marca como deslogado
    navigate("/login"); // Redireciona
  };

  return (
    <div className={styles.accountWrapper}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 className={styles.title}>Minha Conta</h2>
        <p className={styles.subtitle}>Gerencie seus dados e relatórios</p>

        <nav className={styles.menu}>
          <button
            className={`${styles.menuItem} ${selected === "dados" ? styles.active : ""}`}
            onClick={() => setSelected("dados")}
          >
            <User size={20} /> Meus dados
          </button>
          <button
            className={`${styles.menuItem} ${selected === "compras" ? styles.active : ""}`}
            onClick={() => setSelected("compras")}
          >
            <ShoppingCart size={20} /> Minhas compras
          </button>
          <button
            className={`${styles.menuItem} ${selected === "relatorios" ? styles.active : ""}`}
            onClick={() => setSelected("relatorios")}
          >
            <FileText size={20} /> Meus relatórios
          </button>
          <button className={styles.menuItem} onClick={handleLogout}>
            <SignOut size={20} /> Sair
          </button>
        </nav>
      </aside>

      {/* Conteúdo */}
      <main className={styles.content}>
        {selected === "dados" && (
        //   <div className={styles.section}>
        //     <h3>Meus Dados</h3>
        //     <ul className={styles.dataList}>
        //       <li><strong>Nome:</strong> João Silva</li>
        //       <li><strong>Email:</strong> joao@example.com</li>
        //       <li><strong>CPF:</strong> 123.456.789-00</li>
        //       <li><strong>Data de nascimento:</strong> 01/01/1990</li>
        //     </ul>
        //   </div>
        <AccountData />
        )}

        {selected === "compras" && (
          <div className={styles.section}>
            <h3>Minhas Compras</h3>
            <ul className={styles.dataList}>
              <li><strong>Relatório de site:</strong> 12/03/2025 - R$ 49,90</li>
              <li><strong>Relatório de site:</strong> 27/02/2025 - R$ 49,90</li>
            </ul>
          </div>
        )}

        {selected === "relatorios" && (
          <div className={styles.section}>
            <h3>Meus Relatórios</h3>
            <ul className={styles.dataList}>
              <li>Relatório - www.exemplo1.com (12/03/2025) <button className={styles.viewButton}>Ver</button></li>
              <li>Relatório - www.exemplo2.com (27/02/2025) <button className={styles.viewButton}>Ver</button></li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default Account;
