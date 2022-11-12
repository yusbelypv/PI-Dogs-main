const axios = require("axios");
const { Dog, Temperament } = require('../db');



let urLink = `https://api.thedogapi.com/v1/breeds`

///--- Get Data de la Api --- ///

const getApi = async() => {
    
    const api = await axios.get(urLink);

    const apiIn = await api.data.map(el => {
    let temperamentArray = [];
    if (el.temperament) {
        temperamentArray = el.temperament.split(", ");
    }
    
    let heightArray = [];
    if (el.height.metric) {
        heightArray = el.height.metric.split(" - ");
    }

    let weightArray = [];
    if (el.weight.metric) {
        weightArray = el.weight.metric.split(" - ");
    }
        return {
            id: el.id,
            name: el.name,
            height: heightArray,
            weight: weightArray,
            temperaments: temperamentArray,
            life_span: el.life_span,
            image: el.image.url,
        }
    })
return apiIn;
}

//----- Get data Base de datos -----//
const getDb = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'], //atributos que quiero traer del modelo Temperament, el id lo trae automatico
            through: {
                attributes: [],//traer mediante los atributos del modelo
                through: {
                attributes: [],//traer mediante los atributos del modelo
            },
            },
        }
    })
};

//// Unifica la data entre Api y BD 
const getAllDogs = async () => {
    const dataFromApi = await getApi();
    const dataFromDb = await getDb();
    // const allDataMixed = dataFromApi.concat(dataFromDb);
    const allDataMixed = [...dataFromApi, ...dataFromDb];
    return allDataMixed;
}

////////--Funciones endpoints--///////

const getdogs = async(req, res, next) => {//esta funcion también podra recibir un nombre por medio de query
    // const name = req.query.name;
    const { name } = req.query;
    try{
         const allDogs = await getAllDogs();
    if (name) {
        const dog = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));//si el perro existe guardame sus parametros aca.
        dog.length ? res.status(200).send(dog) : res.status(404).send("No existe el perro"); 
    } else {
        res.status(200).send(allDogs);
    }
   
    } catch (error) {
       next (error)
    }
};

const getbreed = async(req, res, next) => {//traer la info de un perro por su id, del modelo raza
    const { idRaza } = req.params;

    try{
        const allDogs = await getAllDogs();
    const dog = allDogs.filter(el => el.id == idRaza);
    if (dog.length) {
        res.status(200).json(dog);
    }else{
        res.status(404).send("No existe esa Raza de Perro");
    }
    } catch (error){
       next (error)
    }
    
};

const getTemeperaments = async (req, res, next) => {

    try{
      const temperamentsApi = await axios.get(`https://api.thedogapi.com/v1/breeds`);
      const temperaments = temperamentsApi.data.map(t => t.temperament);
      const temps = temperaments.toString().split(",");
   
      temps.forEach(el => {
        let i = el.trim()
        Temperament.findOrCreate({
             where: { name: i }
        })
    })

    const allTemp = await Temperament.findAll();    
    res.send(allTemp);  
    } catch(error){
        next(error)
    }
    
}; 


const postDogs = async (req, res, next) => {
    let {
     id: uuidv4,
     name,
     min_height,
     max_height,
     min_weight,
     max_weight,
     life_span,
     temperaments,
     image
    } = req.body
    
    try{
       const fixedHeight = []
       const minHeight = min_height;
       const maxHeight = max_height;
       fixedHeight.push(minHeight, maxHeight)
 
       const fixedWeight = []
       const minWeight = min_weight;
       const maxWeight = max_weight;
       fixedWeight.push(minWeight, maxWeight)
 
       let dog = await Dog.create({
         name,
         height: fixedHeight,
         weight: fixedWeight,
         life_span,
         image: image ? image : "https://www.publicdomainpictures.net/pictures/260000/velka/dog-face-cartoon-illustration.jpg",
       })
 
       let associatedTemp = await Temperament.findAll({
        where: { name: temperaments},
       })
 
       dog.addTemperament(associatedTemp);
 
      res.status(200).send("Creado Satisdactoriamente!") 
      } catch (error){
          next (error)
      }
    


};


  
module.exports = {
    getdogs,
    getbreed,
    getTemeperaments,
    postDogs

}


