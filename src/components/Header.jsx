import React, { useState } from "react";
import styles from "./Header.module.css";

function Header({ darkMode, onToggleTheme, setCurrentPage, currentPage, isAuthenticated, onLogout }) {

  const [menuOpen, setMenuOpen] = useState(false); // ✅ ADD

  return (
    <header className={styles.header}>

      {/* LEFT */}
      <div
        className={styles.logoSection}
        onClick={() => setCurrentPage("home")}
      >
        <h1 className={styles.title}>ChitraCloud</h1>
      </div>

      {/* HAMBURGER (mobile only) */}
      <div
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      {/* NAV */}
      <nav className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ""}`}>
        
        <span className={styles.navLink} onClick={() => setCurrentPage("home")}>Home</span>
        <span className={styles.navLink} onClick={() => setCurrentPage("about")}>About</span>
        <span className={styles.navLink} onClick={() => setCurrentPage("editor")}>Editor</span>
        <span className={styles.navLink} onClick={() => setCurrentPage("conversion")}>Conversion</span>
        <span className={styles.navLink} onClick={() => setCurrentPage("contact")}>Contact</span>

      </nav>

      {/* RIGHT */}
      <div className={styles.actions}>
        {!isAuthenticated ? (
          <button className={styles.loginBtn} onClick={() => setCurrentPage("auth")}>
            Login/Register
          </button>
        ) : (
          <button className={styles.loginBtn} onClick={onLogout}>
            Logout
          </button>
        )}

        <button className={styles.themeButton} onClick={onToggleTheme}>
          {darkMode ? "🌞" : "🌙"}
        </button>
      </div>
    </header>
  );
}

export default Header;