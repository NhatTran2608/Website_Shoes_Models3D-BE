const HistoryModel = require("../models/History.model")
const UserModel = require('../models/User.model')
const OrderModel = require('../models/Order.model')

const historyController = {
    async CreateHistory(req, res) {
        try {
            let id = await req.body.headers.product._id
            const user = await UserModel.findById(req.body.headers.product.user_id._id)
            const history = await HistoryModel.create(req.body.headers.product)
            history.cart_items.status = 'Đã giao hàng'
            history.save()
            for (let index = 0; index < user.order_id.length; index++) {
                if (id == user.order_id[index].toHexString()) {
                    user.order_id.splice(index, 1);
                }
            }
            user.history.push(history._id)
            await user.save();
            await OrderModel.findByIdAndDelete(id);

        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    async getAllHistory(req, res) {
        try {
            const history = await HistoryModel.find().lean()
            return res.status(201).json(history);
        }
        catch (err) {
            res.status(500).json(err)
        }
        
    },
    async getOneHistory(req, res) {
        try {

            const history = await HistoryModel.findById(req.headers.id).populate({
                path: 'cart_items.product.product_id',
                model: 'Products'
            })
            return res.status(201).json(history);
        }
        catch (err) {
            return res.status(500).json(err)
        }
    }

}

module.exports = historyController