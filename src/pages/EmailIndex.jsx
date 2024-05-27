import { EmailList } from "../cmps/EmailList.jsx"
import { emailService } from "../services/email.service.js"
import { useEffect, useState } from "react"


export function EmailIndex(){

    const [emails, setEmails] = useState()

    useEffect(()=> {
        loadEmailes()
    }, [])


    async function loadEmailes(){
        try {
            console.log('Render')
            const emailesList = await emailService.query()
            setEmails(emailesList)
        } catch (error){
            console.log("Having issues woth loading emailes", error)
        }
    }
    

    if (!emails) return <div>Loading..</div>
    return (
        <div className="email-index">
            <EmailList emails = {emails} />
        </div>
    )
}