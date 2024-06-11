import { EmailList } from "../cmps/EmailList.jsx"
import { emailService } from "../services/email.service.js"
import { useEffect, useState } from "react"
import { EmailFilter } from "../cmps/EmailFilter.jsx"
import { ProgressBar } from "../cmps/ProgressBar.jsx"
import { AsideMenu } from "./AsideMenu.jsx"
import { EmailSort } from "../cmps/EmailSort.jsx"
import { Link, NavLink, useNavigate, useSearchParams, useParams, Outlet } from "react-router-dom";


export function EmailIndex(){
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    const [emails, setEmails] = useState()
    const [sortBy, setSortBy] = useState(emailService.getDefaultSort())
    const [filterBy, setFilterBy] = useState(emailService.getFilterFromSearchParams(searchParams, params.folder))
    const [unReadEmailCount, setUnReadEmailCount] = useState(emailService.fullQuery.length)

    useEffect(()=> {
        setSearchParams(filterBy)
        loadEmailes()
    }, [filterBy, params.folder, sortBy])

    useEffect(() =>{
        countUnread()
    }, [unReadEmailCount]
    )


    async function loadEmailes(){
        try {
            console.log('Render')
            const emailesList = await emailService.query(filterBy, sortBy)
            setEmails(emailesList)
        } catch (error){
            console.log("Having issues woth loading emailes", error)
        }
    }

    function onSetFilterBy(filterBy){
        setFilterBy(prevFilter => ({...prevFilter,...filterBy}))
    }

    function onSetSortBy(sortBy){
        setSortBy(sortBy)
    }

    async function onRemoveEmail(email){
        try{
            if (email.removeAt === null) {
                await emailService.update({...email, removeAt: Date.now()})
                console.log("Moved to trash")
            } else {
                await emailService.remove(email.id)
                console.log("succed deleting")
            }
        } catch (error){
            console.log("Cant delete this email because:", error)
        }
        await loadEmailes()
    }

    async function onNextPage(){
        await emailService.nextPage()
        loadEmailes()
    }

    async function onChangeStar(email){
        await emailService.update({...email, isStarred: !email.isStarred})
        await loadEmailes()
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
        const unreadList =  await emailService.getUnreadEmails()
        setUnReadEmailCount(unreadList.length)
        console.log(unReadEmailCount)
        return unreadList.length
    }



    if (!emails) return <div>Loading..</div>
    return (
        <div className="email-index">
            <AsideMenu filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <ProgressBar progress={unReadEmailCount}/>
            <EmailSort sortBy={sortBy} onSetSortBy={onSetSortBy}/>
            <EmailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy}/> 
            <EmailList emails = {emails} onRemoveEmail={onRemoveEmail} onNextPage={onNextPage} onRead={onRead} onOpenMail={onOpenMail} onChangeStar={onChangeStar}/>
            <Outlet/>
        </div>
    )
}