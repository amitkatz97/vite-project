import { EmailPreview } from "./EmailPreview.jsx"
import { emailService } from "../services/email.service.js"
import { useEffect, useState } from "react"

export function EmailList({emails , onRemoveEmail, onNextPage , onRead, onOpenMail, onChangeStar}){

    const [pageNum, setPageNum] = useState(emailService.getPageIdx())


    useEffect(() => {
        setPageNum(emailService.getPageIdx() + 1)
        console.log(pageNum)
    }, [onNextPage])

    return(
        <>
        <section className ="email-list">
            {/* <h1>Email list</h1> */}
            {/* <table>
                <th className="star">Fav</th>
                <th className="from">From</th>
                <th className="subject">Subject</th>
                <th className="date">Date</th>
            </table> */}
                <ul>
                    {emails.map(emaile => 
                        <li key ={emaile.id}>
                            <EmailPreview emaile ={emaile}  onRemoveEmail = {onRemoveEmail} onRead={onRead} onOpenMail={onOpenMail} onChangeStar={onChangeStar}/> 
                        </li>
                    )}
                </ul>
                <button className="next-page" onClick={() => {onNextPage()}}>Next Page</button> <span>{pageNum}</span>
        </section>
        </>
    )
}