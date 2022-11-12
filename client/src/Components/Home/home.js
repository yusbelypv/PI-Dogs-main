import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllDogs,
  getTemperaments,
  FilterByTemperament,
  OrderByName,
  OrderByWeight,
} from "../../Redux/Actions/index";
import logo from "./logo.png"
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar.js"
import styles from "../Home/home.module.css"




function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector(state => state.dogs); //valores del estado global de redux que requiero
  const allTemperaments = useSelector(state => state.temperaments);
 

  /// Estados locales para el páginado /////
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 9; 
  const lastIndex = currentPage * dogsPerPage; 
  const firstIndex = lastIndex - dogsPerPage;
  const currentDogs = allDogs.slice(firstIndex, lastIndex);//elementos a renderizar en la pagina, segun el valor de paginado

  console.log(currentDogs);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  // eslint-disable-next-line
  const [orden, setOrden] = useState("");

  useEffect(() => {
    //acciones a depachar luego de montar el componente
    dispatch(getAllDogs());
    dispatch(getTemperaments());
  }, [dispatch]);


  const handleFilterByTemperament = (e) => {
    e.preventDefault();    
    dispatch(FilterByTemperament(e.target.value));
  };

  const handleOrderByName = (e) => {
    e.preventDefault();
    dispatch(OrderByName(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  };

  const handleOrderByWeight = (e) => {
    e.preventDefault();
    dispatch(OrderByWeight(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  };

  return (
    <>
    <div>
      <header className={styles.header_home}> <h2>---  Home   ---</h2>  
         <Link to="/"> <img src={logo} alt="logo" /> </Link> 
      </header>

        <div className={styles.header_container_left}>
          <div className={styles.header_left}>

            <SearchBar />

            <div className={styles.container_filters}>
              <select onChange={handleOrderByName}>
                <option disabled selected defaultValue>
                  Alphabetical order
                </option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>

              <select onChange={handleOrderByWeight}>
                <option disabled selected defaultValue>
                  Filter by weight
                </option>
                <option value="max_weight">Max</option>
                <option value="min_weight">Min</option>
              </select>

              <select onChange={handleFilterByTemperament}>
                  <option disabled selected defaultValue>Temperaments</option>
                  <option value="Todos">All</option>
                  {
                    allTemperaments?.map(temp => (
                        <option value={temp.name}  key={temp.id}>{temp.name}</option>
                    ))
                  }
              </select>

            </div>
            
          </div>
        </div>

        {/* boton para agregar nuevos perros */}
        <div className={styles.header_right}>
          <Link to="/dog">
            <button className={styles.button_add_dog}>Create Breed</button>
          </Link>
        </div>

  
    <div className={styles.main_container}>
      <div className={styles.container_cards}>
        {currentDogs?.map((el) => {//validacion que existan los datos
          return(
            <div className={styles.container_card} key={el.id}>
              <Link to={"/dog-detail/"+el.id}>
                {
                  <Card key={el.id} image={el.image} name={el.name} temperaments={el.temperaments[0].name ? el.temperaments.map(el => el.name) : el.temperaments}/>
                  //si temperaments viene en un formato distinto desde la BD
                }
              </Link>
            </div>      
          )
        })}
      </div>

      <hr />
      
      <div className={styles.pagination}>
        <Paginate dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado}/> {/*el valor de la funcion de paginado aumenta segun el bucle for en el componente Paginate*/}
      </div>
      

    </div>
    
    </div>
     <footer className={styles.footer}>Made by: Yusbely Parra @2022 </footer>
    </>
  );
}

export default Home;