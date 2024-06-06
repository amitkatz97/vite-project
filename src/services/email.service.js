import {storageService} from "./asynce-storage.service"
import {utilService} from "./util.service"

const EMAIL_KEY='emailesDB'
const PAGE_SIZE = 16 
var gPageIdx = 0

export const emailService ={
    query,
    remove,
    post,
    getById,
    getRandomFilter,
    update,
    nextPage,
    fullQuery,
    getUnreadEmails,
    gPageIdx
}

_createEmailes()

async function query (filterBy){
    // console.log('filter by:', filterBy)
    let emails = await storageService.query(EMAIL_KEY)
    if (filterBy){
        let {from ="" , isStarred = false, isRead = null, subject =""} = filterBy
        emails = emails.filter(email => _isMatchFilter(email, filterBy))
        // emiles = emiles.filter(emaile =>
        //     !emaile.isRead
        // )
    } 
    const startIdx = gPageIdx * PAGE_SIZE
    emails = emails.slice(startIdx, startIdx + PAGE_SIZE)
    return emails
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

    return gPageIdx
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
        isRead: null
    }
}

async function getUnreadEmails(){
    const emaileFullList = await emailService.fullQuery()
    var unreadList = []
        emaileFullList.map(emaile => {
            if (emaile.isRead === false)(
                unreadList.push(emaile)
            )
        })
        return unreadList
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
    for( var i = 0; i <35; i++){
        emailes.push(_createEmail())
    }
    console.log('emiles are set')
    utilService.saveToStorage(EMAIL_KEY,emailes)
    return emailes
}

// return true if this email matches the given filter, false otherwise
function _isMatchFilter(email, filterBy) {

    const { from, subject, isRead } = filterBy

    // from
    if(! email.from.toLowerCase().includes(from.toLowerCase())) {
        return false
    }

    // subject
    if(!email.subject.toLowerCase().includes(subject.toLowerCase()) ) {
        return false
    }

    // isRead
    if(isRead !== null) {
        if(email.isRead !== isRead) {
            return false
        }
    }

    return true
}



