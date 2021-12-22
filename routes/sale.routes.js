const { Router } = require('express');
const { saleGet, saveSale, getStatistics } = require('../controllers/sale.controller');
const { validateFields } =require('../middlewares');
const { check } = require('express-validator')
const { isAdminRole,hasRole } = require('../middlewares/validate-roles');
const { validateJWT } = require('../middlewares/validate-jwt');



const routerSales = Router();

routerSales.get(`/`,[
    validateJWT,
    hasRole('ADMIN_ROLE','EMPLOYEE_ROLE'),
] ,saleGet);

routerSales.post('/save',[
    validateJWT,
    hasRole('ADMIN_ROLE','EMPLOYEE_ROLE'),
    validateFields
],
saveSale)
routerSales.get('/statistics',[
    validateJWT,
    hasRole('ADMIN_ROLE'),
    validateFields
],
getStatistics)

module.exports = routerSales;
