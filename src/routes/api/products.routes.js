const router = require('express').Router();

const { getAll, create, updateProduct, remove, getById, getByPrice, getActives } = require('../../controllers/products.controller');
const { checkToken } = require('../../middlewares/users.middlewares');


router.get('/', getAll);
router.get('/price/:min/:max', getByPrice);
router.get('/active', getActives);
router.get('/:productId', getById);

router.post('/', checkToken, create);
router.put('/:productId', updateProduct);
router.delete('/:productId', remove);


module.exports = router;