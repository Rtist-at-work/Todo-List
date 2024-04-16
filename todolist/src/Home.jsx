import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { ImRadioUnchecked } from "react-icons/im";
import { FaRegTrashAlt } from "react-icons/fa";
import './App.css'

const Home = () => {
	const [todos,setTodos] = useState([]);

	useEffect(()=>{
		axios.get('http://localhost:3001/get')
		.then(result=>setTodos(result.data))
		.catch(err=>console.log(err))
		
	},[])
	const handleEdit = async (id)=>{
		
			try{
				const result = await axios.put('http://localhost:3001/update/'+id);
				location.reload();
			}
			catch(err){
				console.log(err)
			}
	}		
	const handleDelete = async (id)=>{
		try{
			const result = await axios.delete('http://localhost:3001/delete/'+id)
			location.reload()
		}
		catch(err){
			console.log(err)
		}
	}
  return (
	<div className='home'>
		<h2>
			Todo List
		</h2>
		<Create/>
		{
			todos.length ? 
			todos.map(
				(todo)=>
				<div className="task" key={Math.random()}>
					<div className="checkmark" onClick={()=>{handleEdit(todo._id)}}>
						{
							todo.done ? <IoIosCheckmarkCircle className='icon'/> : <ImRadioUnchecked className='icon'/> 
							
						}
						<p className={todo.done ? 'taskdone': "tasktobedone" }>{todo.task}</p>
					</div>
					<div className="del">
						<span className='trash' ><FaRegTrashAlt onClick={()=>{handleDelete(todo._id)}}/></span>
					</div>
					 
				</div>) :

				<div><h2>No Records</h2></div>
			
			
		}
	</div>
  )
}

export default Home