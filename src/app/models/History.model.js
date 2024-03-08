const mongoose = require('mongoose');

const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const History = new Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },

        cart_items: {
            status: {
                type: String,
                default: 'Giao hàng thành công'
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
            product: [{
                evaluate: { type: Boolean, default: false },
                comments_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Comment',
                },
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
                image: { type: String },
                color: { type: String },
                size: { type: String },
                quantity: { type: Number },
            }]
        },
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.set('strictQuery', false)

History.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('History', History);
