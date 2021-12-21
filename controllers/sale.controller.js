const { response, request } = require('express');
const Sale = require('../models/sale');
const Product = require('../models/product');

const saleGet = async (req = request, res = response) => {
	const sales = await Sale.find();
	var arraySales = [];
    var arrayProduct = [];

	for (let index = 0; index < sales.length; index++) {
        arrayProduct = [];
		const sale = sales[index];
		const { products, _id, total, date } = sale;
		for (let index = 0; index < products.length; index++) {
			const productDB = await Product.findOne({
				_id: products[index].product,
			});

			arrayProduct.push({productDB,'amount':products[index].amount});
		}
		arraySales.push({
			_id,
			total,
			date,
			products:arrayProduct,
		});
	}

	return res.json({arraySales});
};


const saveSale = async (req = request, res = response) => {
	const { total, saleDate, products } = req.body;

	const dateNow = new Date(saleDate);

    console.log(products);
    products.forEach( async element => {
        
        const { product, amount } = element;
        const { _id } = product;
        const stockProduct = await Product.findOne({_id}).select("stock");
        await Product.findByIdAndUpdate(_id,{stock: stockProduct.stock-amount})
        
    });

	const sale = new Sale({
		total,
		date: dateNow,
		products,
	});

	sale.save();

	res.json({
		status: true,
		sale,
	});
};

module.exports = { saleGet, saveSale };
