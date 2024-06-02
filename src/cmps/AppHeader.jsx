import { Link, NavLink, useNavigate } from "react-router-dom";

export function AppHeader(){
    return (
        <>
        <header className = "app-header">
            <img className = "top-img" src ="src\assets\imgs\logo_gmail_lockup_.png"></img>
            <section className ="container">
        
                <nav>
                <NavLink to ='/'>Home</NavLink>
                
                <NavLink to ='/about'> About</NavLink>
                
                <NavLink to ='/emailes'> Email</NavLink>
                </nav>

            </section>
            <img src = "src\assets\imgs\face.jpg"></img>
        </header>
        </>
    )
}