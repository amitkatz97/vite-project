import { EmailList } from "../cmps/EmailList.jsx"
import { emailService } from "../services/email.service.js"
import { useEffect, useState } from "react"
import { EmailFilter } from "../cmps/EmailFilter.jsx"


export function EmailIndex(){

    const [emails, setEmails] = useState()
    const [filterBy, setFilterBy] = useState(emailService.getRandomFilter())

    useEffect(()=> {
        loadEmailes()
    }, [filterBy])


    async function loadEmailes(){
        try {
            console.log('Render')
            const emailesList = await emailService.query(filterBy)
            setEmails(emailesList)
        } catch (error){
            console.log("Having issues woth loading emailes", error)
        }
    }
    console.log(filterBy)

    function onSetFilterBy(filterBy){
        setFilterBy(prevFilter => ({...prevFilter,...filterBy}))
    }

    if (!emails) return <div>Loading..</div>
    return (
        <div className="email-index">
            <EmailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy}/>
            <EmailList emails = {emails} />
        </div>
    )
}