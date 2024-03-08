const Model3DModel = require("../models/Model3D.model")
const ProductsModel = require("../models/Products.model")

const model3DController = {
    async create3D(req, res) {
        try {
            const Model3D = await Model3DModel.create(req.body.headers.model3D)
            Model3D.Model3D = req.body.headers.model3D.nameModel[0]
            Model3D.rating = req.body.headers.model3D.render3D
            Model3D.product_id = req.body.headers.model3D.nameProduct
            const product = await ProductsModel.findById(req.body.headers.model3D.nameProduct)
            product.Model3D = Model3D._id
            product.save();
            Model3D.save();
            return res.status(200).json(Model3D);
        }
        catch (err) {
            return res.status(500).json(err)
        }
    }

}

module.exports = model3DController