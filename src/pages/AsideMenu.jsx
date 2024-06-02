import { Link, NavLink, useNavigate } from "react-router-dom";

export function AsideMenu(){
    return(
        <>
        <h1>Here will be Folders</h1>
        <nav>
            <NavLink to ='/'>Home</NavLink>
                
            <NavLink to ='/about'> About</NavLink>
                
            <NavLink to ='/emailes'> Email</NavLink>
        </nav>
        </>
    )
}