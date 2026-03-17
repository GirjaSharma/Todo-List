import { Navigation } from "../../components/Navigation/Navigation";
import { Card } from "../../components/Card/Card";
import './HistoryPage.css'
import {parseDayKey} from '../../utils/utils'


const History =({taskList, currentDate})=>{
    // const historyTasks =taskList.filter(task=> task.date !== currentDate);
    let historyTasks =[
        {completed: true,
createdAt
: 
"3/16/2026, 11:08:28 PM",
date
: 
"2026-03-16",
id
: 
"19074b17-ef1a-4cb5-9f6f-cefc19f59471",
text
: 
"implement history page logic"},
{text: "fix the update task logic on today page", id: "32f20f1a-6944-4479-9793-c8be86aedec6",date
: 
"2026-03-16",
completed
: 
true,
createdAt
: 
"3/16/2026, 11:09:04 PM"}
    ]
    console.log("historyTasks", historyTasks)
    const getTasksBasedOnDate = Object.groupBy(historyTasks, task => task.date);
    console.log("getTasksBasedOnDate", getTasksBasedOnDate);

    const getTasks = Object.entries(getTasksBasedOnDate).map(([date, tasks]) => ({
        date,
        tasks,
    }))
    console.log("getTasks", getTasks)
    // const [date, tasks] = getTasks

    
    //     const completedTasks = tasks.filter(task => task.completed);

   

    // const tasksStatus = historyTasks.reduce((acc, task) =>{
    //     if(task.completed){
    //         acc.completed +=1
    //     }
    //     return acc;
    // },{completed:0,})
    // console.log("tasksStatus", tasksStatus.completed)

    return (
        <div>
        <div className="history-header">
            <div>
                <h3>History</h3>
                {/* make this p tag conditional, based on filter selected to all tasks, completed or incomplete tasks */}
                <p>All completed and incomplete tasks</p>
            </div>
{/* ADD DROPDOWN FOR FILTERING */}
        </div>
         {historyTasks.length>0 && getTasks.map(({date, tasks})=>{
const completedTasks = tasks.filter(task => task.completed).length;
            const totalTasks = tasks.length;
            console.log("completedTasks", completedTasks, totalTasks,"totalTasks")
             const getDate = parseDayKey(date).toDateString();
            return(
                <div className="task-card" key={date}>
                 <Card>
                    <div className="card-header">
                        <h3>{getDate}</h3>
                        
                        <p>{completedTasks}/{totalTasks} done</p>
                    </div>
                    <hr className="card-hr"/>
                    {
                        tasks.map(task=>(
                                <ul key={task.id}>
                                    <li >{task.text}</li>
                                </ul>
                               
                        ))
                    }
                </Card>
            </div>
            )
           
            
           
         }
            
         )}
       
       
        <div className="footer-navigation">
        <Navigation/>
       </div>
       </div>
    )
}


export default History;