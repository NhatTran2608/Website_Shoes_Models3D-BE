const mongoose = require('mongoose');

const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
//avc
const Cart = new Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        items: [
            {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
                image: { type: String },
                color: { type: String },
                size: { type: String },
                quantity: { type: Number }
            },
        ]
    },

    {
        timestamps: true,
    },
);

// Add plugins
mongoose.set('strictQuery', false)

Cart.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Cart', Cart);
