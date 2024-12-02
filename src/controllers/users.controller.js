const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/users.model");

// Example controller
const getAll = (req, res, next) => {
    res.send('getAll');
}

const register = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 8); // Ese 8 es el nivel de encriptación, recomentdado entre 8-12

        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    // ¿Existe el email en la BD?
    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        return res.status(401).json({ message: 'Error email y/o contraseña' });
    }

    // ¿Coinciden las password?
    const equals = await bcrypt.compare(req.body.password, user.password);
    if(!equals) {
        return res.status(401).json({ message: 'Error email y/o contraseña' });
    }

    res.json({ 
        message: 'Login correcto',
        token: jwt.sign({ user_id: user._id }, 'clavesecreta')
    });
}

const addProduct = async (req, res, next) => {
    const { productId } = req.params;
    req.user.cart.push(productId);
    await req.user.save();
    res.json(req.user);
}

module.exports = {
    getAll, register, login, addProduct
}