import React, { useState } from 'react'
import './App.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Create = () => {
	const [task,setTask] = useState()


	const handleTask = async ()=>{
		try{
			const result = await axios.post('http://localhost:3001/add',{
			id: uuidv4(),	
			task:task});
			location.reload();
		}
		catch(err){
			console.log(err);
		}
		setTask("");
	}
  return (
	<div>
		<input type="text" className="text" placeholder='Enter Task' onChange={(e)=>{
			setTask(e.target.value)
		}}/>
		<button className="btn" onClick={handleTask}>ADD</button>
	</div>
  )
}

export default Create