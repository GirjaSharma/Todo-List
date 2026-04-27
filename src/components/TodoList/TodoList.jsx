
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css' 


export const TodoList=({taskList, onEdit, onDelete, isEditing, onCheckboxChange,onTaskChange, editingText, editId, onEditingTextChange, onCancelTask, onUpdateTask
})=>{
    return(
        <div className='list-container'>
        {taskList.length>0 && taskList.map(task => (
            <div className="newTask" key={task.id}>
            <TodoItem task={task} onChange={onCheckboxChange} onEdit={onEdit} onDelete={onDelete} onTaskChange={onTaskChange} isEditing={isEditing} editingText={editingText} editId={editId} onEditingTextChange={onEditingTextChange} onCancelTask={onCancelTask} 
            onUpdateTask={onUpdateTask} />
            
        </div>))}

        </div>
        
    )
}


