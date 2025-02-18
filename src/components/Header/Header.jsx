import { useState } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { CaretRight, List, LockKey, X } from "@phosphor-icons/react";
import styles from './Header.module.css';

const Header = () => {
  const [flipKey, setFlipKey] = useState(0);
  const handleMouseEnter = () => setFlipKey(flipKey + 1);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <Flipper flipKey={flipKey}>
        <header className={styles.header} onMouseEnter={handleMouseEnter}>
          {/* Ícone de menu hambúrguer */}
          <button className={styles.hamburger} onClick={toggleMenu}>
            {menuOpen ? <X size={32} /> : <List size={32} />}
          </button>

          {/* Logo e Tooltip alinhados */}
          <h1 className={styles.logoContainer}>
            <span className={styles.logo}>
              {['A', 'N', 'A', 'L', 'Y', 'Z', 'E', 'R'].map((letter, index) => (
                <Flipped key={index} flipId={`letter-${index}`}>
                  <span className={styles.letter}>{letter}</span>
                </Flipped>
              ))}
            </span>

            {/* Tooltip ao lado do logo */}
            <div className={styles.tooltipContainer}>
              <span className={styles.questionIcon}>?</span>
              <span className={styles.tooltipText}>
                O Analyzer avalia e diagnostica seu site a partir de uma URL, 
                analisando logo, banners e conteúdo. Ele identifica melhorias 
                para otimizar a aparência, funcionalidade e experiência do usuário.
              </span>
            </div>
          </h1>

          {/* Botão de conta */}
          <button className={styles.accountButton}>
            <LockKey />MINHA CONTA
            <CaretRight className={styles.arrow} />
          </button>
        </header>
      </Flipper>

      {/* Overlay e Menu Lateral */}
      <div className={`${styles.overlay} ${menuOpen ? styles.overlayVisible : ""}`} onClick={toggleMenu}>
        <nav className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}>
          <ul>
            <li><a href="#oque" onClick={toggleMenu}>O QUE É</a></li>
            <li><a href="#preco" onClick={toggleMenu}>PREÇO</a></li>
            <button className={styles.accountButtonMenu}>
              <LockKey />MINHA CONTA
              <CaretRight className={styles.arrow} />
            </button>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
