import React from "react"
import { Link } from "react-router-dom"

import { emailService } from "../services/email.service"

const {useState , useEffect} =React

export function EmailPreview({emaile, onRemoveEmail}){

    const [isStarred, setIsStarred] = useState('☆')
    const [isRead, setIsRead] = useState('read')

    // useEffect(() =>{
    //     setIsRead(isRead)
    // }, [readClass])

    var starClass = isStarred //emaile.isStarred ? '☆' : '★'
    var readClass = emaile.isRead ? 'read' : 'unread'

    async function onChangeStar(){
        if (isStarred === '☆' ){
            emaile.isStarred = true
            setIsStarred('★')
        } else {setIsStarred ('☆') , emaile.isStarred = false}
        await emailService.update(emaile)
        console.log(isStarred)
        console.log(emaile.isStarred)
    }
    

    async function onRead(){
        if (isRead === 'read'){
            emaile.isRead = true
            setIsRead('unread')
        } else {setIsRead ('read') , emaile.isRead = false}
        await emailService.update(emaile)
        console.log(isRead)
    }

    async function onOpenMail(){
        if (isRead === 'read'){
            emaile.isRead = true
            setIsRead('unread')
        } await emailService.update(emaile)
        console.log(isRead)
    }

    

    return(
        <>
        <div className ={readClass}>
            <article className="emaile-preview">
            <button className={starClass} onClick={() => onChangeStar()}>{isStarred}</button>
                <Link to={`/emailes/${emaile.id}`} onClick={() => onOpenMail()}>
                <section className="item1">
                    {emaile.from}
                </section>
                </Link>
                <Link to={`/emailes/${emaile.id}`} onClick={() => onOpenMail()}>
                <section className="item2">
                    {emaile.subject}
                </section>
                </Link>
                <section className="item3">
                    {emaile.sentAt}
                </section>
                <section className="actions">
                    <button className="item4" onClick={() => onRead()}>{isRead}</button>
                    <button onClick={() => onRemoveEmail(emaile.id)}>X</button>
                </section>
            </article>
        </div>
       
        </>
    )

}