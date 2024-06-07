import { useEffect, useState } from 'react'; 
import { emailService } from "../services/email.service";


export function EmailSort({sortBy, onSetSortBy}){

    const [sortToEdit, setSortToEdit] = useState(sortBy)

    useEffect(()=> {
        onSetSortBy(sortToEdit)
    }, [sortToEdit])

    function handleChange({target}){
        let {value, name: field, type} =target
        const newSortBy = {
            by: value,
            dir: 1
        }
        setSortToEdit(newSortBy)
    }

    function cahngeSort(){
        let {dir} = sortBy
        setSortToEdit(prevSort =>({...prevSort, dir: dir*-1}))
    }



    return (
        <>
        <section className='email-sort'>
            <section>
                <label htmlFor="sort"> Sort By: </label>
                <br />
                <select onChange={handleChange} name ="sort" id= "sort">
                    <option value="date">Date</option>
                    <option value="starred">Stared Mail</option>
                    <option value="isRead">Unread mails</option>
                </select>
                <button onClick={cahngeSort} name='sort'>A-Z</button>
                </section>
        </section>
        </>
    )
}
