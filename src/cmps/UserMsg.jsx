import { useEffect, useState } from "react"
import { eventBusService } from "../services/event-bus.service"

export function UserMsg(){
    const [msg , setMsg] = useState(null)

    useEffect(() => {
        eventBusService.on('show-user-msg', msg => {
            setMsg(msg)
            setTimeout(() => {
                setMsg(null)
            }, 3000);
        })

    }, [])

    function onClose(){
        setMsg(null)
    }

    if(!msg) return <></>
    return (
        <div className={"user-msg " + msg.type}>
            <h4>{msg.txt}</h4>
            <button onClick={onClose} className="close-btn">X</button>
        </div>
    )
}