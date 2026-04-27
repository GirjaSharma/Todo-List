import { useState, useRef } from "react";
import './InputBox.css';
import { VscAdd } from "react-icons/vsc";
import {getDayKey} from '../../utils/dateUtils'

export const InputBox =({task, onAddTask, onTaskChange, currentDate})=>{

    const inputRef = useRef(null);

    const [inputValue, setInputValue]= useState("");

    const handleSubmit=()=>{
        const trimmed= inputValue.trim();

        if(!trimmed) return;

        onAddTask(trimmed);
        setInputValue("")
    }

    const handleKeyDown=(e)=>{
        if(e.key === 'Enter'){
            e.preventDefault();
            
                 handleSubmit();
        }
    }

    const handleFocus=()=>{
        requestAnimationFrame(() => inputRef.current?.focus());
      }
      const handlePrimaryClick=()=>{
        handleSubmit();
        handleFocus()

      }

      const isCurrentDate = getDayKey(new Date()) !== currentDate;
    return (

        <div className='inputRow'>
        <input aria-label="Add a Task" 
        ref={inputRef} 
        type="text" 
        placeholder="Add a task"
        value={inputValue} 
        onChange={e=> setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        />
        
        <button type="button" className="addBtnIcon" disabled={isCurrentDate} onClick={handlePrimaryClick}><VscAdd aria-hidden="true" /></button>
        
        </div>
          
      
    )
}


