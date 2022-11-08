module.exports = (sequelize, Sequelize) => {
  const tebeos = sequelize.define("tebeos", {
    comic: {
      type: Sequelize.STRING,
    },
    autor: {
      type: Sequelize.STRING,
    },
    filename: {
      type: Sequelize.STRING,
    }
    
  });

  return tebeos;
};
