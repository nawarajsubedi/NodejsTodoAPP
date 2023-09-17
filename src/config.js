const config = {
  db: {
    host: "localhost",
    user: "root",
    password: "admin",
    database: "TODO_DB",
    connectTimeout: 60000,
    multipleStatements: true,
  },
  listPerPage: 10,
};

// const config = {
//   db: {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     connectTimeout: 60000,
//     multipleStatements: true,
//   },
//   listPerPage: 10,
// };

module.exports = config;
