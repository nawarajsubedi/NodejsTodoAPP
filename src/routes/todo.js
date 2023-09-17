const express = require("express");
const router = express.Router();
const todo = require("../services/todo");
const { validateCreateTodo, validate } = require("../validations/todo");

/* Add edit form. */
router.get("/", async function (req, res, next) {
  res.render("addEdit", { todo: {} });
});

// * Return {Boolean}
// * @apiParam  {String} [name] name
router.get("/checkExist", async function (req, res, next) {
  try {
    res.json(await todo.checkExist(req.query.name, req.query.id));
  } catch (err) {
    console.error(`Error while checking tasks`, err.message);
    next(err);
  }
});

// * Return {Object} list of objects
router.get("/list", async function (req, res, next) {
  try {
    const todoList = await todo.getAll();
    res.render("index", {
      todoList,
    });
  } catch (err) {
    console.error(`Error while getting tasks`, err.message);
    next(err);
  }
});

/* POST Task */
// * @apiParam  {String} [name] name
// * @apiParam  {String} [description] short description
// * @apiParam  {string} [date] date
// * @apiParam  {String} [time] time
router.post(
  "/",
  validateCreateTodo(),
  validate,
  async function (req, res, next) {
    try {
      const result = await todo.create(req.body);

      const successMessage = result
        ? `Task '${req.body.name}' created successfully!`
        : undefined;
      const errorMessage = !result
        ? `Error while creating task '${req.body.name}'!`
        : undefined;
      const todoList = await todo.getAll();
      res.render("index", {
        todoList,
        successMessage,
        errorMessage,
      });
    } catch (err) {
      console.error(`Error while creating task`, err.message);
      next(err);
    }
  }
);

/* GET Task */
// * @apiParam  {Int} [id] task id
router.get("/:id/edit", async function (req, res, next) {
  try {
    const [todoData] = await todo.getById(req.params.id);
    res.render("addEdit", {
      todo: todoData,
    });
  } catch (err) {
    console.error(`Error while getting task `, err.message);
    next(err);
  }
});

/* POST Task edit */
// * @apiParam  {String} [name] name
// * @apiParam  {String} [description] short description
// * @apiParam  {string} [date] date
// * @apiParam  {String} [time] time
router.post("/:id/edit", async function (req, res, next) {
  try {
    const result = await todo.update(req.params.id, req.body);

    const successMessage = result
      ? `Task '${req.body.name}' updated successfully!`
      : undefined;
    const errorMessage = !result
      ? `Error while updating task '${req.body.name}'!`
      : undefined;
    const todoList = await todo.getAll();
    res.render("index", {
      todoList,
      successMessage,
      errorMessage,
    });
  } catch (err) {
    console.error(`Error while updating task`, err.message);
    next(err);
  }
});

/* DELETE Task */
// * @apiParam  {Int} [id] task id
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await todo.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting task`, err.message);
    next(err);
  }
});

module.exports = router;
