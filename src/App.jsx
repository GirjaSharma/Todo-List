import { useState, useEffect, useReducer, useSyncExternalStore } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import './styles/global.css';
import {generateId, getNow, formatTime, getDayKey} from './utils/utils';
import {reducer, initial_state as defaultInitialState} from './reducer/Reducer';
import {ACTION_TYPES, STORAGE_KEY} from './constants/actionTypes';
import {Navbar} from './components/Navbar/Navbar';
import CurrentDate from './Pages/Today/CurrentDate';
import History from './Pages/History/HistoryPage';
import SettingsPage from './Pages/Settings/SettingsPage';
import TodayPage from './Pages/Today/TodayPage'


const App=()=> {

  const initialState=(defaultInitialState)=>{
    try{
      const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
      console.log("storedDate", storedData)
      console.log("localStorage.getItem(STORAGE_KEY)", localStorage.getItem(STORAGE_KEY))
      return storedData ?
       {...defaultInitialState,
        taskList: storedData.taskList || [],
         currentDate: storedData.currentDate || defaultInitialState.currentDate} 
         : defaultInitialState;
    }catch(error){
      console.error("Error reading from localStorage");
      return defaultInitialState;
    }
  }

  const [message, setMessage]= useState("");
  useEffect(() => {
    if(!message) return;

    const timer =setTimeout(()=>{
      setMessage("")
    },5000)

    return ()=> clearTimeout(timer)
  }, [message])

  const [state, dispatch]= useReducer(reducer, defaultInitialState, initialState);
  
  
  const isEditing = state.editId !== null;

  

  useEffect(() => {
localStorage.setItem(STORAGE_KEY, JSON.stringify({taskList:state.taskList, currentDate:state.currentDate}));
console.log("saving to localStorage", {
  taskList:state.taskList,
  currentDate: state.currentDate
})
  }, [state.taskList,state.currentDate ]);

  console.log("full state", state);
  console.log("state.taskList", state.taskList);
  console.log("isArray", Array.isArray(state.taskList));



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
        createdAt: formatTime(now),
        date: getDayKey(now)

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
      let today = new Date()
      console.log(getDayKey(today), "getDayKey(today)");
      console.log(state.currentDate, "state.currentDate")
      if( getDayKey(today)=== state.currentDate){
        setMessage("Already viewing today's tasks")
        return
      }else{
        dispatch({type: ACTION_TYPES.START_NEW_DAY})
      }
   

  }

  return (
  <main>
   {/* <Navbar/> */}
   <div className="todoContainer">
     <Routes>
       <Route path='/' element={<CurrentDate 
            task={state.task} onAddTask={handleAddBtn} 
            message={message}
            onTaskChange={handleTaskChange} 
            isEditing={isEditing} 
            onCancelTask={handleCancelBtn} 
            onUpdateTask={handleUpdateBtn}  
            taskList={state.taskList}
            currentDate={state.currentDate}
            onDelete={handleRemoveIcon}
            onEdit={handleEditIcon}
            onCheckboxChange={handleCheckBoxChange}
            onStartNewDay={handleNewDay}/>}
            />
      <Route path='/today' element={<TodayPage
              task={state.task} onAddTask={handleAddBtn} 
              message={message}
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
