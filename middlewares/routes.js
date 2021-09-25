const productRouter = require('../routers/productRouter');
const categoryRouter = require('../routers/categoryRouter');
const cartRouter = require('../routers/cartRouter');

module.exports = (app) => {
    app.use('/api/product', productRouter);
    app.use('/api/category', categoryRouter);
    app.use('/api/cart', cartRouter);
}