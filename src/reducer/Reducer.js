import {ACTION_TYPES} from '../constants/actionTypes'

export const INITIAL_STATE={
    task: "",
    taskList:[],
    editId:null
}

export default function reducer(state, action){
switch(action.type){
    case ACTION_TYPES.ADD_TASK:
         {
            return [...state,{
                id: state.id,
                text: state.task,
                completed: false
            }]

        }
    case ACTION_TYPES.DELETE_TASK:{
        return state.taskList.filter(task => task.id !== state.task.id)
        
    }
        
    case ACTION_TYPES.UPDATE_TASK: {
        const updatedList = state.taskList.map((t) => {
            if(t.id=== state.editId){
              return {
                  ...t,
              text: state.task,
            }
          } 
            return t
          });

          return {
             ...state,
             taskList: updatedList,
            task: '',
            editId: null

          }

        }

    case ACTION_TYPES.CANCEL_UPDATE: {
            return {
                ...state,
                editId: null,
                task: ''
            }
        }
    case ACTION_TYPES.TOGGLE_TASK:{
        // const checkedList =state.taskList.map(task => {
        //     if(task.id === state.task.id){
        //       return {
        //         ...state,
        //         completed: !task.completed
        //       }
        //     }return task
           
        //    })
        //    setTaskList(checkedList)
    }
    case ACTION_TYPES.START_EDIT:
        return {
            
        }
}
}