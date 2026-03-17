
import { NavLink} from 'react-router-dom';
import './Navigation.css';
const setActiveClass = ({ isActive }) => isActive ? "active-link" : "inactive-link";

export const Navigation =()=>{
    return (
        <>
            <hr/>
            <nav aria-label='primary' className='nav-links'>
               <ul >
                <li > <NavLink className={setActiveClass} to="/today">Today</NavLink></li>
                <li><NavLink className={setActiveClass} to="/history">History</NavLink></li>
                <li><NavLink className={setActiveClass} to="/settings">Settings</NavLink></li>
               </ul>
                       
                        
                        
                        
            </nav>
        </>
    )
}