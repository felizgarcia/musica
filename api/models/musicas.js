'use strict';
module.exports = (sequelize, DataTypes) => {
  const musicas = sequelize.define('musicas', {
    Genero: DataTypes.STRING,
    Autor: DataTypes.STRING,
    Nombre: DataTypes.STRING,
    Duración: DataTypes.STRING
  }, {});
  musicas.associate = function(models) {
    // associations can be defined here
  };
  return musicas;
};