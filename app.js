require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./MiddleWares/errorHandler");
const notFound  = require("./MiddleWares/404");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully..."))
  .catch((err) => console.log(err));
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/task-routes"));
app.use("/", require("./routes/user-routes"));

app.use("*", notFound);
app.use(errorHandler);
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server Listining On Port ${PORT}`));
