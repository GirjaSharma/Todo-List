import { useState, useEffect, useReducer } from 'react'
import './App.css';
import {InputBox} from './components/InputBox'
import { TodoList } from './components/TodoList';
import {generateId} from './utils/id';


const App=()=> {
  const [task, setTask] = useState('');
 const [editId, setEditId] = useState(null);
  const [taskList, setTaskList] =useState(()=>{
    const retreivedData = localStorage.getItem('todoList');
    return retreivedData ? JSON.parse(retreivedData) : [];
  });
  
  
  const isEditing = editId !== null;
  console.log(isEditing)

  

  useEffect(() => {
localStorage.setItem('todoList', JSON.stringify(taskList));
  }, [taskList]);


  const handleAddBtn=(e)=>{
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
    setTask('')

    }


const handleRemoveIcon =(id)=>{
  setTaskList(taskList => taskList.filter(task => task.id !== id))
  
}

    const handleEditIcon=(id)=>{
      setEditId(id);
     const currentTask = taskList.find(task => task.id === id)
     currentTask && setTask(currentTask.text)
    }

    const handleUpdateBtn=()=>{
      const updatedArr = taskList.map((t) => {
        if(t.id=== editId){
          return {
              ...t,
          text: task,
        }
      } 
        return t
      });
      setTaskList(updatedArr);
      setTask('')
        setEditId(null)
    }

    const handleCancelBtn=()=>{
      setEditId(null)
    }

    const handleCheckBoxChange =(id)=>{
       const checkedList =taskList.map(task => {
        if(task.id === id){
          return {
            ...task,
            completed: !task.completed
          }
        }return task
       
       })
       setTaskList(checkedList)
    }
    


  return (
    <div className="todoContainer">
       <h1>My ToDo List</h1>
       <InputBox task={task} onAddTask={handleAddBtn} setTask={setTask} isEditing={isEditing} onCancelTask={handleCancelBtn} onUpdateTask={handleUpdateBtn} 

       />


       {taskList.length >0 && <TodoList taskList={taskList} 
       onDelete={handleRemoveIcon}
        onEdit={handleEditIcon}
        onCheckboxChange={handleCheckBoxChange}
        isEditing={isEditing}
       />}
    </div>
  )
}

export default App
