import React from "react";
import {useEffect, useState} from "react"
import { Link, useParams } from "react-router-dom";
import { emailService } from "../services/email.service";

export function EmaileDetailes(){

    const [email , setEmail] =useState(null)
    const params = useParams()

    useEffect(()=> {
        loadEmaile()}, [params.emaileId]
    )


    async function loadEmaile(){
        const email = await emailService.getById(params.emaileId)
        setEmail(email)
    }


    if(!email) return <div>Loading...</div>
    return (
        <>
        <section className="email-details">
            <h3>Subject : {email.subject}</h3>
            <h4>From : {email.from}</h4>
            <h4>sent at: {email.sentAt}</h4>
            <p>{email.body}</p>
            <h4></h4>
        </section>

        <Link to ="/emailes">Back</Link>
        </>
    )
}