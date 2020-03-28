var express = require('express');
var router = express.Router();
const Todo = require('../models/todo');
const { Op } = require('sequelize');

// TODOトップページ
router.get('/', async (req, res, next) => {
  const todos = await Todo.findAll();
  const todoTasks = todos.filter(todo => todo.isDone === false);
  const doneTasks = todos.filter(todo => todo.isDone === true);

  res.render('index', {
    todoTasks, doneTasks,
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
router.post('/done', async (req, res, next) => {
  const todoModels = await getModelsByIds(req.body.todos);
  for(const todo of todoModels) {
    await todo.update({
      isDone: true
    });
  }
  res.redirect('/');
});

// TODO削除
router.post('/delete', async (req, res, next) => {
  const todoModels = await getModelsByIds(req.body.todos);
  for(const todo of todoModels) {
    await todo.destroy();
  }
  res.redirect('/');
});

// リクエストのIDからTODOモデルを取得する
async function getModelsByIds(ids) {
  if (typeof ids === 'string') {
    ids = ids.split();
  }
  return await Todo.findAll({
    where: {
      id: {
        [Op.in]: ids,
      }
    }
  });
}

module.exports = router;
