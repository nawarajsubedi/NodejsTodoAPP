const { body, validationResult } = require("express-validator");

function isDateValid(dateStr) {
  return !isNaN(new Date(dateStr));
}
const validateCreateTodo = () => {
  return [
    body("name", `Todo name required`).exists().notEmpty(),
    body("description", "Todo description required").exists().notEmpty(),
    // body("date", "Date required").trim().isDate(),
    body("date", "Date required").trim().notEmpty(),
    body("time", "Time required").trim().isTime(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.array());
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  validateCreateTodo,
  validate,
};
