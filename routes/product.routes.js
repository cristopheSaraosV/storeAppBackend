const { Router } = require('express');
const {	productGet, productPost, productPut,productDelete, searchProductsWithName, productsUnderStock, productGetSales } = require('../controllers/product.controller');
const { validateFields } =require('../middlewares');
const { check } = require('express-validator')
const { existProductById } = require('../helpers/db-validatiors');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole,hasRole } = require('../middlewares/validate-roles');

const routerProduct = Router();

routerProduct.get(`/`,[
    validateJWT,
    hasRole('ADMIN_ROLE','EMPLOYEE_ROLE'),
], productGet);

routerProduct.get(`/search`, [
    validateJWT,
    hasRole('ADMIN_ROLE','EMPLOYEE_ROLE'),
],searchProductsWithName);

routerProduct.get(`/sales`, [
    validateJWT,
    hasRole('ADMIN_ROLE','EMPLOYEE_ROLE'),
],productGetSales);

routerProduct.post(`/`,[
    validateJWT,
    hasRole('ADMIN_ROLE','EMPLOYEE_ROLE'),
    check('name','The name is required').not().isEmpty(),
    check('description' ,'The description is required').not().isEmpty(),
    check('description','The description must have more than 6 letters').isLength({ min:6 }),
    check('price' ,'The price is required').not().isEmpty(),
    check('price','The price must have more than 3 letters').isLength({ min:3 }),
    check('stock' ,'The stock is required').not().isEmpty(),
    check('category' ,'The category is required').not().isEmpty(),
    check('category' ,'The category is not a valid ID').isMongoId(),
    validateFields
] , productPost);


routerProduct.put(`/:id`,[
    validateJWT,
    hasRole('ADMIN_ROLE','EMPLOYEE_ROLE'),
    check('id','It is not a valid ID').isMongoId(),
    check('id').custom(existProductById),
    validateFields
], productPut);

routerProduct.delete(`/:id`, [
    validateJWT,
    hasRole('ADMIN_ROLE','EMPLOYEE_ROLE'),
    check('id','It is not a valid ID').isMongoId(),
    check('id').custom(existProductById),
    validateFields

],productDelete);


routerProduct.get(`/under_stock`, [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    validateFields
],productsUnderStock);


module.exports = routerProduct;
