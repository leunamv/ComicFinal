
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "9871",
    DB: "db_comics",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
  