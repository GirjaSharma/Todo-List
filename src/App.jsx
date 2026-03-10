import { useState, useEffect, useReducer } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import {generateId, getNow, formatTime, getDayKey} from './utils/utils';
import {reducer, initial_state as defaultInitialState} from './reducer/Reducer';
import {ACTION_TYPES} from './constants/actionTypes';
import {Navbar} from './components/Navbar/Navbar';
import CurrentDate from './Pages/Today/CurrentDate';
import History from './Pages/History/HistoryPage';
import SettingsPage from './Pages/Settings/SettingsPage';


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
    const now=getNow()
    if(!state.task.trim())return ;


    dispatch({
      type: ACTION_TYPES.ADD_TASK,
      payload: {
        id:generateId(),
        text: state.task.trim(),
        completed: false,
        createdAt: formatTime(now)

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

    const handleNewDay=()=>{
      dispatch({type: ACTION_TYPES.START_NEW_DAY})

  }

  return (
  <main>
   <Navbar/>
   <div className="todoContainer">
     <Routes>
       <Route path='/' element={<CurrentDate 
       task={state.task} onAddTask={handleAddBtn} 
             onTaskChange={handleTaskChange} 
             isEditing={isEditing} 
             onCancelTask={handleCancelBtn} 
             onUpdateTask={handleUpdateBtn}  
             taskList={state.taskList}
             currentDate={state.currentDate}
             onDelete={handleRemoveIcon}
             onEdit={handleEditIcon}
             onCheckboxChange={handleCheckBoxChange}
             onStartNewDay={handleNewDay}/>}/>
       <Route path='/history' element={<History/>}/>
       <Route path='/settings' element={<SettingsPage/>}/>
       <Route path='*' element={<div>Item not found</div>}  />
     </Routes>
         </div>
  </main>
   
  )
}

export default App
