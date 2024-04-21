const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const ProductRoute = require("./Routes/ProductRoute");
const SupplierRoute = require("./Routes/SupplierRoute");
const SupplierProductRoute = require("./Routes/SupplierProductRoute");
const DeliveryRoute = require("./Routes/DeliveryRoute");
const EmployeeRoute = require("./Routes/EmployeeRoute");
const OffPay = require("./Routes/OfflinePaymentRoute");
const OnPay = require("./Routes/OnlinePayRoute");
const AttendanceRoute = require("./Routes/AttendanceRoute");
const cart = require("./Routes/CartRoute");
const CustomerRoute = require("./Routes/CustomerRoute");
const OrderRoute = require("./Routes/OrderRoute");
const LoginRoute = require("./Routes/LoginRoute");
const NotificationRoute = require("./Routes/NotificationRoute");

const app = express();

//MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

//Routes

app.use("/product", ProductRoute);
app.use("/customer", CustomerRoute);
app.use("/supplier", SupplierRoute);
app.use("/employee", EmployeeRoute);
app.use("/supplierproduct", SupplierProductRoute);
app.use("/attendance", AttendanceRoute);
app.use("/delivery", DeliveryRoute);
app.use("/cart", cart);
app.use("/OffPay", OffPay);
app.use("/OnPay", OnPay);
app.use("/Login", LoginRoute);
app.use("/order", OrderRoute);
app.use("/notify", NotificationRoute);
app.use("/uploads/images", express.static(path.join("uploads", "images")));

// Read user ID from the cookie

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
  })
  .catch((err) => console.log(err));
