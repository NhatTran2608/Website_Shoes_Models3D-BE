const dotenv = require('dotenv');
dotenv.config()
const mongoose = require('mongoose');
const UserModel = require('../../app/models/User.model');
const ProductsModel = require('../../app/models/Products.model');
const BrandModel = require('../../app/models/Brand.model');
const CategoryModel = require('../../app/models/Category.model');
const CommentModel = require('../../app/models/Comments.model');
const CartModel = require('../../app/models/Cart.model');
const RevenueStatisticsModel = require('../../app/models/RevenueStatistics.model');
const OrderModel = require('../../app/models/Order.model');
const HistoryModel = require('../../app/models/History.model');

async function connect() {
    try {
        await mongoose.connect(process.env.DB)
        //  mongodb+srv://trancongnhat2608:Bm93vVOmIKDEbqnY@cluster0.lnymnx6.mongodb.net/StudentManagement?retryWrites=true&w=majority
        console.log('Connect DataBase!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
