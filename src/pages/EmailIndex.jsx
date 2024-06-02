import { EmailList } from "../cmps/EmailList.jsx"
import { emailService } from "../services/email.service.js"
import { useEffect, useState } from "react"
import { EmailFilter } from "../cmps/EmailFilter.jsx"
import { ProgressBar } from "../cmps/ProgressBar.jsx"


export function EmailIndex(){

    const [emails, setEmails] = useState()
    const [filterBy, setFilterBy] = useState(emailService.getRandomFilter())
    const [unReadEmailCount, setUnReadEmailCount] = useState(emailService.fullQuery.length)
    // const [isStarred, setIsStarred] = useState('☆')

    useEffect(()=> {
        loadEmailes()
    }, [filterBy])

    useEffect(() =>{
        countUnread()
    }, [unReadEmailCount]
    )


    async function loadEmailes(){
        try {
            console.log('Render')
            const emailesList = await emailService.query(filterBy)
            setEmails(emailesList)
        } catch (error){
            console.log("Having issues woth loading emailes", error)
        }
    }

    function onSetFilterBy(filterBy){
        setFilterBy(prevFilter => ({...prevFilter,...filterBy}))
    }

    async function onRemoveEmail(emailId){
        try{
            await emailService.remove(emailId)
            loadEmailes()
        } catch (error){
            console.log("Cant delete this email because:", error)
        }
    }

    // async function onChangeStar(emaile, isStarred){
    //     if (!emaile.isStarred){
    //         emaile.isStarred = true
    //         isStarred = '★'
    //         // setIsStarred('★') 
    //     } else if (emaile.isStarred){
    //         emaile.isStarred = false
    //         isStarred = '☆'
    //         // setIsStarred('☆') 
    //     }
    //     await emailService.update(emaile)
    //     // console.log(isStarred)
    //     console.log(emaile.isStarred)
    // }

    async function onNextPage(){
        await emailService.nextPage()
        loadEmailes()
    }

    

    async function onRead(email){
        await emailService.update({...email, isRead: !email.isRead})
        await loadEmailes()
        countUnread()
    }

    async function onOpenMail(email){
        if (email.isRead === false){
            email.isRead = true
        } 
        await emailService.update(email)
    }

    async function countUnread(){
        console.log("Counter is down")
        const emaileFullList = await emailService.fullQuery()
        var unreadList = []
        emaileFullList.map(emaile => {
            if (emaile.isRead === false)(
                unreadList.push(emaile)
            )
        })
        setUnReadEmailCount(unreadList.length)
        console.log(unReadEmailCount)
        return unreadList.length
    }



    if (!emails) return <div>Loading..</div>
    return (
        <div className="email-index">
            <ProgressBar progress={unReadEmailCount}/>
            <EmailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy}/> 
            <EmailList emails = {emails} onRemoveEmail={onRemoveEmail} onNextPage={onNextPage} onRead={onRead} onOpenMail={onOpenMail}/*onChangeStar={onChangeStar} isStarred={isStarred}*//>
        </div>
    )
}