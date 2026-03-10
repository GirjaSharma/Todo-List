import {ACTION_TYPES} from '../constants/actionTypes'
import { formatTime, getNow } from '../utils/utils'

export const initial_state={
    task: "",
    taskList:[],
    editId:null,
    currentDate: formatTime(getNow),
    carryOverUnfinished: true
}

export function reducer(state, action){
switch(action.type){
    case ACTION_TYPES.ADD_TASK:
         {
        const newTask={
            text: action.payload.text,
            id: action.payload.id,
            completed: action.payload.completed,
            createdAt: action.payload.createdAt
        }
        return {
            ...state,
            taskList: [...state.taskList, newTask],
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
                    text: state.task
                }
            }
            return t
        })
        return {
            ...state,
            taskList:updatedList,
            editId: null,
            task:''
        }
        }

    case ACTION_TYPES.CANCEL_UPDATE: {
         return {
            ...state,
            editId: null,
            task:''
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
        const currentTask = state.taskList.find(t => t.id === action.payload)
        return {
            ...state,
            editId: currentTask.id,
            task: currentTask.text
            
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

     const newDate= new Date();

     const carriedTask = state.carryOverUnfinished ? inCompleteTasks.map(task => (
        {
            ...task,
            date: formatTime(newDate)
           } 
     )) :[];

     const historyTasks = state.taskList.filter(task => task.date === state.currentDate)


     return {
        ...state,
        taskList: [...completedTasks, ...carriedTask],
        currentDate: formatTime(newDate)
     }
}


/*1. on start new day, if the cariiedOver flag is true, move the incomplete task to new Day, set their daye to current Date, display header date to current date
2. move completed task to history, if carriedOver is false , even move them to history and new day should be blank with current date and input box 

*/

}}