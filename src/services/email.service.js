import {storageService} from "./asynce-storage.service"
import {utilService} from "./util.service"

const EMAIL_KEY='emailesDB'


export const emailService ={
    query,
    remove,
    post,
    getById
}

_createEmailes()

function query (){
    return storageService.query(EMAIL_KEY)
}

function remove(emailId){
    return storageService.remove(EMAIL_KEY, emailId)
}
function post (EMAIL_KEY , obj){
    return storageService.post(EMAIL_KEY, obj)
}

function getById(id) {
    return storageService.get(EMAIL_KEY, id)
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




