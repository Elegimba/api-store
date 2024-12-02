const jwt = require('jsonwebtoken');
const User = require('../models/users.model');

const checkToken = async (req, res, next) => {
    // ¿Está el token en la cabecera?
    if(!req.headers['authorization']) {
        return res.status(403).json({ message: 'Debes incluir la cabecera Authorization' });
    }

    const token = req.headers['authorization'];

    // ¿Es un token válido?
    let data;
    try {
        data = jwt.verify(token, 'clavesecreta')
    } catch (error) {
        return res.status(403).json({ message: 'El token es incorrecto' });
    }

    // ¿Existe el usuario en la BD?
    const user = await User.findById(data.user_id);
    if(!user) {
        return res.status(403).json({ message: 'El usuario no existe' });
    }

    // Colocamos el user dentro de "req"
    req.user = user;

    next();
}

module.exports = {
    checkToken
}