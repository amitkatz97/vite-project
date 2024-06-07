import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from 'react'; 
import { EmailFolderList } from "../cmps/EmailFoldersList";


export function AsideMenu({filterBy, onSetFilterBy}){
    const navigate = useNavigate()
    return(
        <>
        <section className="email-asdie-menu">
            <h1>Here will be Compose</h1>
            <br />
            <EmailFolderList filterBy={filterBy} onSetFilterBy={onSetFilterBy} navigate={navigate}/>
        </section>
        </>
    )
}