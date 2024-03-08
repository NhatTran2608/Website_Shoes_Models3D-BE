const mongoose = require('mongoose');

const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const Category = new Schema(
    {
        name: { type: String },
        productsID: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            }
        ]
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.set('strictQuery', false)

Category.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Category', Category);
