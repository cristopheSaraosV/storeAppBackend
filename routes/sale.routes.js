const { Router } = require('express');
const { saleGet, saveSale, getStatistics, getSalesForMonth,  getStatisticsOnDay, getSalesLastDay } = require('../controllers/sale.controller');
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

routerSales.get('/statisticsForMonth',[
    validateJWT,
    hasRole('ADMIN_ROLE'),
    validateFields
],
getStatistics)

routerSales.get('/statisticsOnDay',[
    validateJWT,
    hasRole('ADMIN_ROLE'),
    validateFields
],
getStatisticsOnDay)

routerSales.get('/salesLastDay',[
    validateJWT,
    hasRole('ADMIN_ROLE'),
    validateFields
],
getSalesLastDay)

module.exports = routerSales;
