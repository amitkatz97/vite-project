import { EmailPreview } from "./EmailPreview.jsx"

export function EmailList({emails , onRemoveEmail}){

    return(
        <>
        <section className ="email-list">
            {/* <h1>Email list</h1> */}
            <table>
                <th>From</th>
                <th>Subject</th>
                <th>Date</th>
            </table>
                <ul>
                    {emails.map(emaile => 
                        <li key ={emaile.id}>
                            <EmailPreview emaile ={emaile}  onRemoveEmail = {onRemoveEmail}/> 
                            {/* <section className="emailes-actions"> */}
                               
                            {/* </section> */}
                        </li>
                    )}
                </ul>
        </section>
        </>
    )
}