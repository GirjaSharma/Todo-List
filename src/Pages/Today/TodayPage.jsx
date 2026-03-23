import { InputBox } from "../../components/InputBox/InputBox";
import { TodoList } from "../../components/TodoList/TodoList";
import { VscAdd } from "react-icons/vsc";
import { parseDayKey, getDayAndDate} from '../../utils/dateUtils'
import { Message } from "../../components/Message/Message";
import { StatusChip } from "../../components/StatusChip/StatusChip";
import './TodayPage.css'
import { Card } from "../../components/Card/Card";
import { Navigation } from "../../components/Navigation/Navigation";
import {getGroupedHistory} from '../../utils/historyUtils';

const TodayPage =({task,onAddTask,onTaskChange,isEditing,onCancelTask,onUpdateTask, taskList, onDelete, onEdit, onCheckboxChange, onStartNewDay, currentDate, message,carryOverUnfinished, editingText, editId, onEditingTextChange})=>{
    const todaysTask= taskList.filter(task => (
        task.date === currentDate
    )
    );
    const historyTasks= taskList.filter(task => task.date !== currentDate);

//    let historyTasks =[
//         {completed: true,createdAt: "3/16/2026, 11:08:28 PM",date: "2026-03-16", id: "19074b17-ef1a-4cb5-9f6f-cefc19f59471",
// text: "implement history page logic"},
// {text: "fix the update task logic on today page", id: "32f20f1a-6944-4479-9793-c8be86aedec6",date
// : 
// "2026-03-15",
// completed
// : 
// false,
// createdAt
// : 
// "3/15/2026, 11:09:04 PM"},
// {
//     text: "fix the update task logic on today page",
//     id: "32f20f1a-6944-4479-9793-c8be86aedec6",
//     completed: true,
//     createdAt: "3/16/2023, 11:09:04 PM",
//     date: "2026-03-13"
//   },
//   {
//     text: "Add filters dropdown based on completed, incomoplete or all tasks",
//     id: "1475dac5-5e6c-487d-8990-6cfe7eb2f232",
//     completed: false,
//     createdAt: "3/12/2026, 11:09:24 PM",
//     date: "2026-03-16"
//   },
//   {
//     text: "fix the css issue for input box width and button",
//     id: "3f839ac2-9c8f-45d2-a00f-26223dddef14",
//     completed: false,
//     createdAt: "3/12/2026, 11:10:03 PM",
//     date: "2026-03-12"
//   },
//   {
//     text: "the height of todoItem should be auto --css fix",
//     id: "166fa9ad-2830-4c14-bb57-31413bdcea65",
//     completed: true,
//     createdAt: "3/11/2026, 11:10:36 PM",
//     date: "2026-03-11"
//   },
//   {
//     text: "keystroke and tab on all the important items",
//     id: "d9e7cfe4-4ced-4c43-a2f4-9b2d4c7de5d7",
//     completed: false,
//     createdAt: "3/11/2026, 11:10:58 PM",
//     date: "2026-03-11"
//   }
//     ] ;

    const historyData= getGroupedHistory(historyTasks)
 
    console.log(historyData, "historyData")

    const getLatestDateHistory = historyData[0];
    console.log(getLatestDateHistory, "getLatestDateHistory")
    const completedTasks = getLatestDateHistory.tasks.filter(task => task.completed).length;
     const totalTasks = getLatestDateHistory.tasks.length;
    

     console.log(taskList, "======taskList=========")

     const todaysPendingTasks = taskList.filter(task => !task.completed).length;

     console.log(todaysPendingTasks)

return (
    < >
    <main className="main-container">
    <header className="header">
        <div><h3>Today's Tasks </h3>
        <p>{parseDayKey(currentDate).toDateString()}</p></div>
        <button type="button" onClick={onStartNewDay}><VscAdd aria-hidden="true" /><span className="icon-text">New day</span></button>
        </header>
        <InputBox 
            task={task} onAddTask={onAddTask} 
            onTaskChange={onTaskChange} 
            isEditing={isEditing} 
            
        />
        <section className="status-chips">
            {/* todo -------  label will be dynamic -- get incomplete task number and carry over status */}
            <StatusChip label={`${todaysPendingTasks} pending`} status="pending"/>    
            <StatusChip label={carryOverUnfinished ? "Carry-over: ON" : "Carry-over: OFF"} status="carryover" />
        </section>

        {message && <Message type="error" text={message}/>}
        
        {taskList?.length > 0 && <TodoList taskList={todaysTask} 
        editingText={editingText}
       onDelete={onDelete}
        onEdit={onEdit}
        onCheckboxChange={onCheckboxChange}
        isEditing={isEditing}
        onTaskChange={onTaskChange}
         onCancelTask={onCancelTask} 
            onUpdateTask={onUpdateTask} 
            editId={editId}
            onEditingTextChange={onEditingTextChange}
       />}

       <section>
       <p>History</p>
       <Card className="history">
         <header className="card-header">
                                <h4>{getDayAndDate(getLatestDateHistory.date)}</h4>
                                {carryOverUnfinished ? <p>Completed tasks</p> : <p>{completedTasks}/{totalTasks} done</p>}
                                
                            </header>
                            <hr className="card-hr"/>
                         <section className="list-card">
                                {
                                getLatestDateHistory.tasks.length && getLatestDateHistory.tasks.map(task=>(
                                        <ul key={task.id}>
                                            <li className="task"><span>{task.text}</span>
                                                {/* <span>{!task.completed ? 'Pending' : getOnlyTime(task.createdAt)}</span> */}
                                            </li>
                                        </ul>
                                       
                                ))
                            }
                            </section>
       </Card>
       </section>

       <div className="settings">
       <p>Settings</p>
       <Card>

       </Card>
       </div>

    </main>
        
       <footer className="footer-navigation">
        <Navigation/>
       </footer>

     

      
    
    </>
)
}


export default TodayPage