const CartModel = require("../models/Cart.model");
const OrderModel = require("../models/Order.model");
const ProductsModel = require("../models/Products.model");
const UserModel = require("../models/User.model");

const Cart = {
    async getCart(req, res) {
        try {
            const cart = await CartModel.findById(req.params.id)
                .populate({
                    path: 'items.product_id', // Tên trường cần populate
                    model: 'Products' // Tên mô hình mà trường product_id tham chiếu đến
                })
                .exec();
            return res.status(200).json(cart);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // add Cart

    async addCart(req, res) {
        try {
            const cartId = req.params.id;
            const cart = await CartModel.findById(cartId);
            if (!cart) {
                return res.status(404).json({ error: 'Cart not found' });
            }
            const { id, size } = req.body.product;
            const existingProduct = cart.items.find(item =>
                id === item.product_id.toHexString() &&
                size === item.size
            );

            if (existingProduct) {
                existingProduct.quantity += 1;
            }
            else {
                const product = {
                    product_id: id,
                    size,
                    image: req.body.product.image,
                    name: req.body.product.name,
                    color: req.body.product.color,
                    quantity: 1,

                };
                cart.items.push(product);
            }
            await cart.save();
            res.status(201).json(cart);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    //update cart
    async updateCart(req, res) {
        try {
            const cart = await CartModel.findByIdAndUpdate(req.params.id, req.body.product)
            return res.status(201).json(cart)

        }
        catch (err) {
            return res.status(500).json(err)
        }
    },

    async createPayment(req, res) {
        try {
            const cart = await CartModel.findById(req.body.product.Cart_id);
            if (!cart || cart.items.length === 0) {
                return res.status(400).json({ error: 'Cart is empty' });
            }
            // let sum = 0;
            for (let index = 0; index < cart.items.length; index++) {
                let resp = await ProductsModel.findById(cart.items[index].product_id)
                for (let i = 0; i < resp.item.sizes.length; i++) {
                    
                    if (cart.items[index].size == resp.item.sizes[i].size) {
                        resp.quantity_buy = resp.quantity_buy + cart.items[index].quantity
                        resp.item.sizes[i].quantity = resp.item.sizes[i].quantity - cart.items[index].quantity
                    }
                }
                // resp.quantity_buy = sum;
                resp.save()
            }
            order = new OrderModel({
                user_id: req.body.product.product.user_id,
                cart_items: {
                    status: req.body.status,
                    address: req.body.product.product.address,
                    phoneNumber: req.body.product.product.phoneNumber,
                    total: req.body.product.product.total,
                    product: cart.items.map(cartItem => ({
                        product_id: cartItem.product_id,
                        image: cartItem.image,
                        color: cartItem.color,
                        size: cartItem.size,
                        quantity: cartItem.quantity,
                    })),
                },
            });
            const user = await UserModel.findById(req.body.product.product.user_id)
            user.order_id.push(order._id)
            await user.save()
            cart.items = []
            // Lưu đơn hàng mới
            await order.save();
            await cart.save()
            return res.status(201).json(order);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },







    // delete product to cart

}


module.exports = Cart