import React from "react";
import styles from "./Header.module.css";

function Header({ 
  darkMode, 
  onToggleTheme, 
  setCurrentPage, 
  currentPage,   // ✅ ADD THIS
  isAuthenticated, 
  onLogout 
}) {
  return (
    <header className={styles.header}>
      
      {/* LEFT SIDE */}
      <div
        className={styles.logoSection}
        onClick={() => setCurrentPage("home")}
        style={{ cursor: "pointer" }}
      >
        <h1 className={styles.title}>ChitraCloud</h1>
      </div>

      {/* CENTER NAV */}
      <nav className={styles.navLinks}>
        
        <span
          className={`${styles.navLink} ${currentPage === "home" ? styles.active : ""}`}
          onClick={() => setCurrentPage("home")}
        >
          Home
        </span>

        <span
          className={`${styles.navLink} ${currentPage === "about" ? styles.active : ""}`}
          onClick={() => setCurrentPage("about")}
        >
          About
        </span>

        <span
          className={`${styles.navLink} ${currentPage === "editor" ? styles.active : ""}`}
          onClick={() => setCurrentPage("editor")}
        >
          Editor
        </span>

        <span
          className={`${styles.navLink} ${currentPage === "conversion" ? styles.active : ""}`}
          onClick={() => setCurrentPage("conversion")}
        >
          Conversion
        </span>

        <span
          className={`${styles.navLink} ${currentPage === "contact" ? styles.active : ""}`}
          onClick={() => setCurrentPage("contact")}
        >
          Contact
        </span>

      </nav>

      {/* RIGHT SIDE */}
      <div className={styles.actions}>
        
        {!isAuthenticated ? (
          <button
            className={styles.loginBtn}
            onClick={() => setCurrentPage("auth")}
          >
            Login / Signup
          </button>
        ) : (
          <button
            className={styles.loginBtn}
            onClick={onLogout}
          >
            Logout
          </button>
        )}

        <button
          className={styles.themeButton}
          type="button"
          onClick={onToggleTheme}
        >
          <span className={styles.themeIcon}>
            {darkMode ? "🌞" : "🌙"}
          </span>
        </button>

      </div>
    </header>
  );
}

export default Header;