export const InputBox =({task, onAddTask, setTask, isEditing})=>{

   

    return (
       
        <div className='inputRow'>
        <input style={{width: "300px", height: "25px"}} type="text" value={task} onChange={e => setTask(e.target.value)}></input>

        <div className={isEditing ? "editButtonStyle" : "buttonsStyle"}>
        <button className="addBtn primary" onClick={onAddTask}>{!isEditing ? 'Add' : 'Update'}</button>
        {isEditing === true && (
            <button className="cancelBtn secondary">Cancel</button>
        )} 
        </div>
        
        </div>
          
      
    )
}


