import React from "react"
import { Link } from "react-router-dom"
const {useState} =React

export function EmailPreview({emaile}){

    const [isStared, setIsStared] = useState('☆')

    var starClass = isStared ? '☆' : '★'

    function onChangeStar(){
        if (isStared === '☆' ){
            starClass === '★'
            setIsStared('★')
        } else {setIsStared ('☆')}
    }
    // console.log(isStared)

    return(
        <>
        <article className="emaile-preview">
        <button className={starClass} onClick={() => onChangeStar()}>{isStared}</button>
            <Link to={`/emailes/${emaile.id}`}>
            <section className="item1">
                {emaile.from}
            </section>
            <section className="item2">
                {emaile.subject}
            </section>
            <section className="item3">
                {emaile.sentAt}
            </section>
            </Link>
            <section className="actions">
                <button className="item4">Unread\Read</button>
                <button>X</button>
            </section>
        </article>
       
        </>
    )

}