import { Link, NavLink, useNavigate } from "react-router-dom";

export function AppHeader(){
    return (
        <>
        <header className = "app-header">
            <h1>Gmail.com</h1>
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