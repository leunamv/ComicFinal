const db = require("../models");
const Tebeos = db.comics ;
const Op = db.sequelize.Op;

// Create and Save a new Comic
exports.create = (req, res) => {
  // Validate request
  if (!req.body.comic) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Comic
  const tebeos = {
    comic: req.body.comic,
    autor: req.body.autor,
    filename: req.file ? req.file.filename : ""
    
  };

  // Save Comic in the database
  Tebeos.create(tebeos)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Piloto.",
      });
    });
};

// Retrieve all Comics from database
exports.findAll = (req, res) => {
  const comic = req.query.nombre;
  var condition = comic ? { comic: { [Op.like]: `%${comic}%` } } : null;

  Tebeos.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Comic with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tebeos.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};

// Update a Tebeo by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tebeos.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Comic was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Comic with id=${id}. Maybe Comic was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Comic with id=" + id,
      });
    });
};

// Delete a comic whith the specifyed id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tebeos.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tebeo was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Tebeo with id=${id}. Maybe Piloto was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Comic with id=" + id,
      });
    });
};
