import { useEffect, useRef, useState } from "react"
import { emailService } from "../services/email.service"

export function EmailFilter({filterBy, onSetFilterBy}){

    const [filterToEdit, setFilterToEdit] = useState(filterBy)
    const [showRead , setShowRead] = useState(false)

    useEffect(()=> {
        onSetFilterBy(filterToEdit)
    }, [filterToEdit])

    function handleChange({target}){
        // filtering with hard code:
        // const value = target.value
        // setFilterToEdit(prevFilter => ({...prevFilter, from: value}))
        // filtering with global field that change according to input "name" :
        let {value, name: field, type} =target
        value = type ==='checkbox' ? true : value
        setFilterToEdit(prevFilter =>({...prevFilter, [field]:value}))
        console.log(value)
    }

    function onSubmitFilter(ev){
        ev.preventDefault()
        onSetFilterBy(filterToEdit)
        // console.log("ev:", ev)
        // console.log("filter to edit:", filterToEdit)
    }


    const {from , isRead, subject} = filterToEdit
    return(
        <form onSubmit={onSubmitFilter} className="email-filter">
            <section>
                <label htmlFor="from"> From</label> <br />
                <input onChange={handleChange} name="from" id= "from" type="text" placeholder="Search Contact" value={from} />
            </section>
            <section>
                <label htmlFor="subject"> subject</label> <br />
                <input onChange={handleChange} name="subject" id="subject" type="text" placeholder="Search by subject" value={subject} />
            </section>
            {/* <section>
                <label htmlFor="isRead"> Read / unread / all</label><br />
                <input onChange={handleChange} name ="isRead" id= "isRead" type="checkbox" value={isRead}></input>
            </section> */}
            {/* <button>Submit</button> */}
        </form>
    )
}