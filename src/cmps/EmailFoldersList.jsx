import { Link, NavLink, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from 'react'; 
import { emailService } from "../services/email.service";

export function EmailFolderList({filterBy, onSetFilterBy, navigate ,unReadEmailCount}){

    const [filterToEdit, setFilterToEdit] = useState(filterBy)
    

    useEffect(()=> {
        onSetFilterBy(filterToEdit)
    }, [filterToEdit])

    function onSelectFolder(path){
        const url = `/emailes/${path}`
        setFilterToEdit(prevFilter =>({...prevFilter, status:path}))
        navigate(url)
    }
    
    

    // function handleChange({target}){
    //     let {value, name: field, type} =target
    //     if (value === 'starred'){
    //         console.log("succed!!")
    //         setFilterToEdit(prevFilter =>({...prevFilter,to:'', from: '', isStarred: true}))
    //     }

    //     if(value ==='inbox'){
    //         let {email} = emailService.getLoggedUser()
    //         setFilterToEdit(prevFilter =>({...prevFilter, to: 'Amit', from:'', isStarred: null}))
    //     }

    //     if(value ==='sent'){
    //         setFilterToEdit(prevFilter =>({...prevFilter, from: 'Amit', to:'', isStarred: null}))
    //     }
    //     // setFilterToEdit(prevFilter =>({...prevFilter, [field]:value}))
    // }

    const folders = emailService.getFolders()
    return (
        <section className="email-folder-list">
           { folders.map((folder) =>
           <section>
           {folder.path === filterBy.status ? (
          <li className="active" key={folder.path} onClick={() => {onSelectFolder(folder.path)}}>
            {folder.path === 'inbox'?(
              <span> {folder.name} <span className="counter">{unReadEmailCount}</span></span>) : <span> {folder.name}</span>}
          </li>
           ):(
           <li key={folder.path} onClick={() => {onSelectFolder(folder.path)}}>
              {folder.path === 'inbox'?(
              <span> {folder.name} <span className="counter">{unReadEmailCount}</span></span>) : <span> {folder.name}</span>}
          </li>
           )}
         </section>
        //    <section>
        //         <li key={folder.path} onClick={() => {onSelectFolder(folder.path)}}>
        //             {folder.path === filterBy.status ? (
        //             <span className="active"> {folder.name}</span>
        //             ): <span>{folder.name}</span>
        //             }
        //         </li>
        //     </section>
             )
            }
        </section>
    )
}

