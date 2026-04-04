import { useEffect, useRef } from "react";
import { Checkbox } from "../Checkbox/Checkbox";
import { FaEdit, FaTrash } from "react-icons/fa";
import './TodoItem.css' ;

export const TodoItem=({onChange,task, onEdit, onDelete, isEditing, onTaskChange,  onCancelTask, editingText
           , onUpdateTask, editId, onEditingTextChange })=>{


            const isEditingThisTask = editId === task.id;
                const inputRef = useRef(null)
                useEffect(() =>{
                    if(isEditingThisTask && inputRef.current){
                        inputRef.current.focus();
                        inputRef.current.select();
                    }
                }, [isEditingThisTask])
            
            
                const handleKeyDown=(e)=>{
                    if(e.key === 'Enter'){
                    e.preventDefault();
                    onUpdateTask();
                    }
                    if(e.key === 'Escape'){
                        e.preventDefault();
                        onCancelTask()
                    }
                }
            
                const handleFocus=()=>{
                    requestAnimationFrame(() => inputRef.current?.focus());
                  }
                
                  const handleCancelBtn=()=>{
                    onCancelTask();
                    handleFocus();
                  }
            
                  const handlePrimaryClick=()=>{
                    onUpdateTask()
                    handleFocus()
            
                  }

   
return (
    <div className="taskContainer">
         {isEditingThisTask ? (<div className="edit-text-container">
                <input aria-label="Update a Task" 
      onKeyDown={handleKeyDown}
        type="text" 
       ref={inputRef}
        value={editingText} 
        onChange={e=> onEditingTextChange(e.target.value)}
        />
        <button type="button" className="updateBtn primary" onClick={handlePrimaryClick}>Update</button>
           <button type="button" className="cancelBtn secondary" onClick={handleCancelBtn}>Cancel</button>
       
         
</div>
            ) : <>

        <div className="taskMain">

  <Checkbox 
        checked={task.completed}
        onChange={()=>onChange(task)}
        id={task.id}>
           {task.text}
        
        </Checkbox> 
        </div>
       
        <div className="buttonContainer">
        
            <button className="editIcon" type="button" onClick={()=>onEdit(task.id, task.text)}><FaEdit /></button> 
            <button className="trashIcon" type="button" onClick={()=>onDelete(task.id)}><FaTrash  /></button>
        
        </div>
        </>
        }
            
        </div>
)
}