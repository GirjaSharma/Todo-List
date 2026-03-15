import { InputBox } from "../../components/InputBox/InputBox";
import { TodoList } from "../../components/TodoList/TodoList";
import { VscAdd } from "react-icons/vsc";
import {getDayKey, parseDayKey} from '../../utils/utils'
import { Message } from "../../components/Message/Message";
import { StatusChip } from "../../components/StatusChip/StatusChip";
import './TodayPage.css'
import { Card } from "../../components/Card/Card";
import { Navigation } from "../../components/Navigation/Navigation";

const TodayPage =({task,onAddTask,onTaskChange,isEditing,onCancelTask,onUpdateTask, taskList, onDelete, onEdit, onCheckboxChange, onStartNewDay, currentDate, message})=>{
    const todaysTask= taskList.filter(task => (
        task.date === currentDate
    )
    )
return (
    < >
    <div className="main-container">
    <div className="header">
        <div><h3>Today's Tasks </h3>
        <p>{parseDayKey(currentDate).toDateString()}</p></div>
        <button type="button" onClick={onStartNewDay}><VscAdd aria-hidden="true" /><span className="icon-text">New day</span></button>
        </div>
        <InputBox 
            task={task} onAddTask={onAddTask} 
            onTaskChange={onTaskChange} 
            isEditing={isEditing} 
            onCancelTask={onCancelTask} 
            onUpdateTask={onUpdateTask} 
        />
        <div className="status-chips">
            {/* todo -------  label will be dynamic -- get incomplete task number and carry over status */}
            <StatusChip label="pending" status="pending"/>    
            <StatusChip label="Carry-over" status="carryover"/>
        </div>

        {message && <Message type="error" text={message}/>}
        
        {taskList?.length > 0 && <TodoList taskList={todaysTask} 
       onDelete={onDelete}
        onEdit={onEdit}
        onCheckboxChange={onCheckboxChange}
        isEditing={isEditing}
       />}

       <div>
       <p>History</p>
       <Card className="history">
        
       </Card>
       </div>

       <div className="settings">
       <p>Settings</p>
       <Card>

       </Card>
       </div>

    </div>
        
       <div className="footer-navigation">
        <Navigation/>
       </div>

     

      
    
    </>
)
}


export default TodayPage