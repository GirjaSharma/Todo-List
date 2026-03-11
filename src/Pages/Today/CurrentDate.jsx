import { InputBox } from "../../components/InputBox/InputBox";
import { TodoList } from "../../components/TodoList/TodoList";
import { VscAdd } from "react-icons/vsc";
import './CurrentDate.css';
import {getDayKey, parseDayKey} from '../../utils/utils'
import { Message } from "../../components/Message/Message";


const CurrentDate =({task,onAddTask,onTaskChange,isEditing,onCancelTask,onUpdateTask, taskList, onDelete, onEdit, onCheckboxChange, onStartNewDay, currentDate, message})=>{

    const todaysTask= taskList.filter(task => (
        task.date === currentDate
    )
    )

    return (
        <>
        <div className="headings"> 
            <div>
            <h3>Today's Tasks </h3>
            <p>{parseDayKey(currentDate).toDateString()}</p>
            </div>
           
            <button type="button" onClick={onStartNewDay}><VscAdd aria-hidden="true" /><span className="icon-text">New day</span></button>
            
            </div>
            {message && <Message type="error" text={message}/>}
        
        <InputBox task={task} onAddTask={onAddTask} 
        onTaskChange={onTaskChange} 
        isEditing={isEditing} 
        onCancelTask={onCancelTask} 
        onUpdateTask={onUpdateTask} 
/>


       {taskList?.length > 0 && <TodoList taskList={todaysTask} 
       onDelete={onDelete}
        onEdit={onEdit}
        onCheckboxChange={onCheckboxChange}
        isEditing={isEditing}
       />}
       </>
    )
}


export default CurrentDate;