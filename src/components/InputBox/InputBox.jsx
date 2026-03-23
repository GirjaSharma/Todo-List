import { useEffect, useRef } from "react";
import './InputBox.css';
import { VscAdd } from "react-icons/vsc";

export const InputBox =({task, onAddTask, onTaskChange, isEditing, onCancelTask, onUpdateTask})=>{

    const inputRef = useRef(null)
    // useEffect(() =>{
    //     if(isEditing){
    //         inputRef.current.focus();
    //         inputRef.current.select();
    //     }
    // }, [isEditing])


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
        
        <button type="button" className="addBtnIcon" onClick={handlePrimaryClick}><VscAdd aria-hidden="true" /></button>

        {/* <div className={isEditing ? "editButtonStyle" : "buttonsStyle"}>

        <button type="button" className="addBtn primary" onClick={handlePrimaryClick}>{isEditing ? 'Update' : 'Add'}</button>

        {isEditing && (
            <button type="button" className="cancelBtn secondary" onClick={handleCancelBtn}>Cancel</button>
        )} 
        </div> */}
        
        </div>
          
      
    )
}


