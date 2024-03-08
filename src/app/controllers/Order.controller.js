const OrderModel = require("../models/Order.model")

const Order = {

    async getOneItem(req, res) {
        try {
            const order = await OrderModel.findById(req.headers.id).populate({
                path: 'cart_items.product.product_id',
                model: 'Products'
            }).populate('user_id');
            return res.status(201).json(order)
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },

    async getAllOder(req, res) {
        try {
            const order = await OrderModel.find().lean().populate({
                path: 'cart_items.product.product_id',
                model: 'Products'
            }).populate('user_id');
            return res.status(201).json(order);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async updateOrder(req, res) {
        try {
            const order = await OrderModel.findById(req.body.id)
            order.cart_items.status = req.body.product
            order.save()
            return res.status(201).json(order);
        }
        catch (err) {
            return res.status(500).json(err)
        }
    }

}


module.exports = Order