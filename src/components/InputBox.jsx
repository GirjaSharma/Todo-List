export const InputBox =({task, onAddTask, setTask, isEditing, onCancelTask, onUpdateTask})=>{

   

    return (
       
        <div className='inputRow'>
        <input style={{width: "300px", height: "25px"}} type="text" value={task} onChange={e => setTask(e.target.value)}></input>

        <div className={isEditing ? "editButtonStyle" : "buttonsStyle"}>

        <button className="addBtn primary" onClick={isEditing ? onUpdateTask: onAddTask}>{!isEditing ? 'Add' : 'Update'}</button>

        {isEditing === true && (
            <button className="cancelBtn secondary" onClick={onCancelTask}>Cancel</button>
        )} 
        </div>
        
        </div>
          
      
    )
}


