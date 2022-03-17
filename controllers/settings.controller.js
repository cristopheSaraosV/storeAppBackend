const { response, request } = require('express');
const settings = require('../models/settings');

const getMarginSales = async (req = request, res = response) => {
	const marginSale = await settings.findOne().select({ 'saleLow':1, 'saleHight':1, 'uid':1, 'productHight':1 });
	res.json(marginSale);
};

const updateMarginSales = async (req = request, res = response) => {
	const { uid, saleLow, saleHight, productHight } = req.body.marginsale;
	if (Number(saleLow) > Number(saleHight)) {
		return res.status(200).json({
			msg:
				'UPS, the high sales value can not be less than low value value',
		});
	}else {
		if (uid) {
			const existeSetting = await settings.findById(uid);

			if (existeSetting) {
				const marginSale = await settings.findOneAndUpdate(
					uid,
					{
						saleLow,
						saleHight,
						productHight 
					},
					{ new: true }
				).select({ 'saleLow':1, 'saleHight':1, 'uid':1, 'productHight':1 });

				res.json(marginSale);
			}
		} else {
			const setting = new settings({ saleLow, saleHight, productHight  });
			const marginSale = await setting.save();
			res.json(marginSale);
		}
	}
};



module.exports = {
	getMarginSales,
	updateMarginSales,
};
