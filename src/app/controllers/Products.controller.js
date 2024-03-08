const BrandModel = require("../models/Brand.model");
const ProductsModel = require("../models/Products.model")
const path = require('path');
const fs = require('fs');
const Products = {
    // create product
    async createProduct(req, res) {
        try {
            const product = await ProductsModel.create(req.body.headers.product)
            const addBrand = await BrandModel.findById(product.brandID)
            addBrand.productsID.push(product._id)
            addBrand.save()
            res.status(201).json(product)
        }
        catch (err) {
            return res.status(401).json(err);
        }
    },
    // get product
    async getOneProduct(req, res) {
        try {
            const product = await ProductsModel.findById(req.params.id).populate('Model3D')
            res.status(201).json(product)
        }
        catch (err) {
            return res.status(500).json(err)
        }
    },

    //get All product

    async getAllProduct(req, res) {
        try {
            const product = await ProductsModel.aggregate([
                {
                    $lookup: {
                        from: "comments", // Collection chứa các comments
                        localField: "comments_id", // Trường trong collection products chứa các id của comments
                        foreignField: "_id", // Trường trong collection comments là id của comment
                        as: "populated_comments" // Tên của trường sau khi populate
                    }
                },
                {
                    $addFields: {
                        comments_id: "$populated_comments" // Ghi đè trường comments_id với kết quả đã populate
                    }
                },
            ]);
            res.status(201).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    //edit product
    async editProduct(req, res) {
        try {
            let product_P = await ProductsModel.findById(req.params.id);
            let originalBrandID = product_P.brandID;
            let updatedProductData = req.body.headers.product;
            const updatedProduct = await ProductsModel.findByIdAndUpdate(req.params.id, updatedProductData, { new: true });
            if (originalBrandID !== updatedProductData.brandID) {
                const originalBrand = await BrandModel.findById(originalBrandID);
                const productIndexInBrand = originalBrand.productsID.indexOf(req.params.id);
                if (productIndexInBrand !== -1) {
                    originalBrand.productsID.splice(productIndexInBrand, 1);
                    await originalBrand.save();
                }
                product_P.brandID = updatedProductData.brandID;
                await product_P.save();
                const newBrand = await BrandModel.findById(updatedProductData.brandID);
                if (newBrand) {
                    newBrand.productsID.push(req.params.id);
                    await newBrand.save();
                }
            } else {
                await product_P.save();
            }
            return res.status(201).json(updatedProduct);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // delete product
    async deleteProduct(req, res) {
        try {
            const product = await ProductsModel.findById(req.params.id)
            const Brand = await BrandModel.findById(product.brandID)
            for (let index = 0; index < Brand.productsID.length; index++) {
                if (req.params.id == Brand.productsID[index]) {
                    Brand.productsID.splice(index, 1);
                }
            }
            for (let index = 0; index < product.item.image.length; index++) {
                const filePath = path.join(__dirname, '../../public', product.item.image[index]);
                fs.unlinkSync(filePath);
            }
            await ProductsModel.findByIdAndDelete(req.params.id)
            Brand.save()
            return res.status(201).json('Delete success!!!')
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },




}


module.exports = Products