const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo')
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/test')

app.get('/get',async(req,res)=>{
	try{
		const result = await TodoModel.find();
		res.json(result);
	}
	catch(err){
		res.json(err)
	}
})

app.post('/add',async(req,res)=>{
	const id = req.body.id;
	const task = req.body.task;
	try{
		const result = await TodoModel.create({
		id:id,
		task:task
	});
	res.json(result);
	}
	catch(err){
		res.json(err)
	}
})
app.put('/update/:id',async (req,res)=>{
	const {id} = req.params;
	try{
		const task = await TodoModel.findById(id);
		if(!task){
			return(res.status(400).json({error:"Result not found"}))
		}
		task.done = !task.done ; 
		const result = task.save();
		res.json(result);	
	}
	catch(err){
		console.log("Error updating Document", err);
		// res.status(500).json({error : "Internal server error"})
	}
})
app.delete('/delete/:id',async (req,res)=>{
	const {id} = req.params;
	try{
		const result = await TodoModel.findByIdAndDelete(id)
		res.json(result);
	}
	catch(err){
		res.json(err);
	}
})

app.listen(3001,()=>{
	console.log("server running successfully")
}
)