import { useEffect, useRef } from "react";
import './InputBox.css';
import { VscAdd } from "react-icons/vsc";
import {getDayKey} from '../../utils/dateUtils'

export const InputBox =({task, onAddTask, onTaskChange, currentDate})=>{

    const inputRef = useRef(null)

    const handleKeyDown=(e)=>{
        if(e.key === 'Enter'){
            e.preventDefault();
            
                 onAddTask(e)
        }
    }

    const handleFocus=()=>{
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    

      const handlePrimaryClick=(e)=>{
        onAddTask(e);
        handleFocus()

      }

      const isCurrentDate = getDayKey(new Date()) !== currentDate

    return (

        <div className='inputRow'>
        <input aria-label="Add a Task" 
        ref={inputRef} 
        type="text" 
        placeholder="Add a task"
        value={task} 
        onChange={e=> onTaskChange(e.target.value)}
        onKeyDown={handleKeyDown}
        />
        
        <button type="button" className="addBtnIcon" disabled={isCurrentDate} onClick={handlePrimaryClick}><VscAdd aria-hidden="true" /></button>
        
        </div>
          
      
    )
}


