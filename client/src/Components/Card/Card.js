import React from "react";
import styles from "../Card/card.module.css";

export default function Card({ image, name, temperaments }) {
  return (
    <div className={styles.main_container}>
      <div className={styles.image_container}>
        <img className={styles.img} src={`${image}`} alt={`imagen de: ${name}`}/>
      </div>
      <h2>{name}</h2>
      <div className={`${styles.temperaments_container}`}>
        {
        temperaments.map((temps) => <h3 key={temps+Math.random}>{temps}</h3>)
        }
      </div>
      
    </div>
  );
}