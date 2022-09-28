const mongoose = require('mongoose');
const Schema = mongoose.Schema;

list = new Schema( {
	
	unique_id: Number,
	name: {
		type: String,
	},
	criteria: {
		type: String
	},
    value:{
		type: Number,
        required: true,
    },
	days: {
		type: String,
	},
	pricesignal: {
		type: String,
	},

	email: String,
	phone: {
		type: Number,
        required: true,
	},
	
	
	lastLogin : { type : Date, default: Date.now }
})


List = mongoose.model('list', list);

module.exports = List;