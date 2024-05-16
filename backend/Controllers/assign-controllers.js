const HttpError = require("../Models/http-error");
const Delivery  = require("../Models/DeliveryModel");
const Order = require("../Models/OrderModel")
const uuid = require("uuid");
const fs = require("fs");
const DeliveryOrder = require("../Models/AssignModel")

const createOrderDelivery = async (req, res, next) => {
  const { delivery , order, status} = req.body;

  
  const newOrderDelivery = {
    delivery: delivery,
    order: order,
    status: status,
  };

  const orderDelivery = await DeliveryOrder.create(newOrderDelivery);
  return res.status(201).send(orderDelivery);
};

const listOrderDelivery = async (req, res) => {
  try {
    const orderDelivery = await DeliveryOrder.find({});
    return res.status(200).json(orderDelivery);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const listOrderDeliveryById = async (req, res) => {
  try {
    const assignedOrders = await DeliveryOrder.distinct('order');

    const unassignedOrders = await Order.find({ _id: { $nin: assignedOrders } }).populate("userId");

    return res.json(unassignedOrders);
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateOrderDelivery = async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    const UpdateOrderDelivery = {
      status: status,
     
    };
  
    const result = await DeliveryOrder.findByIdAndUpdate(id,UpdateOrderDelivery);

    if (!result) {
      return res.status(404).send({ message: "Delivery Person Not Found !" });
    }

    return res.status(200).send({ message: "Delivery Person Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};



exports.createOrderDelivery= createOrderDelivery;
exports.listOrderDelivery = listOrderDelivery;
exports.listOrderDeliveryById = listOrderDeliveryById;
exports.UpdateOrderDelivery= UpdateOrderDelivery;
