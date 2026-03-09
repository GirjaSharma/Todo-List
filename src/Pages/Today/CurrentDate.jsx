import { InputBox } from "../../components/InputBox/InputBox";
import { TodoList } from "../../components/TodoList/TodoList";
import { VscAdd } from "react-icons/vsc";
import './CurrentDate.css';
import { currentDate } from "../../utils/utils";

const CurrentDate =({task,onAddTask,onTaskChange,isEditing,onCancelTask,onUpdateTask, taskList, onDelete, onEdit, onCheckboxChange})=>{
   

    // const handleNextDay=()=>{
        
    // }

    return (
        <>
        <div className="headings"> 
            <h3>Today's Tasks </h3>
            <p>{currentDate().toDateString()}</p>
            <button type="button"><VscAdd aria-hidden="true" /><span className="icon-text">New day</span></button>
            </div>
        
        <InputBox task={task} onAddTask={onAddTask} 
        onTaskChange={onTaskChange} 
        isEditing={isEditing} 
        onCancelTask={onCancelTask} 
        onUpdateTask={onUpdateTask} 
/>


       {taskList?.length > 0 && <TodoList taskList={taskList} 
       onDelete={onDelete}
        onEdit={onEdit}
        onCheckboxChange={onCheckboxChange}
        isEditing={isEditing}
       />}
       </>
    )
}


export default CurrentDate;