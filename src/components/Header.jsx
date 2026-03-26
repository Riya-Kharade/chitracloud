import React from "react";
import styles from "./Header.module.css";

function Header({ darkMode, onToggleTheme }) {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.title}>ChitraCloud</h1>
        <p className={styles.subtitle}>Cloud Image Editor</p>
      </div>

      <button className={styles.themeButton} type="button" onClick={onToggleTheme}>
        <span className={styles.themeIcon} aria-hidden="true">
          {darkMode ? "SUN" : "MOON"}
        </span>
        <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
      </button>
    </header>
  );
}

export default Header;
