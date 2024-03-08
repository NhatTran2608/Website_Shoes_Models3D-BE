const mongoose = require('mongoose');

const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const Products = new Schema(
    {
        name: { type: String, require: true },
        description: { type: String },
        price: { type: Number, require: true },
        color: { type: String },
        disCount: { type: Number },
        moneyDeals: { type: Number },
        quantity_buy: { type: Number, default: 0 },
        item: {
            image: [],
            sizes: [
                {
                    size: { type: String },
                    quantity: { type: Number }
                },
            ]
        },
        Model3D: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Model3D',
        },
        brandID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brand',
        },
        categoryID: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        }],
        comments_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }]
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.set('strictQuery', false)

Products.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Products', Products);
