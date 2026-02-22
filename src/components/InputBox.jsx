export const InputBox =({task, onAddTask, setTask, isEditing})=>{

    return (
       
        <div className='inputRow'>
        <input style={{width: "300px", height: "25px"}} type="text" value={task} onChange={e => setTask(e.target.value)}></input>
        {/* {isEditing === true && (
            <button class="updateBtn">Update</button>
        )}  */}
        <button className="addBtn" onClick={onAddTask}>Add</button>
        </div>
          
      
    )
}


