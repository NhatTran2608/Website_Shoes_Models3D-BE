const mongoose = require('mongoose');

const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const Order = new Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        cart_items:
        {
            status: {
                type: String,
                default: 'Đặt hàng thành công'
            },
            address: {
                type: String
            },
            phoneNumber: {
                type: Number
            },
            total: {
                type: Number
            },
            product: [
                {
                    product_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Product',
                    },
                    image: { type: String },
                    color: { type: String },
                    size: { type: String },
                    quantity: { type: Number },
                }
            ]
        },
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.set('strictQuery', false)

Order.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Order', Order);
