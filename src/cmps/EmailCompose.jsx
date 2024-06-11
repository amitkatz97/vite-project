import { Link, NavLink, useNavigate, useSearchParams, useParams, Outlet } from "react-router-dom";
import { useEffect, useState } from "react"
import { emailService } from "../services/email.service";

export function EmailCompose(){

    const [email , setEmail] = useState(emailService.createEmptyEmail())

    const {to , subject , body} = email
    return(
        <section className="email-compose">
            <h1>New Mail</h1>
            <Link to='/emiles/:folder'><button>X</button> </Link>
            <form>
                <label htmlFor="to">To:</label>
                <br />
                <input value={to} type="text" id="to" name="to"/>
                <br />

                <label htmlFor="subject">Subject</label>
                <br />
                <input  value={subject} type="text" id="subject" name="subject"/>
                <br />

                <label htmlFor="body">Content</label>
                <br />
                <input value= {body} type="text" id="body" name="body"/>

            </form>
        </section>
    )
}
