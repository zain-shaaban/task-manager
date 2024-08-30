const connectDB = require("./services/DataBase");
const App = require("./services/ExpressApp");
const express = require("express");

const app = express();

const startServer = async () => {
  await connectDB();
  await App(app);
};

startServer();
