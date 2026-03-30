import {ACTION_TYPES} from '../constants/actionTypes'
import { formatTime, getNow, getDayKey } from '../utils/dateUtils'

export const initial_state={
    task: "",
    taskList:[],
    editId:null,
    currentDate: getDayKey(getNow()),
    carryOverUnfinished: false,
    editingText: null
}

export function reducer(state, action){
switch(action.type){
    case ACTION_TYPES.SET_TASKS:
        {
            return{
                ...state,
                taskList: action.payload
            }
        }

    case ACTION_TYPES.ADD_TASK:
         {
        // const newTask={
        //     text: action.payload.text,
        //     id: action.payload.id,
        //     completed: action.payload.completed,
        //     createdAt: action.payload.createdAt,
        //     date: action.payload.date
        // }
        return {
            ...state,
            taskList: [...state.taskList, action.payload],
            task:'',
            editId:null
        }
        }
    case ACTION_TYPES.DELETE_TASK:{
     const filteredList = state.taskList.filter(t => t.id !== action.payload)
        return {
            ...state,
            taskList: filteredList
        }
    }
        
    case ACTION_TYPES.UPDATE_TASK: {
        const updatedList = state.taskList.map(t=>{
            if(t.id === state.editId){
                return {
                    ...t,
                    text: state.editingText
                }
            }
            return t
        })
        return {
            ...state,
            taskList:updatedList,
            editId: null,
            editingText:null,
            
        }
        }

    case ACTION_TYPES.CANCEL_UPDATE: {
         return {
            ...state,
            editId: null,
            task:'',
            editingText: null
         }
        }
    case ACTION_TYPES.TOGGLE_TASK:{


        const checkedList =state.taskList.map(t => {
            if(t.id === action.payload){
              return {
                ...t,
                completed: !t.completed
              }
            }return t
           
           })
           return {
            ...state,
            taskList: checkedList
           }
        
    }
    case ACTION_TYPES.START_EDIT:{
        const currentTask = state.taskList.find(t => t.id === action.payload.id);
        if(!currentTask) return;
        return {
            ...state,
            editId: currentTask.id,
            editingText: currentTask.text
            
        }
}

case ACTION_TYPES.SET_EDITING_TEXT:{
return{
    ...state,
    editingText: action.payload
}
}

case ACTION_TYPES.SET_TASK_INPUT:{
    
        state.task= action.payload;
        return{
            ...state,
            task: state.task
        }
    
}

case ACTION_TYPES.START_NEW_DAY:{
     const completedTasks =state.taskList.filter(task => task.completed);
     const inCompleteTasks = state.taskList.filter(task => !task.completed)

     const carriedTask = state.carryOverUnfinished === true ? inCompleteTasks.map(task => (
        {
            ...task,
            date: getDayKey(getNow())
           } 
     )) :[];



     return {
        ...state,
        taskList: [...completedTasks, ...carriedTask],
        currentDate: getDayKey(getNow())
     }
}

case ACTION_TYPES.SET_CARRY_OVER:{
    return{
        ...state,
        carryOverUnfinished: !state.carryOverUnfinished
    }
}

}}