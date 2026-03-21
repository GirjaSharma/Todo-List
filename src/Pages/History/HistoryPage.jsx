import { Navigation } from "../../components/Navigation/Navigation";
import { Card } from "../../components/Card/Card";
import './HistoryPage.css'
import {parseDayKey, getOnlyTime, getDayAndDate} from '../../utils/dateUtils';
import {getGroupedHistory} from '../../utils/historyUtils';


const History =({taskList, currentDate, carryOverUnfinished})=>{
    // const historyTasks =taskList.filter(task=> task.date !== currentDate);

    // temporary data to test------
    let historyTasks =[
        {completed: true,createdAt: "3/16/2026, 11:08:28 PM",date: "2026-03-16", id: "19074b17-ef1a-4cb5-9f6f-cefc19f59471",
text: "implement history page logic"},
{text: "fix the update task logic on today page", id: "32f20f1a-6944-4479-9793-c8be86aedec6",date
: 
"2026-03-15",
completed
: 
false,
createdAt
: 
"3/15/2026, 11:09:04 PM"},
{
    text: "fix the update task logic on today page",
    id: "32f20f1a-6944-4479-9793-c8be86aedec6",
    completed: true,
    createdAt: "3/16/2023, 11:09:04 PM",
    date: "2026-03-13"
  },
  {
    text: "Add filters dropdown based on completed, incomoplete or all tasks",
    id: "1475dac5-5e6c-487d-8990-6cfe7eb2f232",
    completed: false,
    createdAt: "3/12/2026, 11:09:24 PM",
    date: "2026-03-12"
  },
  {
    text: "fix the css issue for input box width and button",
    id: "3f839ac2-9c8f-45d2-a00f-26223dddef14",
    completed: false,
    createdAt: "3/12/2026, 11:10:03 PM",
    date: "2026-03-12"
  },
  {
    text: "the height of todoItem should be auto --css fix",
    id: "166fa9ad-2830-4c14-bb57-31413bdcea65",
    completed: true,
    createdAt: "3/11/2026, 11:10:36 PM",
    date: "2026-03-11"
  },
  {
    text: "keystroke and tab on all the important items",
    id: "d9e7cfe4-4ced-4c43-a2f4-9b2d4c7de5d7",
    completed: false,
    createdAt: "3/11/2026, 11:10:58 PM",
    date: "2026-03-11"
  }
    ]
    console.log("historyTasks", historyTasks)

      const getTasks= getGroupedHistory(historyTasks)

   

    return (
        <>
        <main className="history-main-container">
        <header className="header">
            <div>
                <h3>History</h3>
                <p>Past tasks by day</p>
            </div>
{/* ADD DROPDOWN FOR FILTERING dates months if long list or try to implement calender */}
        </header>

         {historyTasks.length>0 ? getTasks.map(({date, tasks})=>{
            const completedTasks = tasks.filter(task => task.completed).length;
            const totalTasks = tasks.length;
            console.log("completedTasks", completedTasks, totalTasks,"totalTasks")
             const dateLabel = date === currentDate ? "Today" : getDayAndDate(date);
            //  const getDate = parseDayKey(date).toDateString();
            return(
                <section className="task-card" key={date}>
                 <Card>
                    <header className="card-header">
                        <h4>{dateLabel}</h4>
                        {!carryOverUnfinished ? <p>Completed tasks</p> : <p>{completedTasks}/{totalTasks} done</p>}
                        
                    </header>
                    <hr className="card-hr"/>
                 <section className="list-card">
                        {
                        tasks.map(task=>(
                                <ul key={task.id}>
                                    <li className="task"><span>{task.text}</span>
                                        <span>{!task.completed ? 'Pending' : getOnlyTime(task.createdAt)}</span>
                                    </li>
                                </ul>
                               
                        ))
                    }
                    </section>
                
                    
                </Card>
            </section>
            )
           
            
           
         }
            
         ) : <div className="empty-history"><h4>No History Yet</h4>
         <p>Tasks from previous days will appear here.</p></div>}

         </main>
       
       
        <footer className="footer-navigation">
        <Navigation/>
       </footer>
       </>
    )
}


export default History;