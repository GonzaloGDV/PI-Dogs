const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      life_span: {
        type: DataTypes.STRING,
        get() {
          let value = this.getDataValue("life_span");
          return value + " years";
        },
      },
      created: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      image: {
        type: DataTypes.TEXT,
      },
      // createdGonzalo: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   defaultValue: "CreatedInDB",
      // },
    },
    { timestamps: false }
  );
};
