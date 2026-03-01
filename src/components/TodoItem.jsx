import { Checkbox } from "./Checkbox";
import { FaEdit, FaTrash } from "react-icons/fa";

export const TodoItem=({onChange,task, onEdit, onDelete})=>{
return (
    <>
        <Checkbox 
        checked={task.completed}
        onChange={()=>onChange(task.id)}
        id={task.id}>
        {task.text}
        </Checkbox>
        
    
        <div className="buttonContainer"><button className="editIcon" type="button" onClick={()=>onEdit(task.id)}><FaEdit /></button> <button className="trashIcon" type="button" onClick={()=>onDelete(task.id)}><FaTrash  /></button>
        </div>
            
            
        </>
)
}