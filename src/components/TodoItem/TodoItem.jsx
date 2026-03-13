import { useState } from "react";
import { Checkbox } from "../Checkbox/Checkbox";
import { FaEdit, FaTrash } from "react-icons/fa";
import './TodoItem.css' ;
import { useCallback } from "react";
import { StatusChip } from "../StatusChip/StatusChip";

export const TodoItem=({onChange,task, onEdit, onDelete})=>{

    // const addTodo = useCallback(() => {

    // },[task])
    console.log("task.createdAt", task.createdAt)
    console.log("todoItem------")
return (
    <div className="taskContainer">
        <div className="taskMain">
        <Checkbox 
        checked={task.completed}
        onChange={()=>onChange(task.id)}
        id={task.id}>
        {task.text}
        
        </Checkbox>
        </div>
       
        
    
        <div className="buttonContainer">
        {/* {recurringTask &&  */}
        <StatusChip label="daily" status="default"/>
        {/* } */}
        
            <button className="editIcon" type="button" onClick={()=>onEdit(task.id)}><FaEdit /></button> 
            <button className="trashIcon" type="button" onClick={()=>onDelete(task.id)}><FaTrash  /></button>
        
        </div>
        {/* <p>created at: {task.createdAt}</p>  */}
            
        </div>
)
}