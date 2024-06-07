import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { emailService } from "../services/email.service";
import { EmailFilter } from "./EmailFilter";

export function AppHeader(){
    const [filterBy, setFilterBy] = useState(emailService.getRandomFilter())

    function onSetFilterBy(filterBy){
        setFilterBy(prevFilter => ({...prevFilter,...filterBy}))
    }
    return (
        <>
        <header className = "app-header">
            <img className = "top-img" src ="vite-project\src\assets\imgs\logo_gmail_lockup_.png"></img>
            {/* <EmailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy}/> */}
            <section className ="container">
                <nav>
                <NavLink to ='/'>Home</NavLink>
                
                <NavLink to ='/about'> About</NavLink>
                
                <NavLink to ='/emailes/inbox'> Email</NavLink>
                </nav>

            </section>
            <img src = "vite-project\src\assets\imgs\face.jpg"></img>
        </header>
        </>
    )
}