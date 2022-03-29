const { response, request } = require('express');
const Sale = require('../models/sale');
const Product = require('../models/product');
const { json, type } = require('express/lib/response');
const  moment = require('moment'); // require
moment().format(); 

const saleGet = async (req = request, res = response) => {
	const sales = await Sale.find();
	var arrayProduct = [];
	
	var arraySales = [];
	for (let index = 0; index < sales.length; index++) {
		arrayProduct = [];
		const sale = sales[index];
		const { products, _id, total, date } = sale;
		for (let index = 0; index < products.length; index++) {
			const productDB = await Product.findOne({
				_id: products[index].product,
			});

			arrayProduct.push({ productDB, amount: products[index].amount });
		}
		arraySales.push({
			_id,
			total,
			date,
			products: arrayProduct,
		});
	}

	return res.json({ arraySales });
};


const getSalesForMonth = async (req = request, res = response) => {
	const { date } = req.query;
	const datee = new Date( date);
	const sales = await Sale.find({
		date: { 
			$gte: sumDays(new Date( new Date(datee).setHours(00, 00, 00)),-1),
			$lt:  sumDays(new Date( new Date(datee).setHours(23, 59, 59)),-1)    
		 },
	 });
		

var arraySales = [];
	for (let index = 0; index < sales.length; index++) {
		arrayProduct = [];
		const sale = sales[index];
		const { products, _id, total, date } = sale;
		for (let index = 0; index < products.length; index++) {
			const productDB = await Product.findOne({
				_id: products[index].product,
			});

			arrayProduct.push({ productDB, amount: products[index].amount });
		}
		arraySales.push({
			_id,
			total,
			date,
			products: arrayProduct,
		});
	}	
	return res.json({
		sales:arraySales
	})
	

}

const saveSale = async (req = request, res = response) => {
	const { total, saleDate, products } = req.body;

	const dateNow = moment(saleDate).format('YYYY-MM-DD');

	products.forEach(async (element) => {
		const { product, amount } = element;
		const { _id } = product;
		const stockProduct = await Product.findOne({ _id }).select('stock');
		await Product.findByIdAndUpdate(_id, {
			stock: stockProduct.stock - amount,
		});
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


const getStatistics = async (req = request, res = response) => {
    const totalSales = await Sale.find().select({total:1 });

    const totalReduce = totalSales.reduce( (a, b) => a + (b['total'] || 0), 0 ) ;
    res.json({
        countSales: totalSales.length,
        totalReduce
        
    })
}

const getStatisticsOnDay = async (req = request, res = response) => {
	const date = new Date()
	
	const totalSales = await Sale.find({
		date: { 
			$gte: sumDays(new Date( new Date(date).setHours(00, 00, 00)),-1),
			$lt:  sumDays(new Date( new Date(date).setHours(23, 59, 59)),-1)    
		 },
	}).select({total:1});

    const totalReduce = totalSales.reduce( (a, b) => a + (b['total'] || 0), 0 ) ;
    res.json({
        countSales: totalSales.length,
        totalReduce
        
    })
}

const sumDays = (date, days)=>{
	date.setDate(date.getDate() + days);
	return date;
}

const getSalesLastDay = async( req = request, res = response ) => {
	const numberOfDays = req.query.numberOfDays;
	const dayForMonth = await lastDays(numberOfDays);
	const  arraySalesLastDays = await dayForMonth.map( async date => {
		dayFormatInit =  new Date(date).toISOString().replace('Z','').replace('T03','T00').replace(':00:00.000', ':00:00.000+00:00')
		dayFormatEnd =  new Date(date).toISOString().replace('Z','').replace(':00:00.000', ':00:00.000+00:00')
		
		const sales = await Sale.find({
			date: { 
				$gte:dayFormatInit,
				$lt:  dayFormatEnd,
			},
			
		});		
		
		return sales.length
	})
	
	Promise.all(arraySalesLastDays).then( (sales) => {
		return res.json({dayForMonth,sales});
	})

	
} 


const lastDays = async( numberOfDays ) => {

	const arrayLastDays = []
	const dateMoment = new moment()
	for (let index = 0; index < numberOfDays; index++) {
		const date = dateMoment.format('l')
		dateMoment.subtract(1, 'days').calendar();
		arrayLastDays.push(date);
	}
	return arrayLastDays
}


module.exports = { saleGet, saveSale, getStatistics, getSalesForMonth,getStatisticsOnDay,getSalesLastDay };
