
import {TodoItem} from '../TodoItem/TodoItem';
import './TodoList.css' 


export const TodoList=({taskList, onEdit, onDelete, isEditing, onCheckboxChange,
})=>{
    console.log("todolist----")
    return(
        <div className='list-container'>
        {isEditing=== true ? '' : taskList.length>0 && taskList.map(task => (
            <div className="newTask" key={task.id}>
            <TodoItem task={task} onChange={onCheckboxChange} onEdit={onEdit} onDelete={onDelete} />
            
        </div>))}

        </div>
        
    )
}


