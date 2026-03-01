import { useState, useEffect, useReducer } from 'react'
import './App.css';
import {InputBox} from './components/InputBox'
import { TodoList } from './components/TodoList';
import {generateId} from './utils/id';
import {reducer, initial_state as defaultInitialState} from './reducer/Reducer';
import {ACTION_TYPES} from './constants/actionTypes'


const App=()=> {

  const initialState=(defaultInitialState)=>{
    try{
      const storedData = localStorage.getItem('todoList');
      return storedData ? {...defaultInitialState,taskList: Array.isArray(JSON.parse(storedData)) ? JSON.parse(storedData) : defaultInitialState} : defaultInitialState;
    }catch(error){
      console.error("Error reading from localStorage");
      return defaultInitialState;
    }
  }

  const [state, dispatch]= useReducer(reducer, defaultInitialState, initialState);
  
  
  const isEditing = state.editId !== null;

  

  useEffect(() => {
localStorage.setItem('todoList', JSON.stringify(state.taskList));
  }, [state.taskList]);


  const handleAddBtn=(e)=>{
    e.preventDefault();

    dispatch({
      type: ACTION_TYPES.ADD_TASK,
      payload: {
        id:generateId(),
        text: state.task.trim(),
        completed: false
      }
    })

    }


const handleRemoveIcon =(id)=>{
  dispatch({type: ACTION_TYPES.DELETE_TASK, payload: id})
  
}

    const handleEditIcon=(id)=>{
      dispatch({type: ACTION_TYPES.START_EDIT, payload: id})
     
    }

    const handleUpdateBtn=()=>{
      dispatch({type: ACTION_TYPES.UPDATE_TASK})
      
    }

    const handleCancelBtn=()=>{
      dispatch({type: ACTION_TYPES.CANCEL_UPDATE})
    }

    const handleCheckBoxChange =(id)=>{
      dispatch({type: ACTION_TYPES.TOGGLE_TASK, payload: id})
    }
    

    const handleTaskChange=(newValue)=>{
      dispatch({type: ACTION_TYPES.SET_TASK_INPUT, payload: newValue})
    }


  return (
    <div className="todoContainer">
      <h1>My ToDo List</h1>
        <InputBox task={state.task} onAddTask={handleAddBtn}
        onTaskChange={handleTaskChange} 
        isEditing={isEditing} 
        onCancelTask={handleCancelBtn} 
        onUpdateTask={handleUpdateBtn} 
/>


       {state?.taskList?.length > 0 && <TodoList taskList={state.taskList} 
       onDelete={handleRemoveIcon}
        onEdit={handleEditIcon}
        onCheckboxChange={handleCheckBoxChange}
        isEditing={isEditing}
       />}
    </div>
  )
}

export default App
