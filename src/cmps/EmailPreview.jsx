import React from "react"
import { Link } from "react-router-dom"
import { utilService } from "../services/util.service"

import { emailService } from "../services/email.service"

const {useState , useEffect} =React

export function EmailPreview({emaile, onRemoveEmail, onRead, onOpenMail, onChangeStar}){
    const [isHovered , setIsHovered] = useState(false)

    const handleMouseEnter = () =>{
        setIsHovered(true)
    }

    const handleMouseLeave = () =>{
        setIsHovered(false)
    }
    function getDateText(ms) {
        return utilService.formatMailDate(ms)
    }

    var starDisplay = emaile.isStarred ? '★' : '☆'
    var readClass = emaile.isRead ? 'read' : 'unread'
    var emaileState = emaile.isRead ? 'unread' : 'read'

    return(
        <>
        <div className ={readClass}>
            <article className="emaile-preview" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button onClick={() => onChangeStar(emaile)}>{starDisplay}</button>
                <Link to={`/emailes/inbox/${emaile.id}`} onClick={() => onOpenMail(emaile)}>
                <section className="item1">
                    {emaile.from}
                </section>
                </Link>
                <Link to={`/emailes/inbox/${emaile.id}`} onClick={() => onOpenMail(emaile)}>
                <section className="item2">
                    {emaile.subject}
                </section>
                </Link>
                <div>
                    {!isHovered ?( 
                    <section className="item3">
                        {getDateText(emaile.sentAt)}
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