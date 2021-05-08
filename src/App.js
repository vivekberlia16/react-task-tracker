import './App.css';

import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';


function App() {

  const[showAddTask, setShowAddTask]=useState(false)
  const [tasks, setTasks] = useState([ 
  ]);

   useEffect(() => {

    const getTasks =async()=>{
      const tasksFromServer= await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks()
  }, [])


  const fetchTasks = async()=>{
    const res= await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  }

  const fetchTask = async(id)=>{
    const res= await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  }



  const deleteTask = async(id)=>{
     console.log('delete'+id);
      await fetch(`http://localhost:5000/tasks/${id}`,{
       method: 'DELETE',
     });
     setTasks(tasks.filter((task)=>task.id!==id))
    
  }

  const addTask = async (task)=>
  {
    //  console.log(task);
    //  const id =Math.floor(Math.random()*10000)+1;
    //  const newTask ={id, ...task}


    const res=await fetch(`http://localhost:5000/tasks/`,{
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type':'application/json'
      }
    });
    const data = await res.json();
     setTasks([...tasks, data])
  }


  const toggleRemainder= async(id)=>{

    let taskToToggle = await fetchTask(id);
    const updatedTask = {...taskToToggle, remainder: !taskToToggle.remainder}

    const res=await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      body: JSON.stringify(updatedTask),
      headers: {
        'Content-Type':'application/json'
      }
    });
    
    let data=await res.json();

    console.log('toggle'+id);
    setTasks(tasks.map((task)=>task.id===id?{...task,remainder:data.remainder}:task))
  }
  return (
    <div className="container">
      <Header onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {
        showAddTask&&<AddTask  onAdd={addTask}/>
      }
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleRemainder}/>
      <Footer/>
    </div>
  );
}

export default App;
