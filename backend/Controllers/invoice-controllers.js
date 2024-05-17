const Invoice = require("../Models/InvoiceModel");
const Cost = require("../Models/CostModel");
const Profit = require("../Models/ProfitModel");
const Product = require("../Models/ProductModel");


createInvoice = async (req, res) => {
    try {
      const { cartitem, uid } = req.body;
  
      console.log(cartitem)
  
      const latestOrder = await Invoice.find().sort({ _id: -1 }).limit(1);
      let id;
      if (latestOrder.length !== 0) {
        const latestId = parseInt(latestOrder[0].orderId.slice(1));
        id = "I" + String(latestId + 1).padStart(4, "0");
      } else {
        id = "I0001";
      }
  
      const items = await Promise.all(
        cartitem.map(async (item) => {
          await Product.findByIdAndUpdate(item.product._id, {
            $inc: { Stock: -item.quantity },
          });
  
        return {
            productId: item.product.ID,
            price: item.product.price,
            quantity: item.quantity,
            discount: item.discount ?? 0,
        };
      }));
  
  
      const date = new Date();
  
      const profitTable = await Promise.all(
        cartitem.map(async (item) => {
          let cost = await Cost.findOne({
            productID: item.product.ID,
            inStock: { $ne: 0 },
          }).limit(1);
  
          let buyqtytemp = item.quantity;
          let costStock = cost.inStock;
          let sellPrice = item.product.price;
          let profit = 0;
  
          while (buyqtytemp > costStock) {
            profit = profit + (sellPrice - cost.price) * cost.inStock;
            buyqtytemp = buyqtytemp - cost.inStock;
            const result = await Cost.findByIdAndUpdate(cost._id, { inStock: 0 });
            cost = await Cost.findOne({
              productID: item.product.ID,
              inStock: { $ne: 0 },
            }).limit(1);
            costStock = cost.inStock;
          }
  
          profit = profit + (sellPrice - cost.price) * buyqtytemp;
          const result = await Cost.findByIdAndUpdate(cost._id, {
            $inc: { inStock: -buyqtytemp },
          });

          //profit = profit - discount
  
          return {
            order: id,
            productID: item.product.ID,
            productName: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            profit: profit,
            type: "Offline",
            date: date,
          };
        })
      );
  
      const profitAdded = await Profit.insertMany(profitTable);
  
      const newInvoice = {
        orderId: id,
        userId: uid ? uid : 'null',
        CartItems: items,
        date: date,
      };
  
      const invoice = await Invoice.create(newOrder);
      
      res.status(201).json({ message: "Order placed successfully" });
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  exports.createInvoice = createInvoice;