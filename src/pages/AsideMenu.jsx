import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from 'react'; 
import { EmailFolderList } from "../cmps/EmailFoldersList";


export function AsideMenu({filterBy, onSetFilterBy}){
    const navigate = useNavigate()
    return(
        <>
        <section className="email-aside-menu">
            <Link  className= "compose-area" to = "/emailes/:folder/edit/:emaileId?">Compose</Link>
            <br />
            <EmailFolderList filterBy={filterBy} onSetFilterBy={onSetFilterBy} navigate={navigate}/>
        </section>
        </>
    )
}