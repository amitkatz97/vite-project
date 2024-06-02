import {storageService} from "./asynce-storage.service"
import {utilService} from "./util.service"

const EMAIL_KEY='emailesDB'
const PAGE_SIZE = 11 
var gPageIdx = 0

export const emailService ={
    query,
    remove,
    post,
    getById,
    getRandomFilter,
    update,
    nextPage,
    fullQuery
}

_createEmailes()

async function query (filterBy){
    // console.log('filter by:', filterBy)
    let emiles = await storageService.query(EMAIL_KEY)
    if (filterBy){
        let {from ="" , isStarred = false, isRead = false, subject =""} = filterBy
        emiles = emiles.filter(emile =>
            emile.from.toLowerCase().includes(from.toLowerCase()) &&
            emile.subject.toLowerCase().includes(subject.toLowerCase()) 
        )
        // emiles = emiles.filter(emaile =>
        //     !emaile.isRead
        // )
    } 
    const startIdx = gPageIdx * PAGE_SIZE
    emiles = emiles.slice(startIdx, startIdx + PAGE_SIZE)
    return emiles
}

async function fullQuery (){
    // console.log('filter by:', filterBy)
    let emiles = await storageService.query(EMAIL_KEY)
    return emiles
}

async function nextPage(){
    const emiles = await storageService.query(EMAIL_KEY)
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= emiles.length){
        gPageIdx  =0
    }
}

function remove(emailId){
    return storageService.remove(EMAIL_KEY, emailId)
}
function post (EMAIL_KEY , obj){
    return storageService.post(EMAIL_KEY, obj)
}

 function update(email){
    if (email.id){
        return storageService.put(EMAIL_KEY, email)
    } else {console.log('Erorr!')}
 }


function getById(id) {
    return storageService.get(EMAIL_KEY, id)
}

function getRandomFilter(){
    return{
        from : "",
        subject:"",
        isStarred: false,
        isRead: false
    }
}


function _createEmail(){
    const email ={
        id :utilService.makeId(),
        subject: utilService.makeShortLorem(),
        body: utilService.makeLorem(),
        isRead : false,
        isStarred: false,
        sentAt: "21.04.2024",
        removeAt: null,
        from: utilService.getRandomEmail(),
        to: utilService.getRandomEmail()
    }
    return email
}

function _createEmailes(){
    const emailes =[]
    for( var i = 0; i <25; i++){
        emailes.push(_createEmail())
    }
    console.log('emiles are set')
    utilService.saveToStorage(EMAIL_KEY,emailes)
    return emailes
}




