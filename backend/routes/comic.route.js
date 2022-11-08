module.exports = app => {
  const tebeos = require("../controllers/comic.controller.js");
  var upload = require('../multer/upload');
  var router = require("express").Router();

  // Create a new Comic OJO SE USA EL NOMBRE DE LA TABLA A MODIFICAR  DE LA BASE DE DATOS 
       router.post("/", upload.single('file'), tebeos.create);
       //router.post("/", tebeos.create);

  // Retrieve all Comics
  router.get("/", tebeos.findAll);

  // Retrieve a single Comic with id
  router.get("/:id", tebeos.findOne);

  // Update a Comic with id
  router.put("/:id", tebeos.update);

  // Delete a Comic with id
  router.delete("/:id", tebeos.delete);

  app.use("/api/comics1", router);//AQUI CAMBIE COMICS POR tebeos a ver... PORQUE SE SUPONE QUE ES LA ENTRADA .A VER SI FUNCIONA
}  //AQUI ARRIBA NO SE SI VA TEBEOS O COMICS1 en principio comics1 es la ruta de la app .
