import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Flipped } from "react-flip-toolkit";
import { List, X, WhatsappLogo } from "@phosphor-icons/react"; // Ícones do menu e WhatsApp
import styles from "./Header.module.css";

const Header = () => {
  const [flipKey, setFlipKey] = useState(0);
  const handleMouseEnter = () => setFlipKey(flipKey + 1);

  
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      <header className={styles.header} onMouseEnter={handleMouseEnter}>
        <div className={styles.logoMenuContainer}>
          {/* Ícone do menu hambúrguer */}
          {isMobile && (
            <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <List size={20} />}
            </button>
          )}

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

          {/* Menu Desktop */}
          {!isMobile && (
            <nav className={styles.navMenu}>
              <a href="#oquee">O que é?</a>
              <a href="#precos">Preços</a>
              <a href="#faq">FAQ</a>
            </nav>
          )}
        </div>

        {/* Botão "Entrar" no canto direito */}
        <a href="signin" className={styles.entrar}>Entrar</a>
      </header>

      {/* MENU MOBILE */}
      {isMobile && (
  <div className={`${styles.menuOverlay} ${menuOpen ? styles.menuOpen : ''}`}>
    {/* Ícone de fechar */}
    <button className={styles.closeButton} onClick={() => setMenuOpen(false)}>
      <X size={32} />
    </button>

    <nav className={styles.menu}>
      <ul>
        <li><a href="#oquee" onClick={() => setMenuOpen(false)}>O que é?</a></li>
        <li><a href="#precos" onClick={() => setMenuOpen(false)}>Preços</a></li>
        <li><a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a></li>
      </ul>
    </nav>

    {/* Botão "Fale Conosco" */}
    <button className={styles.whatsappButton}>
      <WhatsappLogo size={20} className={styles.whatsappIcon} />
      Fale Conosco
    </button>
  </div>
)}
    </>
  );
};

export default Header;
