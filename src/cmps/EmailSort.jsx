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
            <section className='email-area'>
                <label htmlFor="sort"></label>
                <select onChange={handleChange} name ="sort" id= "sort">
                    <option value="date">Date</option>
                    <option value="starred">Stared Mail</option>
                    <option value="isRead">Unread mails</option>
                </select>
                <button className='order-sort' onClick={cahngeSort} name='sort'>A-Z</button>
            </section>
        </section>
        </>
    )
}
