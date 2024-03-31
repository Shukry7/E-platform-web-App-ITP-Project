const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const ProductRoute = require("./Routes/ProductRoute");
const SupplierRoute = require("./Routes/SupplierRoute");


const app = express();

//MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET" , "POST" , "PUT" , "DELETE"],
  allowedHeaders: ["Content-Type"]
}))

//Routes

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

app.use("/product", ProductRoute);
app.use("/supplier", SupplierRoute);
app.use("/employee", EmployeeRoute);


const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
  })
  .catch((err) => console.log(err));
