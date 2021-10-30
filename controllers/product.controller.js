const { response, request } = require('express');
const Product = require('../models/product');
const Category = require('../models/category');
const { $where } = require('../models/product');
const { uploadFile } = require('../helpers/uploadFile');

const cloudinary = require('cloudinary').v2;

const searchProductsWithName = async (req = request, res = response) => {
	const { product, category } = req.query;

	var productSearch;

	if (category == undefined) {
		const regex = new RegExp(product, 'i');
		productSearch = await Product.find({ name: regex });
	} else {
		productSearch = await Product.find({ category: category });
	}

	const products = await Promise.all(
		productSearch.map(async (product) => {
			const { name } = await Category.findById(product.category);
			return {
				img: product.img,
				state: product.state,
				_id: product._id,
				name: product.name,
				description: product.description,
				price: product.price,
				stock: product.stock,
				category: name,
			};
		})
	);

	res.json(products);
};

const productGet = async (req = request, res = response) => {
	const { page = 1, from = 1 } = req.query;

	const [total, productsPromise] = await Promise.all([
		Product.countDocuments(),
		Product.find()
			.skip(Number(from))
			.limit(page * 6),
	]);

	const products = await Promise.all(
		productsPromise.map(async (product) => {
			const { name } = await Category.findById(product.category);
			return {
				img: product.img,
				state: product.state,
				_id: product._id,
				name: product.name,
				description: product.description,
				price: product.price,
				stock: product.stock,
				category: name,
			};
		})
	);

	res.json({
		total,
		products,
	});
};
const productPost = async (req = request, res = response) => {
	cloudinary.config(JSON.parse(process.env.CLOUDINARY_URL));

	if (!req.files || Object.keys(req.files) === 0 || !req.files.file) {
		res.status(400).json({ msg: 'No file to load' });
		return;
	}
	const { tempFilePath } = req.files.file;
	const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

	const {
		name,
		description,
		price,
		stock,
		state,
		category,
		...resto
	} = req.body;

	const product = new Product({
		name,
		description,
		price,
		stock,
		state,
		img: secure_url,
		category,
	});
	const existProduct = await Product.findOne({ name });

	const existCategory = await Category.findById({ _id: category });

	if (existProduct) {
		return res.status(400).json({
			msg: 'Product is already registered',
		});
	}
	if (!existCategory) {
		return res.status(400).json({
			msg: 'category does not exist',
		});
	}
	product.save();

	res.json({
		msg: 'Product saved correctly',
		product: {
			img: product.img,
			state: product.state,
			_id: product._id,
			name: product.name,
			description: product.description,
			price: product.price,
			stock: product.stock,
			category: existCategory.name,
		},
	});
};

const productPut = async (req = request, res = response) => {
	const { id } = req.params;
	const {
		name,
		description,
		price,
		stock,
		state,
		category,
		img,
		...resto
	} = req.body;

	if (!req.files || Object.keys(req.files) === 0 || !req.files.file) {
		res.status(400).json({ msg: 'No file to load' });
		return;
	}
	const categorySelected = await Category.findOne(
		$where[({ name: category }, { _id: category })]
	);

	cloudinary.config(JSON.parse(process.env.CLOUDINARY_URL));

	const productToBeUpdated = await Product.findById(id);
	if (productToBeUpdated.img) {
		const nameArr = productToBeUpdated.img.split('/');
		const name = nameArr[nameArr.length - 1];
		const [public_id] = name.split('.');
		cloudinary.uploader.destroy(public_id);
	}

	const { tempFilePath } = req.files.file;
	const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

	const updatedProduct = await Product.findByIdAndUpdate(
		id,
		{
			name,
			description,
			price,
			stock,
			state: true,
			category: categorySelected._id,
			img: secure_url,
		},
		{ new: true }
	);

	const product = {
		...updatedProduct,
		category: categorySelected.name,
	};

	res.json({
		status: true,
		product,
	});
};

const productDelete = async (req = request, res = response) => {
	const { id } = req.params;

	const product = await Product.findByIdAndDelete(id);

	res.json({
		status: true,
		product,
	});
};

module.exports = {
	productGet,
	productPost,
	productPut,
	productDelete,
	searchProductsWithName,
};
