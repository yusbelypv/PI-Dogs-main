
import React from "react";
import styles from "../Paginate/paginate.module.css"

export default function Paginate({ dogsPerPage, allDogs, paginado }) {
    const pageNumbers =[];

    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) { //cantidad de elementos totales, dividido limite de elementos por pagina
        pageNumbers.push(i);
    }

    return(
        <nav className={`${styles.nav_container}`}>
            <ul className={`${styles.ul_container}`}>
                { pageNumbers && pageNumbers.map(number => (
                    <li className={`${styles.li_container}`} onClick={() => paginado(number)} key={number}>
                         <button type="button">{number}</button> 
                    </li>
                ))}
            </ul>
        </nav>
    )
}