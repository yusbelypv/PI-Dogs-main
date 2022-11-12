const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.


module.exports = (sequelize) => {
  // defino el modelo

 const Dog = sequelize.define('dog', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    height: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    weight: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image:{
      type: DataTypes.STRING(500),
    }
    
  });
};
