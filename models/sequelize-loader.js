'use strict'
const Sequelize = require('sequelize');
const sequelize = new Sequelize('express-sample', 'root', null, {
  host: 'db',
  dialect: 'mysql',
});

module.exports = {
  database: sequelize,
  Sequelize: Sequelize,
};