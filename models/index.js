const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/database.json')[env];
const sequelize =
  new Sequelize(config.database, config.username, config.password, config);
const db = {};

// add db to the sequelize
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.charAt(0) !== '.') && (file !== "index.js");
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

// form associations for each model
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
