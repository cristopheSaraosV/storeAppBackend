const { Router } = require('express');
const { saleGet, saveSale, getStatistics, getSalesForMonth } = require('../controllers/sale.controller');
const { validateFields } =require('../middlewares');
const { check } = require('express-validator')
const { isAdminRole,hasRole } = require('../middlewares/validate-roles');
const { validateJWT } = require('../middlewares/validate-jwt');



const routerSales = Router();

routerSales.get(`/`,[
    validateJWT,
    hasRole('ADMIN_ROLE','EMPLOYEE_ROLE'),
] ,saleGet);


routerSales.get('/date',[
    validateJWT,
    hasRole('ADMIN_ROLE','EMPLOYEE_ROLE'),
] ,getSalesForMonth);

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
