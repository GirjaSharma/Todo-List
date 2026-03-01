import { useEffect, useRef } from "react"
export const InputBox =({task, onAddTask, onTaskChange, isEditing, onCancelTask, onUpdateTask})=>{

    const inputRef = useRef(null)
    useEffect(() =>{
        if(isEditing){
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing])


    const handleKeyDown=(e)=>{
        if(e.key === 'Enter'){
            e.preventDefault();
            if(isEditing) onUpdateTask();
            else onAddTask(e)
        }
        if(e.key === 'Escape' && isEditing){
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

      const handlePrimaryClick=(e)=>{
        if(isEditing)onUpdateTask()
         else onAddTask(e);
        handleFocus()

      }


    return (

        <div className='inputRow'>
        <input aria-label={isEditing? "Edit Task" : "Add a Task" }
        ref={inputRef} 
        style={{width: "300px", height: "25px"}} 
        type="text" 
        value={task} 
        onChange={e=> onTaskChange(e.target.value)}
        onKeyDown={handleKeyDown}
        />

        <div className={isEditing ? "editButtonStyle" : "buttonsStyle"}>

        <button type="button" className="addBtn primary" onClick={handlePrimaryClick}>{isEditing ? 'Update' : 'Add'}</button>

        {isEditing && (
            <button type="button" className="cancelBtn secondary" onClick={handleCancelBtn}>Cancel</button>
        )} 
        </div>
        
        </div>
          
      
    )
}


