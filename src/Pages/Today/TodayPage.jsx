import {useState, useEffect} from 'react';
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

const TodayPage =(
    {task,onAddTask,onTaskChange,isEditing,onCancelTask,onUpdateTask, taskList, onDelete, onEdit, onCheckboxChange, onStartNewDay, currentDate, message,carryOverUnfinished, editingText, editId, onEditingTextChange}
)=>{
    const todaysTask= taskList.filter(task => (
        task.date === currentDate
    )
    );
    const historyTasks= taskList.filter(task => task.date !== currentDate);

    const historyData= getGroupedHistory(historyTasks)
 
    console.log(historyData, "historyData")

    const getLatestDateHistory = historyData[0];
    const completedTasks = getLatestDateHistory.tasks.filter(task => task.completed).length;
    const totalTasks = getLatestDateHistory.tasks.length;

    const todaysPendingTasks = taskList.filter(task => !task.completed).length;

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
    </footer> </>
)
}


export default TodayPage