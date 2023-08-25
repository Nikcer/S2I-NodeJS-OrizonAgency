const Order = require("../models/order");
const Product = require("../models/product");
const mongoose = require("mongoose");

const orderList = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

const orderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Ordine non trovato" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(404).json({ err });
  }
};

const searchOrders = async (req, res) => {
  const { productId, inputDate } = req.query;
  let filteredOrders = await Order.find();

  try {
    if (inputDate && productId) {
      const productExists = await Product.exists({ _id: productId });
      if (!productExists) {
        return res.status(404).json({ message: "Product not found" });
      }

      const d = new Date(inputDate);
      const filteredOrders = await Order.aggregate([
        {
          $match: {
            inputDate: {
              $gte: new Date(d.getFullYear(), d.getMonth(), d.getDate()),
              $lt: new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1),
            },
            products: new mongoose.Types.ObjectId(productId),
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "products",
            foreignField: "_id",
            as: "matchingProducts",
          },
        },
      ]);

      if (filteredOrders.length === 0) {
        return res
          .status(404)
          .json({ message: "No orders found matching the criteria" });
      }

      return res.status(200).json(filteredOrders);
    }
    if (inputDate) {
      const d = new Date(inputDate);
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.inputDate.toISOString().split("T")[0] ===
          d.toISOString().split("T")[0]
      );
      if (filteredOrders.length === 0) {
        return res
          .status(404)
          .json({ message: "No orders found matching the criteria" });
      }
      return res.status(200).json(filteredOrders);
    }

    console.log(productId);
    const ordersWithMatchingProduct = await Order.aggregate([
      {
        $match: {
          products: new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "_id",
          as: "matchingProducts",
        },
      },
    ]);

    if (ordersWithMatchingProduct.length === 0) {
      return res.status(400).json({ message: "Invalid product ID provided" });
    }

    res.status(200).json(ordersWithMatchingProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const createOrder = async (req, res) => {
  try {
    const { products, users, inputDate } = req.body;
    const newOrder = await Order.create({ products, users, inputDate });
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { products, users, inputDate } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(id, {
      products,
      users,
      inputDate,
    });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Ordine non trovato" });
    }
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ err, message: "Impossibile aggiornare l'ordine" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Ordine non trovato" });
    }
    res.status(200).json({ message: "Ordine eliminato correttamente" });
  } catch (err) {
    res.status(500).json({ err, message: "Impossibile eliminare l'ordine" });
  }
};

module.exports = {
  createOrder,
  orderList,
  orderById,
  searchOrders,
  /* searchByFilters, */
  updateOrder,
  deleteOrder,
};
