const express = require("express");
const helmet = require("helmet");
var cors = require("cors");
const app = express();
const morgan = require("morgan");
app.use(helmet());

// loggers config starts here
const requestLogger = require("./app/middlewares/request.logger");
// app.use(requestLogger);
const errorLogger = require("./app/middlewares/error.logger");
// app.use(errorLogger); TODO
// loggers config ends here

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
const apiRouter = express.Router();
const routes = require("../src/app/auth/routes");

// expose routes here
apiRouter.use(routes());
app.use("/admin/v1", apiRouter);
const notFoundRoutes = require("./app/middlewares/404Routes");
app.use(notFoundRoutes);

module.exports = app;
