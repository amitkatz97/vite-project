import { EmailPreview } from "./EmailPreview.jsx"
import { emailService } from "../services/email.service.js"
import { useEffect, useState } from "react"

export function EmailList({emails , onRemoveEmail, onNextPage , onRead, onOpenMail, onChangeStar}){

    const [pageNum, setPageNum] = useState()


    useEffect(() => {
        console.log(emailService.gPageIdx)
        console.log(pageNum)
        setPageNum(emailService.gPageIdx +1)
    }, [pageNum])

    return(
        <>
        <section className ="email-list">
            {/* <h1>Email list</h1> */}
            <table>
                <th className="star">Fav</th>
                <th className="from">From</th>
                <th className="subject">Subject</th>
                <th className="date">Date</th>
            </table>
                <ul>
                    {emails.map(emaile => 
                        <li key ={emaile.id}>
                            <EmailPreview emaile ={emaile}  onRemoveEmail = {onRemoveEmail} onRead={onRead} onOpenMail={onOpenMail} onChangeStar={onChangeStar}/> 
                        </li>
                    )}
                </ul>
                <button onClick={() => {onNextPage()}}>Next Page</button> <span>{pageNum}</span>
        </section>
        </>
    )
}