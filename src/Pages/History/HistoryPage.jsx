import { Navigation } from "../../components/Navigation/Navigation";
import { Card } from "../../components/Card/Card";
import './HistoryPage.css'
import {parseDayKey, getOnlyTime, getDayAndDate} from '../../utils/dateUtils';
import {getGroupedHistory} from '../../utils/historyUtils';


const History =({taskList, currentDate, carryOverUnfinished})=>{
    const historyTasks =taskList.filter(task=> task.date !== currentDate);

      const getTasks= getGroupedHistory(historyTasks)

   

    return (
        <>
        <main className="history-main-container">
        <header className="header">
            <div>
                <h3>History</h3>
                <p>Past tasks by day</p>
            </div>
             <div className="tablet-nav">
            <Navigation/>
        </div>
{/* ADD DROPDOWN FOR FILTERING dates months if long list or try to implement calender */}
        </header>

         {historyTasks.length>0 ? getTasks.map(({date, tasks})=>{
            const completedTasks = tasks.filter(task => task.completed).length;
            const totalTasks = tasks.length;
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
                                    <li className="task"><span className="history-task-text">{task.text}</span>
                                        <span className="history-task-time">{!task.completed ? 'Pending' : getOnlyTime(task.createdAt)}</span>
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