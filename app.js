require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully..."))
  .catch((err) => console.log(err));
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", require("./routes/task-routes"));
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server Listining On Port ${PORT}`));
