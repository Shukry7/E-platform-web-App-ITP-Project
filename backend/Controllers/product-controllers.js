const fs = require("fs");
const Product = require("../Models/ProductModel");
const supplierproduct = require("../Models/SupplierProduct");
const Order = require("../Models/OrderModel");
const ProductReviews = require("../Models/ProductReview");
const moment = require("moment");

const createProduct = async (req, res, next) => {
  const { name, category, Alert_quantity, price, weight, description } =
    req.body;

  const latestProduct = await Product.find().sort({ _id: -1 }).limit(1);
  let id;

  if (latestProduct.length !== 0) {
    const latestId = parseInt(latestProduct[0].ID.slice(1));
    id = "P" + String(latestId + 1).padStart(4, "0");
  } else {
    id = "P0001";
  }
  let path = "uploads/images/No-Image-Placeholder.png";
  if (req.file && req.file.path) path = req.file.path;

  const newProduct = {
    ID: id,
    name: name,
    category: category,
    Stock: 0,
    Alert_quantity: Alert_quantity,
    price: price,
    weight: weight,
    description: description,
    image: path,
  };

  const product = await Product.create(newProduct);
  return res.status(201).send(product);
};

const listProduct = async (req, res) => {
  try {
    const product = await Product.find({});
    return res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
const listProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    return res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const listRestockProduct = async (req, res) => {
  try {
    const product = await Product.find({
      $expr: { $lte: ["$Stock", "$Alert_quantity"] },
    });
    return res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    let path = product.image;
    if (req.file && req.file.path) {
      if (path !== "uploads/images/No-Image-Placeholder.png") {
        fs.unlink(path, (err) => {
          console.log(err);
        });
      }
      path = req.file.path;
    }

    const { name, category, weight, description, Alert_quantity, Stock } =
      req.body;

    if (req.file && req.file.path) path = req.file.path;

    const Updateproduct = {
      name: name,
      category: category,
      weight: weight,
      description: description,
      Alert_quantity: Alert_quantity,
      Stock: Stock,
      image: path,
    };

    const result = await Product.findByIdAndUpdate(id, Updateproduct);

    if (!result) {
      return res.status(404).send({ message: "Product Not Find !" });
    }

    return res.status(200).send({ message: "Product Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateProductPriceQtyndStock = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "Product Not Find !" });
    }
    return res.status(200).send({ message: "Product Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    await supplierproduct.deleteMany({ product: id });
    const path = product.image;
    if (path !== "uploads/images/No-Image-Placeholder.png") {
      fs.unlink(path, (err) => {
        console.log(err);
      });
    }
    const result = await Product.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Product Not Find !" });
    }

    return res.status(200).send({ message: "Product Deleted Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
const getTopOrderedProductsThisMonth = async (req, res) => {
  try {
    const startOfMonth = moment().startOf("month");
    const endOfMonth = moment().endOf("month");

    const topProducts = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth.toDate(), $lte: endOfMonth.toDate() },
        },
      },
      { $unwind: "$CartItems" },
      {
        $group: {
          _id: "$CartItems.productId",
          totalQuantity: { $sum: "$CartItems.quantity" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
    ]);

    // Extracting product IDs from topProducts array
    const productIds = topProducts.map((item) => item._id);

    // Populate product details for each product ID
    const populatedProducts = await Product.find({ _id: { $in: productIds } });

    // Replace product ID with product details in topProducts
    const topProductsDetails = topProducts.map((item) => {
      const productDetail = populatedProducts.find(
        (product) => product._id.toString() === item._id.toString()
      );
      return {
        product: productDetail,
        totalQuantity: item.totalQuantity,
      };
    });

    res.json(topProductsDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const GetProductReportByDateRange = async (req, res) => {
  try {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);

    console.log(startDate,endDate)
    const orders = await Order.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });
    const productIds = orders.flatMap((order) =>
      order.CartItems.map((item) => item.productId)
    );
    
    const products = await Product.find({ _id: { $in: productIds } });
    const productUnits = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate},
        },
      },
      { $unwind: "$CartItems" },
      {
        $group: {
          _id: "$CartItems.productId",
          totalUnits: { $sum: "$CartItems.quantity" },
        },
      },
    ]);
    const reviewCounts = await ProductReviews.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      { $group: { _id: "$ProductID", totalReviews: { $sum: 1 }, totalRating: { $sum: "$Rating" } } },
    ]);
    const productDetails = products.map((product) => {
      const productUnit = productUnits.find(unit => unit._id?.equals(product._id));
      const reviewCount = reviewCounts.find(review => review._id?.equals(product._id));
      const totalUnits = productUnit ? productUnit.totalUnits : 0;
      const totalReviews = reviewCount ? reviewCount.totalReviews : 0;
      const totalRating = reviewCount ? reviewCount.totalRating : 0;
      const averageRating = totalReviews !== 0 ? totalRating / totalReviews : 0;
      
      return {
        ...product.toObject(),
        totalUnits,
        totalReviews,
        averageRating,
      };
    });
    res.json(productDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createProduct = createProduct;
exports.listProduct = listProduct;
exports.UpdateProduct = UpdateProduct;
exports.listProductById = listProductById;
exports.DeleteProduct = DeleteProduct;
exports.UpdateProductPriceQtyndStock = UpdateProductPriceQtyndStock;
exports.listRestockProduct = listRestockProduct;
exports.getTopOrderedProductsThisMonth = getTopOrderedProductsThisMonth;
exports.GetProductReportByDateRange = GetProductReportByDateRange;
