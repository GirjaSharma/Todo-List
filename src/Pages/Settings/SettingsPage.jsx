import {useState} from 'react'
import { Card } from "../../components/Card/Card";
import { Navigation } from "../../components/Navigation/Navigation";
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import './SettingsPage.css'

const SettingsPage =({carryOverUnfinished,handleCarryOverToggle})=>{

    return (
         <>
        <main className="settings-main-container">
        <header className="header">
            <div>
                <h3>Settings</h3>
                <p>Daily behavior and preferences</p>
            </div>
            </header>
            <section className="behavior-settings">
                <Card className="behavior-card">
                    <h3>Daily behavior</h3>
                    <div className="carryover-toggle">
                        <div>
<h4>Carry over unfinished tasks</h4>
<p>Show incomplete tasks from yesterday</p>
                        </div>
                        <button className="toggleButton" onClick={handleCarryOverToggle}>
                            {carryOverUnfinished ? <FaToggleOn size={40} className="toggleOn"/> : <FaToggleOff size={40}  class="toggleOff"/>}
                        </button>
                    </div>
                     {/* <div className="recurring-toggle">
                        <div>
<h4>Auto-add recurring tasks</h4>
<p>Tasks marked appear daily each new day</p>
                        </div>
                        <button className="toggleButton" onClick={handleRecurringToggle}>
                            {isRecurringTasks ? <FaToggleOn size={40} className="toggleOn"/> : <FaToggleOff size={40}  class="toggleOff"/>}
                        </button>
                    </div> */}
                </Card>
            </section>
        </main>

         <footer className="footer-navigation">
        <Navigation/>
       </footer>
        </>
    )
}


export default SettingsPage;