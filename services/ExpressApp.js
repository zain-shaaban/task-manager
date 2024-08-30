require("dotenv").config();
const swaggerDOC = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");
const helmet = require("helmet");
const limiter = require("../MiddleWares/rateLimiter");
const errorHandler = require("../MiddleWares/errorHandler");
const notFound = require("../MiddleWares/404");
const express = require("express");


module.exports = async (app) => {
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(limiter());
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Task Manager Documentation",
        version: "1.0.0",
        description: "Simple task manager api built by Express.js",
      },
      servers: [
        {
          url: "https://task-manager-back-end-7gbe.onrender.com",
        },
      ],
    },
    apis: ["../routes/*.js"],
  };
  const swaggerConfig = swaggerDOC(options);

  app.use("/", require("../routes/task-routes"));
  app.use("/", require("../routes/user-routes"));
  app.use("/", require("../routes/offline-mode"));

  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerConfig));
  app.use("*", notFound);
  app.use(errorHandler);

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server Listining On Port ${PORT}`));
};
