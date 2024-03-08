const authRouter = require('./Auth')
const products = require('./Products')
const Brand = require('./Brand')
const Upload = require('./UploadImg')
const Cart = require('./Cart')
const History = require('./History')
const Order = require('./Order')
const Upload3D = require('./Upload3D')
const Comment = require('./Comments')
function route(app) {
    app.use('/v1/shop', authRouter);
    app.use('/v1/product', products);
    app.use('/v1/brand', Brand)
    app.use('/v1/Upload', Upload)
    app.use('/v1/Upload3D', Upload3D)
    app.use('/v1/cart/', Cart)
    app.use('/v1/history/', History)
    app.use('/v1/order', Order),
    app.use('/v1/comment',Comment )
}
module.exports = route;
