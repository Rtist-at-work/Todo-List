const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
	id:{
		type:String,
		required: true,
		unique: true
	},
	task: String,
	done: {
		type: Boolean,
		default: false
	}
})

const TodoModel  = mongoose.model("todos",TodoSchema)
module.exports = TodoModel