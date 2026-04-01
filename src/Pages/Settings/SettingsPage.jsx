import {useState} from 'react'
import { Card } from "../../components/Card/Card";
import { Navigation } from "../../components/Navigation/Navigation";
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import './SettingsPage.css';
import {useTheme} from '../../hooks/useTheme.js';

const SettingsPage =({carryOverUnfinished,handleCarryOverToggle,
    // darkTheme, handleThemeSwitch
})=>{
    const {theme, toggleTheme} = useTheme();

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
                <Card className="settings-card">
                    <h3>Daily behavior</h3>
                    <div className="toggle-option">
                        <div>
<h4>Carry over unfinished tasks</h4>
<p>Show incomplete tasks from yesterday</p>
                        </div>
                        <button className="toggleButton" onClick={handleCarryOverToggle}>
                            {carryOverUnfinished ? <FaToggleOn size={40} className="toggleOn"/> : <FaToggleOff size={40}  className="toggleOff"/>}
                        </button>
                    </div>
                    
                </Card>
               
            </section>
            <section className="theme-settings">
                 <Card className="settings-card">
                     <div className="toggle-option">
                        <div>
                            <h4>Appearance</h4>
                            <p>Theme</p>
                        </div>
<div>  <button className="btn-theme" onClick={toggleTheme}>{theme === 'light' ? "Dark" : "Light"}</button></div>
                     
                      
                       
                    </div>
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