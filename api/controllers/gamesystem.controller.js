'use strict';
const _ = require('lodash');
const util = require('util');	// Required in swagger sample controller
var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
//var shortid = require('shortid');


const { musicas } = require('../models');	// Sequelize

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////


// Module Name
const MODULE_NAME = '[gamesystem.controller]';

// Error Messages
const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'Gamesystem not found';

// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'Gamesystem deleted successfully';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////
function getMusicasbyId(req, res) {
  //console.log("operadores.controller getOperadorById");
  try {

    console.log(req.swagger.params.id.value);
    var id = req.swagger.params.id.value;
   
    console.log("gamesystem by id..." + id);
    //console.log(gamesystems);

    musicas.findByPk(id)
    .then(mymusica => {
    console.log(mymusica);
    res.status(200).send(mymusica);
   })

  } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, getMusicasbyId.name, error, res);
  }
}

function getMusicas(req, res) {

  try {
        
   console.log("musica...");
   console.log(musica);
   musicas.findAll({
    /*include: [{
      model: orderstatus
     
    }]

    include: [{ all: true, nested: true }]*/
      })
   .then((mymusica) => {
     console.log(mymusica);
     res.status(200).send(mymusica);
     //utils.writeJson(res, consoles);
   }, (error) => {
     res.status(500).send(error);
   });

  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getMusicas.name, error, res);
  }
}

function updateMusicas(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  //console.log("operadores.controller getOperadorById");
  try {
    var id = req.swagger.params.id.value;
   
    console.log("params : " + id);
    var myupdatemusica = req.body;
    console.log("update gamesystems ... " + myupdatemusica.name + " " + myupdatemusica.descripcion);
 

    musicas.findByPk(id)
      .then(mymusica => {
        console.log("Result of findById: " + mymusica);
        if (!mymusica) {
          res.status(401).send(({}));
        
        }
        return mymusica
          .update({ 
            name: myupdatemusica.name, 
            description: myupdatemusica.description 
           })
          .then(() => res.status(200).send(mymusica) )
          .catch(error => res.status(403).send(mymusica));
        })
      .catch(error => {
          console.log("There was an error: " + error);
          //resolve(error);
    });

  } catch (error) {
      console.log("Was an error");
      controllerHelper.handleErrorResponse(MODULE_NAME, updateMusicas.name, error, res);
  }

}

function addMusicas(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  try {

    console.log("params : ");
    var mymusica = req.body;
    console.log("gamesystems ... " + mymusica);
 
      return musicas
        .create({
          Genero: mymusica.Genero,
          Autor: mymusica.Autor,
          Nombre: mymusica.Nombre,
          Duración: mymusica.Duración,
         
        }, {
        /*  include: [{
            model: order_detail,
            as: 'orderdetail'
          }] */
        })
        .then((mymusica) => {
          res.status(201).send(mymusica);
              
        })
        .catch((error) => res.status(400).send(error));
    

  } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, addMusicas.name, error, res);
  }
}


function deleteMusica(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');
 
  console.log(req.swagger.params.id.value);
  var id = req.swagger.params.id.value;
 
  musicas
    .findByPk(id)
    .then(mymusica => {
      console.log("Result of findById: " + mymusica);
      if (!mymusica) {
        res.status(200).send({"success": 0, "description":"not found !"});
      }
      else
      {
      return mymusica
        .destroy()
        .then(() => res.status(200).send({"success": 1, "description":"deleted!"}))
        .catch(error => res.status(403).send({"success": 0, "description":"error !"}))
      }
    })
    .catch(error => {
      console.log("There was an error: " + error);
    });


}

module.exports = {
  getMusicasbyId,
  getMusicas,
  updateMusicas,
  addMusicas,
  deleteMusica,
  GS_CT_ERR_GAMESYSTEM_NOT_FOUND,
  GS_CT_DELETED_SUCCESSFULLY,
  MODULE_NAME
}