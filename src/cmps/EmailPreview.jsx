import React from "react"
import { Link } from "react-router-dom"

import { emailService } from "../services/email.service"

const {useState , useEffect} =React

export function EmailPreview({emaile, onRemoveEmail, onRead, onOpenMail}){

    const [isStarred, setIsStarred] = useState('☆')
    // const [isRead, setIsCurrRead] = useState("read")
    const [isHovered , setIsHovered] = useState(false)

    // useEffect(() =>{
    //     setIsRead(isRead)
    // }, [readClass])

    var starClass = isStarred //emaile.isStarred ? '☆' : '★'
    

    async function onChangeStar(){
        if (isStarred === '☆' ){
            emaile.isStarred = true
            setIsStarred('★')
        } else {setIsStarred ('☆') , emaile.isStarred = false}
        await emailService.update(emaile)
        console.log(isStarred)
        console.log(emaile.isStarred)
    }
    

    // async function onRead(){
    //     if (isRead === 'read'){
    //         emaile.isRead = true
    //         setIsRead('unread')
    //     } else {setIsRead ('read') , emaile.isRead = false}
    //     await emailService.update(emaile)
    //     console.log(isRead)
    // }

    // async function onOpenMail(){
    //     if (isRead === 'read'){
    //         emaile.isRead = true
    //         setIsCurrRead('unread')
    //     } await emailService.update(emaile)
    //     console.log(isRead)
    // }

    const handleMouseEnter = () =>{
        setIsHovered(true)
    }

    const handleMouseLeave = () =>{
        setIsHovered(false)
    }


    var readClass = emaile.isRead ? 'read' : 'unread'
    var emaileState = emaile.isRead ? 'unread' : 'read'

    

    return(
        <>
        <div className ={readClass}>
            <article className="emaile-preview" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className={starClass} onClick={() => onChangeStar()}>{isStarred}</button>
                <Link to={`/emailes/${emaile.id}`} onClick={() => onOpenMail(emaile)}>
                <section className="item1">
                    {emaile.from}
                </section>
                </Link>
                <Link to={`/emailes/${emaile.id}`} onClick={() => onOpenMail(emaile)}>
                <section className="item2">
                    {emaile.subject}
                </section>
                </Link>
                <div>
                    {!isHovered ?( 
                    <section className="item3">
                        {emaile.sentAt}
                    </section>
                    ) : (
                    <section className="actions">
                        <button className="item4" onClick={() => onRead(emaile)}>{emaileState}</button>
                        <button onClick={() => onRemoveEmail(emaile.id)}>X</button>
                    </section>
                    )}
                </div>
            </article>
        </div>
       
        </>
    )

}