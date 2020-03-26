'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Todo = loader.database.define(
  'todos',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    task: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isDone: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    paranoid: true,
    freezeTableName: true,
  }
);

module.exports = Todo;