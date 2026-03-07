import { InputBox } from "../../components/InputBox/InputBox";
import { TodoList } from "../../components/TodoList/TodoList";

const CurrentDate =({task,onAddTask,onTaskChange,isEditing,onCancelTask,onUpdateTask, taskList, onDelete, onEdit, onCheckboxChange})=>{

    return (
        <>
         <h3>Tasks</h3>
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