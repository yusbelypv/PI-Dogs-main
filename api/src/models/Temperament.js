const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


module.exports = (sequelize) => {
  // defino el modelo

 const Temperament = sequelize.define('temperament', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    

  });
};