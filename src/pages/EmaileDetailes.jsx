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
        <div className="email-details">
            <section>
                <h3>Subject : {email.subject}</h3>
                <h4>From : {email.from}</h4>
                <h5>sent at: {email.sentAt}</h5>
                <p>{email.body}</p>
                <Link to ="/emailes">Back</Link>
            </section>
        </div>
        </>
    )
}