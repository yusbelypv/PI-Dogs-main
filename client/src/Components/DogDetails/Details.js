import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { showDogDetails } from "../../Redux/Actions/index";
import { Link } from "react-router-dom";
import styles from "../DogDetails/details.module.css";



export default function DogDetails() {
    const dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {
        dispatch(showDogDetails(id));
    }, [dispatch, id]);

    const details = useSelector((state) => state.details)
    // console.log(details);

    let nameDog, imageDog, temperamentDog = [], heightDog, weightDog, lifeSpanDog;

    if (details[0]) { //una vez ya se hayan traido los datos renderizalos
        nameDog = details[0].name;
        imageDog = details[0].image;
        heightDog = details[0].height;
        weightDog = details[0].weight;
        lifeSpanDog = details[0].life_span;

        if (details[0].temperaments[0]) {
            temperamentDog = [...details[0].temperaments]
        }

        if (details[0].temperaments[0].name) {
            temperamentDog = details[0].temperaments.map(temp => temp.name)
        }
    };

    

    return(

        <div className={`${styles.main_container}`}>
            <header className={styles.header_details}><h2>---  Details Breed   ---</h2> </header>
            <Link to="/home">
                <button className={`${styles.button_home}`}>Back to Home</button>
            </Link>
            
            <div className={`${styles.sub_container}`}>
                    <div className={`${styles.container_elements}`}>

                        <div className={`${styles.image_container}`}>
                            <img src={imageDog} alt={`imagen de ${nameDog}`}/>
                        </div>
                        
                        <div className={`${styles.right_container}`}>
                            <h1>{nameDog}</h1>
                            <h3>{`Height: ${heightDog && heightDog[0]} - ${heightDog && heightDog[1]} CM`}</h3>
                            <h3>{`Weight: ${heightDog &&  weightDog[0]} - ${weightDog && weightDog[1]} KG`}</h3>
                            <h3>{`Lifespan: ${lifeSpanDog}`}</h3>
                            <div>
                                <h3>Temperaments:</h3>
                                <ul className={`${styles.list_container}`}>
                                    {temperamentDog.map(t => <li key={t}>{t}</li>)}
                                </ul>
                            </div>
                        </div>   
                </div>
            </div>
            <footer>Made by: Yusbely Parra @2022 </footer>
        </div>
    )
}