
import {TodoItem} from './TodoItem';



export const TodoList=({taskList, onEdit, onDelete, isEditing, onCheckboxChange,
})=>{
    return(
        <>
        {isEditing=== true ? '' : taskList.length>0 && taskList.map(task => (
            <div className="newTask" key={task.id}>
            <TodoItem task={task} onChange={onCheckboxChange} onEdit={onEdit} onDelete={onDelete} />
            
        </div>))}

        </>
        
    )
}


