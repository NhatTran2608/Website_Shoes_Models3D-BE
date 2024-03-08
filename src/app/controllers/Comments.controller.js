const CommentModel = require('../models/Comments.model')
const HistoryModel = require('../models/History.model')
const ProductsModel = require('../models/Products.model')


const commentsController = {

    async createComments(req, res) {
        try {
            const idHistory = await HistoryModel.findById(req.body.content.history_id);
            let CheckHistory = idHistory.cart_items.product.find(item => item._id.toString() === req.body.content.product_item_id);
            if (CheckHistory.evaluate === true) {
                const existingComment = await CommentModel.findById(CheckHistory.comments_id)
                existingComment.comment = req.body.content.comment_contents
                existingComment.rating = req.body.content.rating
                await existingComment.save()
                return res.status(200).json(existingComment);
            } else {
                const comment = await CommentModel.create({
                    comment: req.body.content.comment_contents,
                    user_id: req.body.content.idUser,
                    product_id: req.body.content.idProduct,
                    rating: req.body.content.rating
                });
                const product = await ProductsModel.findById(req.body.content.idProduct);
                product.comments_id.push(comment._id);
                const history = await HistoryModel.findById(req.body.content.history_id);
                let foundCartItem = history.cart_items.product.find(item => item._id.toString() === req.body.content.product_item_id);
                foundCartItem.evaluate = true;
                foundCartItem.comments_id = comment._id;
                await history.save();
                await product.save();
                await comment.save();
                return res.status(201).json(comment);

            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },



    // async createComments(req, res) {
    //     try {

    //         console.log(req.body.content.history_id);
    //         const comment = await CommentModel.create(req.body.content)
    //         comment.comment = req.body.content.comment_contents
    //         comment.user_id = req.body.content.idUser
    //         comment.product_id = req.body.content.idProduct
    //         const product = await ProductsModel.findById(req.body.content.idProduct)
    //         product.comments_id.push(comment._id)
    //         const history = await HistoryModel.findById(req.body.content.history_id)
    //         let foundCartItem = history.cart_items.product.find(item => item._id.toString() === req.body.content.product_item_id);
    //         foundCartItem.evaluate = true
    //         foundCartItem.comments_id = comment._id
    //         history.save();
    //         product.save();
    //         comment.save();
    //         res.status(201).json(comment)
    //     }
    //     catch (err) {
    //         return res.status(500).json(err);
    //     }
    // },

    async getOneComment(req, res) {
        try {
            const comment = await CommentModel.findById(req.params.id).populate('user_id')
            return res.status(201).json(comment)
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }

}

module.exports = commentsController