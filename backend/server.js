const dotenv = require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoDBSession = require('connect-mongodb-session')(session);
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const ProductRoute = require("./Routes/ProductRoute");
const SupplierRoute = require("./Routes/SupplierRoute");
const SupplierProductRoute = require("./Routes/SupplierProductRoute")
const DeliveryRoute = require("./Routes/DeliveryRoute");
const EmployeeRoute = require("./Routes/EmployeeRoute");
const OffPay = require("./Routes/OfflinePaymentRoute");
const OnPay = require("./Routes/OnlinePayRoute");
const AttendanceRoute = require("./Routes/AttendanceRoute");
const Wholesalecustomer = require("./Routes/WholesalecustomerRoute");


const store = new MongoDBSession({
  uri: process.env.MONGO_URL,
  collection: 'mySessions',
});

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
app.use(
  session({
    secret: "key that will sign cookie",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

//Routes

app.get("/", (req, res) => {
  req.session.isAuth = true;
  console.log(req.session);
  console.log(req.session.id);
  res.send("HOME PAGE");
});

app.use("/product", ProductRoute);
app.use("/supplier", SupplierRoute);
app.use("/employee",EmployeeRoute);
app.use("/supplierproduct", SupplierProductRoute)
app.use("/attendance", AttendanceRoute);
app.use("/delivery", DeliveryRoute);
app.use("/wholesalecustomer", Wholesalecustomer);
app.use("/OffPay", OffPay);
app.use("/OnPay", OnPay);
app.use('/uploads/images', express.static(path.join('uploads','images')))



// Read user ID from the cookie


const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
  })
  .catch((err) => console.log(err));




