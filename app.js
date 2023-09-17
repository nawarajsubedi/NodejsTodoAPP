const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const todoRouter = require("./src/routes/todo");

const bodyParser = require("body-parser");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use("/todo", todoRouter);

// View engine
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "pug");

// Public assets
app.use(express.static(path.join(__dirname, "/src/public")));

app.get("*", (req, res) => res.redirect("/todo/list"));

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
});
