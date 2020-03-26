var express = require('express');
var router = express.Router();
const Todo = require('../models/todo');
const { Op } = require('sequelize');

// TODOトップページ
router.get('/', async (req, res, next) => {
  const todos = await Todo.findAll();
  res.render('index', {
    title: 'TODOアプリ',
    todos,
  });
});

// TODO作成
router.post('/create', async (req, res, next) => {
  await Todo.create({
    task: req.body.task,
  });
  res.redirect('/');
});

// TODO完了
router.post('/done', (req, res, next) => {
  res.redirect('/');
});

// TODO削除
router.post('/delete', async (req, res, next) => {
  let todos = req.body.todos;
  if (typeof todos === 'string') {
    todos = todos.split();
  }
  const todoModels = await Todo.findAll({
    where: {
      id: {
        [Op.in]: todos,
      }
    }
  });
  for(const todo of todoModels) {
    await todo.destroy();
  }
  res.redirect('/');
});

module.exports = router;
