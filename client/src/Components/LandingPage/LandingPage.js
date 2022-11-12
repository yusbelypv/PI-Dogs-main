import React from "react";
import { Link } from "react-router-dom";
import styles from "../LandingPage/landing.module.css";


function LandingPage() {
  return (
    <div className={styles.main_container}>
      <div className= {styles.main_left_container}>
        <h1 className={styles.titleApp} > Dog World </h1>
        <div className={styles.left_paragraph}>
          <p><h3>Know the breeds of dogs and their temperaments</h3></p>
        </div>
        
        <Link to="/home">
            <button className={styles.button_home}>Welcome!</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;