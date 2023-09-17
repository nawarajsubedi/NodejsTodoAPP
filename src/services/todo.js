const db = require("./db");
const { getDateTime, getOffset } = require("../helper");
const config = require("../config");

async function getAll(page = 1) {
  const offset = getOffset(page, config.listPerPage);
  //   const rows = await db.query(
  //     `SELECT id, name, description, date_time
  //     FROM todo LIMIT ${offset},${config.listPerPage}`
  //   );
  //   const data = helper.emptyOrRows(rows);
  //   const meta = { page };

  //   return {
  //     data,
  //     meta,
  //   };

  const data = await db.query(
    `SELECT id, name, description, DATE_FORMAT(date_time, "%Y-%m-%d %H:%i") date_time 
    FROM TODO LIMIT ${offset},${config.listPerPage}`
  );

  return data;
}

async function create(todo) {
  const dateTime = getDateTime(todo.date, todo.time);
  const result = await db.query(
    `INSERT INTO todo 
    (name, description, date_time) 
    VALUES 
    ('${todo.name}', '${todo.description}', '${dateTime}')`
  );

  if (result.affectedRows) {
    return true;
  }

  return false;
}

async function getById(id) {
  const data = await db.query(
    `SELECT id, name, description, DATE_FORMAT(date_time, "%Y-%m-%d %H:%i") date_time,
    DATE_FORMAT(date_time, "%Y-%m-%d") date, DATE_FORMAT(date_time, "%H:%i") time
    FROM TODO WHERE id = ${id}`
  );

  return data;
}

async function checkExist(name) {
  const data = await db.query(
    `SELECT id FROM TODO WHERE name = '${name.toLowerCase()}'`
  );
  return data?.length ? true : false;
}

async function update(id, todo) {
  const dateTime = getDateTime(todo.date, todo.time);
  const result = await db.query(
    `UPDATE TODO 
     SET name='${todo.name}', description='${todo.description}', date_time='${dateTime}'
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

async function search(id) {
  const rows = await db.callSpSearch(id);
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove,
  checkExist,
  search,
};
