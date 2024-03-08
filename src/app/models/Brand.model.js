const mongoose = require('mongoose');

const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const Brand = new Schema(
    {
        name: { type: String, require: true },
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

Brand.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Brand', Brand);
