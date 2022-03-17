const { Router } = require('express');
const { hasRole } = require('../middlewares/validate-roles');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getMarginSales, saveMarginSales, updateMarginSales } = require('../controllers/settings.controller');



const routerSettings = Router();

routerSettings.get(`/sales`,[
    validateJWT,
    hasRole('ADMIN_ROLE','EMPLOYEE_ROLE'),
] ,getMarginSales);


routerSettings.put(`/sales`,[
    validateJWT,
    hasRole('ADMIN_ROLE','EMPLOYEE_ROLE'),
] ,updateMarginSales);



module.exports = routerSettings;
