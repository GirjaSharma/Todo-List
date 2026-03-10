import { InputBox } from "../../components/InputBox/InputBox";
import { TodoList } from "../../components/TodoList/TodoList";
import { VscAdd } from "react-icons/vsc";
import './CurrentDate.css';
import { getNow, formatHeaderdate } from "../../utils/utils";


const CurrentDate =({task,onAddTask,onTaskChange,isEditing,onCancelTask,onUpdateTask, taskList, onDelete, onEdit, onCheckboxChange, onStartNewDay, currentDate})=>{

    const todaysTask= taskList.filter(task => {
        console.log(new Date(task.date).toDateString()===new Date(currentDate).toDateString())
        
        return new Date(task.date).toDateString()===new Date(currentDate).toDateString()})

    return (
        <>
        <div className="headings"> 
            <div>
            <h3>Today's Tasks </h3>
            <p>{formatHeaderdate(getNow())}</p>
            </div>
           
            <button type="button" onClick={onStartNewDay}><VscAdd aria-hidden="true" /><span className="icon-text">New day</span></button>
            </div>
        
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