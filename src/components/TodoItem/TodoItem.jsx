import { useState,useEffect, useRef } from "react";
import { Checkbox } from "../Checkbox/Checkbox";
import { FaEdit, FaTrash } from "react-icons/fa";
import './TodoItem.css' ;
import { useCallback } from "react";
import { StatusChip } from "../StatusChip/StatusChip";

export const TodoItem=({onChange,task, onEdit, onDelete, isEditing, onTaskChange,  onCancelTask, editingText
           , onUpdateTask, editId, onEditingTextChange })=>{


            const isEditingThisTask = editId === task.id;
console.log("task ---- todoItem", task);
console.log("editingText", editingText)

                const inputRef = useRef(null)
                useEffect(() =>{
                    if(isEditingThisTask && inputRef.current){
                        inputRef.current.focus();
                        inputRef.current.select();
                    }
                }, [isEditingThisTask])
            
            
                // const handleKeyDown=(e)=>{
                //     if(e.key === 'Enter'){
                //         e.preventDefault();
                //       onUpdateTask();
                       
                //     }
                //     if(e.key === 'Escape'){
                //         e.preventDefault();
                //         onCancelTask()
                //     }
                // }
            
                // const handleFocus=()=>{
                //     requestAnimationFrame(() => inputRef.current?.focus());
                //   }
                
                //   const handleCancelBtn=()=>{
                //     onCancelTask();
                //     handleFocus();
                //   }
            
                //   const handlePrimaryClick=()=>{
                    
                //     handleFocus()
            
                //   }

    // const addTodo = useCallback(() => {

    // },[task])
    console.log("task.createdAt", task.createdAt)
    console.log("todoItem------")
return (
    <div className="taskContainer">
         {isEditingThisTask ? (<div className="edit-text-container">
                <input aria-label="Update a Task" 
      
        type="text" 
       ref={inputRef}
        value={editingText} 
        onChange={e=> onEditingTextChange(e.target.value)}
        // onKeyDown={handleKeyDown}
        />
        <button type="button" className="updateBtn primary" onClick={onUpdateTask}>Update</button>
           <button type="button" className="cancelBtn secondary" onClick={onCancelTask}>Cancel</button>
       
         
</div>
            ) : <>

        <div className="taskMain">

  <Checkbox 
        checked={task.completed}
        onChange={()=>onChange(task.id)}
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
        {/* <p>created at: {task.createdAt}</p>  */}
            
        </div>
)
}