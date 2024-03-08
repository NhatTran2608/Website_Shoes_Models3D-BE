const mongoose = require('mongoose');

const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const Model3D = new Schema(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        Model3D: { type: String },
        rating: [
            {
                position: {
                    x: {
                        type: String
                    },
                    y: {
                        type: String
                    },
                    z: {
                        type: String
                    }
                },
                normal: {
                    x: {
                        type: String
                    },
                    y: {
                        type: String
                    },
                    z: {
                        type: String
                    }
                },
                title: { type: String }
            }
        ],

    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.set('strictQuery', false)

Model3D.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Model3D', Model3D);
