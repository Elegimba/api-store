const Product = require('../models/products.model')

const getAll = async (req, res, next) => {
    try {
        const products = await Product.find().populate('creator', '-_id username email'); // Con .populate() hacemos que muestre el modelo relacionado y le decimos qué modelo mostrar y qué campos de ese modelo, PERO también descartamos campos con -(clave)
        res.json(products);
    } catch (error) {
        next(error);
    }
}

const getById = async (req, res, next) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        res.json(product);
    } catch (error) {
        next(error);
    }
}

const getByPrice = async (req, res, next) => {
    const { min, max } = req.params;
    try {
        // SELECT * FROM products WHERE price >= min AND price <= max
        const products = await Product.find({
            price: {
                $gte: min, // $gt(mayor que), $gte(mayor o igual que)
                $lte: max
            }
        });
        res.json(products);
    } catch (error) {
        next(error);
    }
}

const getActives = async (req, res, next) => {
    try {
        const products = await Product.find({
            stock: { $gte: 10 },
            available: true
        });
        res.json(products);
    } catch (error) {
        next(error);
    }
}

const create = async (req, res, next) => {
    req.body.creator = req.user._id;
    try {
        const product = await Product.create(req.body);
        res.json(product);
    } catch (error) {
        next(error);
    }
}

const updateProduct = async (req, res, next) => {
    const { productId } = req.params;
    try {
        const product = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        res.json(product);
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    const { productId } = req.params;
    try {
        const product = await Product.findByIdAndDelete(productId);
        res.json(product);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAll, create, updateProduct, remove, getById, getByPrice, getActives
}