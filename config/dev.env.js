"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BACKEND_PORT: 8001,
  BACKEND_URL: `"http://localhost:8001"`
});
