const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/users');

const userGet = async (req = request, res = response) => {
	
	const { limit = 5, from = 0 } = req.query;
	const query = {state:true}

	const [total, users] = await  Promise.all([
		User.countDocuments(query),
		User.find(query).skip(Number(from)).limit(Number(limit))
	])

	res.json({
		total,
		users		
	});
};

const userPut = async (req = request, res = response) => {

	const { id } = req.params;
	const { _id, password, email, ...resto } = req.body;
	
	if (password) {
		const salt = bcryptjs.genSaltSync();
		resto.password = bcryptjs.hashSync(password, salt);
	}	
	const user = await User.findByIdAndUpdate(id, resto,{ new: true });
	
	res.json({
		status: true,
		user,
	});
};

const userPost = async (req = request, res = response) => {
	const { name, email, password, rol, ...resto } = req.body;
	const user = new User({ name, email:email.toLowerCase() , password, rol });

	const existEmail = await User.findOne({ email });

	if (existEmail) {
		return res.status(400).json({
			msg: 'Email is already registered',
		});
	}
	
	const salt = bcryptjs.genSaltSync();
	user.password = bcryptjs.hashSync(password, salt);
	user.save();

	res.json({  
		msg: 'User saved correctly',
		user,
	});
};

const userDelete = async (req = request, res = response) => {
	const { id } = req.params;
	const user = await User.findByIdAndUpdate(id, {state:false});
    const userAuth = req.user;

	res.json({
		status: true,
		user,
        userAuth

	})
};

module.exports = {
	userGet,
    userPut,
    userPost,
    userDelete
};
