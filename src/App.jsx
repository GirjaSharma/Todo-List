import { useState, useEffect, useReducer } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import './styles/global.css';
import { getNow, formatTime, getDayKey} from './utils/dateUtils';
import {generateId} from './utils/idUtils';
import {reducer, initial_state as defaultInitialState} from './reducer/Reducer';
import {ACTION_TYPES, STORAGE_KEY} from './constants/actionTypes';
import History from './Pages/History/HistoryPage';
import SettingsPage from './Pages/Settings/SettingsPage';
import TodayPage from './Pages/Today/TodayPage';
import {getTasks, postTask, updateTask, deleteTask} from './services/taskApi';
import {Spinner} from './components/Spinner/Spinner';


const App=()=> {

    const [loading, setLoading] =useState(true);

const [error, setError] = useState("");


useEffect(()=>{
  const fetchData = async()=>{
    try{
      setLoading(true)
      setError("")
       const data = await getTasks();  
    dispatch({type: ACTION_TYPES.SET_TASKS, payload: data})
    }
   catch(error){
    setError("Failed to fetch tasks")
   }finally{
    setLoading(false)
   }
  }
  fetchData();
}, []);

  const initialState=(defaultInitialState)=>{
    try{
      const rawData = localStorage.getItem(STORAGE_KEY);
      if(!rawData) return defaultInitialState;


      const storedData = JSON.parse(rawData);

      return{
        ...defaultInitialState,
        // taskList: Array.isArray(storedData.taskList) ? storedData.taskList : [],
        currentDate: storedData.currentDate || defaultInitialState.currentDate,
      carryOverUnfinished: typeof storedData.carryOverUnfinished === 'boolean' ? storedData.carryOverUnfinished : defaultInitialState.carryOverUnfinished
      } 
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
localStorage.setItem(STORAGE_KEY, JSON.stringify({
  // taskList:state.taskList,
   currentDate:state.currentDate, carryOverUnfinished: state.carryOverUnfinished}));
  }, [
    // state.taskList,
    state.currentDate, state.carryOverUnfinished]);


const handleAddBtn=async(e)=>{
    e.preventDefault();
    const now=getNow()
    if(!state.task.trim())return ;

    const newTaskData = {
      id:generateId(),
        text: state.task.trim(),
        completed: false,
        createdAt: formatTime(now),
        date: getDayKey(now)
    }

    try{
      const taskData = await postTask(newTaskData)
        dispatch({
      type: ACTION_TYPES.ADD_TASK,
      payload: taskData
    })
    }catch(error){
      setError('Failed to add task')
    }
    }


const handleRemoveIcon =async(id)=>{
  try{
    await deleteTask(id)
 dispatch({type: ACTION_TYPES.DELETE_TASK, payload: id})
  }catch(error){
    console.error("delete failed", error)
  }
 
  
}

    const handleEditIcon=(id, text)=>{
      dispatch({type: ACTION_TYPES.START_EDIT, payload: {id,
        text}
      })
     
    }
  

    const handleUpdateBtn=async(e)=>{
      try{
          await updateTask(state.editId, {
            text: state.editingText.trim()
          })
          dispatch({type: ACTION_TYPES.UPDATE_TASK})
      }
      catch(error){
        console.error("update failed", error)
      }
      
    }

    const handleCancelBtn=()=>{
      dispatch({type: ACTION_TYPES.CANCEL_UPDATE})
    }

    const handleCheckBoxChange =async (task)=>{
      try{
        await updateTask(task.id, {completed: !task.completed})
        dispatch({type: ACTION_TYPES.TOGGLE_TASK, payload: task.id})
      }
      catch(error){
         console.error("toggle update failed", error)
      }
      
    }
    

    const handleTaskChange=(newValue)=>{
      dispatch({type: ACTION_TYPES.SET_TASK_INPUT, payload: newValue})
    }

    const handleEditingTextChange=(newValue)=>{
      dispatch({type: ACTION_TYPES.SET_EDITING_TEXT, payload: newValue})
    }

    const handleNewDay=()=>{
      if( getDayKey(new Date())=== state.currentDate){
        setMessage("Already viewing today's tasks")
        return
      }else{
        dispatch({type: ACTION_TYPES.START_NEW_DAY})
      }
   

  }

  const handleCarryOverToggle =()=>{
        dispatch({type: ACTION_TYPES.SET_CARRY_OVER})
    }

  

if(loading) {
  return (
<div className="spinnerOverlay">
    <Spinner/>
    </div>
  ) 
}
      if(error){
return <p>{error}</p>
}
 
    return (
    
  <main>
    
   <div className="todoContainer">
     <Routes>
      <Route path="/" element={<Navigate to="/today" replace/>}/>
      <Route path='/today' element={<TodayPage
      editingText={state.editingText}
      editId={state.editId}
              task={state.task} onAddTask={handleAddBtn} 
              message={message}
                    onTaskChange={handleTaskChange} 
                    isEditing={isEditing} 
                    onCancelTask={handleCancelBtn} 
                    onUpdateTask={handleUpdateBtn}  
                    taskList={state.taskList}
                    currentDate={state.currentDate}
                    carryOverUnfinished={state.carryOverUnfinished}
                    onDelete={handleRemoveIcon}
                    onEdit={handleEditIcon}
                    onCheckboxChange={handleCheckBoxChange}
                    onStartNewDay={handleNewDay}
                    onEditingTextChange={handleEditingTextChange}/>}/>
      <Route path='/history' element={<History 
                  taskList={state.taskList}
                  currentDate={state.currentDate} 
                  carryOverUnfinished={state.carryOverUnfinished}
                  />}/>
      <Route path='/settings' element={<SettingsPage
      handleCarryOverToggle={handleCarryOverToggle}
      carryOverUnfinished={state.carryOverUnfinished}

      
      />}/>
      <Route path='*' element={<div>Item not found</div>}  />
     </Routes>
         </div>
  </main>
    )


  
}

export default App
