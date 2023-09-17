const db = require("./db");
const { getDateTime, getOffset, markAsDone } = require("../helper");
const config = require("../config");

async function getAll(page = 1) {
  const offset = getOffset(page, config.listPerPage);
  const data = await db.query(
    `SELECT id, name, description, DATE_FORMAT(date_time, "%Y-%m-%d %H:%i") date_time , done
    FROM TODO LIMIT ${offset},${config.listPerPage}`
  );
  return data;
}

async function create(todo) {
  const dateTime = getDateTime(todo.date, todo.time);
  const done = markAsDone(todo.markAsDone);
  const result = await db.query(
    `INSERT INTO todo 
    (name, description, date_time, done) 
    VALUES 
    ('${todo.name}', '${todo.description}', '${dateTime}', ${done})`
  );

  if (result.affectedRows) {
    return true;
  }

  return false;
}

async function getById(id) {
  const data = await db.query(
    `SELECT id, name, description, DATE_FORMAT(date_time, "%Y-%m-%d %H:%i") date_time,
    DATE_FORMAT(date_time, "%Y-%m-%d") date, DATE_FORMAT(date_time, "%H:%i") time, done
    FROM TODO WHERE id = ${id}`
  );

  return data;
}

async function checkExist(name, id) {
  const data = await db.query(
    `SELECT id FROM TODO WHERE name = '${name.toLowerCase()}'`
  );
  return data?.length ? true : false;
}

async function update(id, todo) {
  const dateTime = getDateTime(todo.date, todo.time);
  const done = markAsDone(todo.markAsDone);
  const result = await db.query(
    `UPDATE TODO 
     SET name='${todo.name}', description='${todo.description}', date_time='${dateTime}', done = ${done}
     WHERE id=${id}`
  );

  if (result.affectedRows) {
    return true;
  }

  return false;
}

async function remove(id) {
  const result = await db.query(`DELETE FROM TODO WHERE id=${id}`);

  if (result.affectedRows) {
    return true;
  }

  return false;
}

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove,
  checkExist,
};
