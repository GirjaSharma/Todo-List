import { FaEdit, FaTrash } from "react-icons/fa";



export const TodoList=({taskList, onEdit, onDelete, isEditing, onCheckboxChange,
})=>{
    return(
        <>
        {isEditing=== true ? '' : taskList.length>0 && taskList.map(task => (
            <div className="newTask" key={task.id}>
            <label className="taskSection">
            <input type="checkbox" checked={task.completed} onChange={()=>onCheckboxChange(task.id)}/>{task.text}
            <span className="editIcon"><FaEdit onClick={()=>onEdit(task.id)}/></span> <span className="trashIcon"><FaTrash onClick={()=>onDelete(task.id)} /></span></label>
            
        </div>))}

        </>
        
    )
}


