const BrandModel = require("../models/Brand.model");


const brandController = {
    async createBrand(req, res) {
        try {
            const checkName = await BrandModel.findOne({ name: req.body.headers.brand.name })
            if (checkName) {
                return res.status(401).json({
                    mes: 'Tên thương hiệu đã tồn tại'
                })
            }
            const brand = await BrandModel.create(req.body.headers.brand)
            res.status(201).json(brand)
        }
        catch (err) {
            res.status(401).json(err);
        }
    },
    async getAllBrand(req, res) {
        try {
            const brand = await BrandModel.find({}).lean()
            res.status(201).json(brand);
        }
        catch (err) {
            res.status(401).json(err)
        }
    },
    async getOneBrand(req, res) {
        try {
            const brand = await BrandModel.findById(req.params.id)
            res.status(201).json(brand);
        }
        catch (err) {
            return res.status(401).json(err);
        }
    }
}

module.exports = brandController