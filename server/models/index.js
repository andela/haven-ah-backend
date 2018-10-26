import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config/config';

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const configObj = config[env];
const db = {};

// Initialize sequelize
const sequelize = configObj.use_env_variable
  ? new Sequelize(configObj.use_env_variable)
  : new Sequelize(
    configObj.database,
    configObj.username,
    configObj.password,
    configObj,
  );

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0)
    && (file !== basename)
    && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
