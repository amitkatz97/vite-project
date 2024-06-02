import { EmailPreview } from "./EmailPreview.jsx"

export function EmailList({emails , onRemoveEmail, onNextPage , onRead, onOpenMail}){

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
                            <EmailPreview emaile ={emaile}  onRemoveEmail = {onRemoveEmail} onRead={onRead} onOpenMail={onOpenMail}/> 
                        </li>
                    )}
                </ul>
                <button onClick={() => {onNextPage()}}>Next Page</button>
        </section>
        </>
    )
}