import { Link, NavLink, useNavigate, useSearchParams, useParams, Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { emailService } from "../services/email.service";
import { utilService } from "../services/util.service";

export function EmailCompose({newEmail}){

    const [email , setEmail] = useState(emailService.createEmptyEmail())
    const navigate = useNavigate()
    

    function handleChange({target}){
        let {value ,name} =target 
        setEmail(prevemaile => ({...prevemaile, [name] :value}))
    }

    async function onCreateEmail(ev){
        ev.preventDefault()
        const url = `/emailes/inbox`
        const newEmailCreate= {
            id :utilService.makeId(),
            subject: subject,
            body: body,
            isRead : false,
            isStarred: false,
            sentAt: Date.now(),
            removeAt: null,
            from: 'Amit@Reemon.com',
            to: to
        }
        setEmail(newEmailCreate)
        await emailService.post(newEmailCreate)
        navigate(url)
    }

    const {to , subject , body} = email
    return(
        <section className="email-compose">
            <section className="header">
                <h1>New Mail</h1>
                <Link to="/emailes/inbox"><button>X</button> </Link>
            </section>
            <form onSubmit={onCreateEmail}>

                <label  htmlFor="to"></label>
                <input className="to" onChange={handleChange} value={to} type="text" id="to" name="to" placeholder="To"/>
                <br />

                <label htmlFor="subject"></label>
                <input className="subject" onChange={handleChange} value={subject} type="text" id="subject" name="subject" placeholder="Subject"/>
                <br />

                <label htmlFor="body"></label>
                <input className="body" onChange={handleChange} value= {body} type="text" id="body" name="body" placeholder="Write Something"/>
                <br />
                <button className="submit">Send</button>
            </form>
        </section>
    )
}
