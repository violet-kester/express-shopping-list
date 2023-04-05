const express = require("express");
const app = express();

const { NotFoundError } = require("./expressError");

app.use(express.json()); // process JSON data
app.use(express.urlencoded()); // process trad form data

// ... your routes go here ...

// handle site-wide 404s
app.use(function (req, res) {
  throw new NotFoundError();
});

// global err handler
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app; // export app
