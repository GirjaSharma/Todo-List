import { useState, useEffect } from 'react'
import './App.css';
import {InputBox} from './components/InputBox'
import { TodoList } from './components/TodoList';
import {generateId} from './utils/id';


const App=()=> {
  const [task, setTask] = useState('');
  const retreivedData = JSON.parse(localStorage.getItem('todoList')) || [];
  const [taskList, setTaskList] =useState(retreivedData);
  const [isEditing, setIsEditing] =useState(false);
  const [editId, setEditId] = useState(null);
  
  console.log(retreivedData)

  useEffect(() => {
console.log(taskList)
localStorage.setItem('todoList', JSON.stringify(taskList));


  }, [taskList]);

  const handleAddorUpdateBtn=(e)=>{
    e.preventDefault();

    if(!task.trim()){
      alert("Please add a task");
      // add functionality to disbale button instead of alert
      return;
    }
    
    const newTask={
        id: generateId(),
        text: task,
        completed: false
    }
    setTaskList(prevTasks => [...prevTasks, newTask])
    console.log("tasksss", taskList)
    setTask('')

    }


const handleRemoveBtn =(id)=>{
  console.log("----", id)
  setTaskList(taskList => taskList.filter(task => task.id !== id))
  
}

    const handleEdit=(id)=>{
      setIsEditing(true)
      setEditId(id);
     const currentTask = taskList.find(task => task.id === id)

    console.log(currentTask.text)
     setTask(currentTask.text)

   
    // show modal before deleting a task, are you sure you want to delete with delete and cancel button and cross to close modal
    // also add cancel button with update incase user doesn't want to update and cancel

    }
    


  return (
    <div className="todoContainer">
       <h1>My ToDo List</h1>
       <InputBox task={task} onAddTask={handleAddorUpdateBtn} setTask={setTask} isEditing={isEditing}/>
       {taskList.length >0 && <TodoList taskList={taskList} 
       onDelete={handleRemoveBtn}
        onEdit={handleEdit}
        isEditing={isEditing}
       />}
    </div>
    
    
  )
}

export default App
