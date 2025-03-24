import { useState, useEffect } from "react";
import styles from "./Account.module.css";
import { User, ShoppingCart, FileText, SignOut, Download, Plus, Trash } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import AccountData from './AccountData';
import { supabase } from "../../services/supabaseClient";
import axios from "axios";

const Account = () => {
  const [selected, setSelected] = useState("dados");
  const [reports, setReports] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Minha Conta";
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const email = session?.user?.email;
      if (email) {
        fetchReports(email);
      } else {
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  const fetchReports = async (email) => {
    try {
      const response = await axios.get('http://localhost:5001/api/analysis/list?email=' + email);
      setReports(response.data);
    } catch (error) {
      console.error("Erro ao buscar relatórios:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleNewReport = () => {
    navigate("/");
  };

  const confirmDelete = (report) => {
    setSelectedReport(report);
    setShowPopup(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/analysis/delete?id=${selectedReport.id}`);
      setReports(reports.filter(r => r.id !== selectedReport.id));
      setShowPopup(false);
      setSelectedReport(null);
    } catch (error) {
      console.error("Erro ao excluir relatório:", error);
    }
  };

  return (
    <div className={styles.accountWrapper}>
      <aside className={styles.sidebar}>
        <h2 className={styles.title}>Minha Conta</h2>
        <p className={styles.subtitle}>Gerencie seus dados e relatórios</p>
        <nav className={styles.menu}>
          <button className={`${styles.menuItem} ${selected === "dados" ? styles.active : ""}`} onClick={() => setSelected("dados")}>
            <User size={20} /> Meus dados
          </button>
          <button className={`${styles.menuItem} ${selected === "compras" ? styles.active : ""}`} onClick={() => setSelected("compras")}>
            <ShoppingCart size={20} /> Minhas compras
          </button>
          <button className={`${styles.menuItem} ${selected === "relatorios" ? styles.active : ""}`} onClick={() => setSelected("relatorios")}>
            <FileText size={20} /> Meus relatórios
          </button>
          <button className={styles.menuItem} onClick={handleLogout}>
            <SignOut size={20} /> Sair
          </button>
        </nav>
      </aside>

      <main className={styles.content}>
        {selected === "dados" && <AccountData />}

        {selected === "compras" && (
          <div className={styles.section}>
            <h3>Minhas Compras</h3>
            <p>Você ainda não possui compras.</p>
          </div>
        )}

        {selected === "relatorios" && (
          <div className={styles.section}>
            <h3>Meus Relatórios</h3>
            {reports.length === 0 ? (
              <p>Você ainda não possui relatórios.</p>
            ) : (
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <ul className={styles.dataList}>
                  {reports.map((report) => (
                    <li key={report.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        Relatório - {report.url} ({new Date(report.createdAt).toLocaleDateString()})
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <a href={report.content} target="_blank" rel="noopener noreferrer">
                          <button className={styles.viewButton}>
                            <Download size={16} /> Baixar
                          </button>
                        </a>
                        <button className={styles.newReportButton} onClick={handleNewReport}>
                          <Plus size={16} /> Novo
                        </button>
                        <button onClick={() => confirmDelete(report)} style={{ backgroundColor: 'red', color: 'white', borderRadius: '6px', padding: '4px 8px' }}>
                          <Trash size={16} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {showPopup && (
          <div style={{ position: 'fixed', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#111', padding: '20px', borderRadius: '10px', zIndex: 1000, color: 'white', textAlign: 'center' }}>
            <p>Deseja realmente excluir este relatório?</p>
            <div style={{ marginTop: '10px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white', padding: '6px 12px', borderRadius: '6px' }}>Confirmar Exclusão</button>
              <button onClick={() => setShowPopup(false)} style={{ backgroundColor: '#333', color: 'white', padding: '6px 12px', borderRadius: '6px' }}>Cancelar</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Account;
