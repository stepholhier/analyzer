import { useState } from 'react';
import { Flipped } from 'react-flip-toolkit';
import styles from './Header.module.css';

const Header = () => {
  const [flipKey, setFlipKey] = useState(0);
  const handleMouseEnter = () => setFlipKey(flipKey + 1);

  return (
    <>
    <header className={styles.header} onMouseEnter={handleMouseEnter}>
      {/* Container que segura LOGO + MENU */}
      <div className={styles.logoMenuContainer}>
        {/* Logo */}
        <a href="https://www.google.com.br">
        <h1 className={styles.logo}>
          {['A', 'N', 'A', 'L', 'Y', 'Z', 'E', 'R'].map((letter, index) => (
            <Flipped key={index} flipId={`letter-${index}`}>
              <span className={styles.letter}>{letter}</span>
            </Flipped>
          ))}
        </h1></a>

        {/* Menu ao lado do logo */}
        <nav className={styles.navMenu}>
          <a href="#oquee">O que é?</a>
          <a href="#precos">Preços</a>
          <a href="#faq">FAQ</a>
        </nav>
      </div>

      {/* Botão Entrar no canto direito */}
      <a href="signin" className={styles.entrar}>Entrar</a>
    </header>
    </>
  );
}

export default Header;
