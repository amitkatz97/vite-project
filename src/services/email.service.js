import {storageService} from "./asynce-storage.service"
import {utilService} from "./util.service"

const EMAIL_KEY='emailesDB'
const PAGE_SIZE = 30 
var gPageIdx = 0
const loggedInUser = {
    email: 'Amit@Reemon.com',
    fullName: 'Amit Katz',
}

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
    getPageIdx,
    getFolders,
    getLoggedUser,
    getFilterFromSearchParams,
    getDefaultSort,
    createEmptyEmail,
}

_createEmailes()

async function query (filterBy, sortBy = getDefaultSort()){
    // console.log('filter by:', filterBy)
    let emails = await storageService.query(EMAIL_KEY)
    emails = _filterEmails(emails, filterBy)
    _sortEmailes(emails, sortBy)
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
        gPageIdx = 0
    }
    return gPageIdx
}

function remove(emailId){
    return storageService.remove(EMAIL_KEY, emailId)
    
}
function post (obj){
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


function getPageIdx(){
    return gPageIdx
}
function getLoggedUser() {
    return loggedInUser
}

function getFolders(){
    return [
        {
            path: 'inbox',
            icon: 'inbox',
            name: 'Inbox'
        },
        {
            path: 'starred',
            icon: 'star',
            name: 'Starred'
        },
        {
            path: 'sent',
            icon: 'send',
            name: 'Sent'
        },
        {
            path: 'draft',
            icon: 'draft',
            name: 'Drafts'
        },
        {
            path: 'trash',
            icon: 'Delete',
            name: 'Deleted'
        },

    ]
}

function getDefaultSort(){
    return {
        by: 'date',
        dir: 1
    }
}

function _sortEmailes(emailes, sortBy){
    if (sortBy.by === 'date'){
        emailes.sort((mail1, mail2) => (mail2.sentAt - mail1.sentAt) * sortBy.dir)
    } else if (sortBy.by ==='starred'){
        emailes.sort((mail1, mail2) => (mail2.isStarred- mail1.isStarred) * sortBy.dir)
    } else if (sortBy.by ==='isRead'){
        emailes.sort((mail1, mail2) => (mail2.isRead - mail1.isRead) * sortBy.dir)
    }
}

function getRandomFilter(){
    return{
        status: 'inbox',
        from : "",
        subject:"",
        isStarred: null,
        isRead: null,
        to: ""
    }
}


function getFilterFromSearchParams(searchParams, folder){
    const filterBy ={
        status: folder,
        isRead: JSON.parse(searchParams.get('isRead')),
        isStarred: JSON.parse(searchParams.get('isStarred')) || null,
        from: searchParams.get('from') || '',
        subject: searchParams.get('subject') || '',
        to: searchParams.get('to') || '',
        removeAt: searchParams.get('removeAt') || " "
    }
    return filterBy
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

function createEmptyEmail(){
    const email= {
        id :utilService.makeId(),
        subject: '',
        body: '',
        isRead : false,
        isStarred: false,
        sentAt: '',
        removeAt: null,
        from: 'Amit@Reemon.com',
        to: ''
    }
    return email
}


function _createEmail(){
    const email ={
        id :utilService.makeId(),
        subject: utilService.makeShortLorem(),
        body: utilService.makeLorem(),
        isRead : false,
        isStarred: false,
        sentAt: utilService.getRandomIntInclusive(100000, Date.now()),
        removeAt: null,
        from: utilService.getRandomEmail(),
        to: 'Amit@Reemon.com'
    }
    return email
}

function _createSendEmail(){
    const email={
        id :utilService.makeId(),
        subject: utilService.makeShortLorem(),
        body: utilService.makeLorem(),
        isRead : true,
        isStarred: false,
        sentAt: utilService.getRandomIntInclusive(100000, Date.now()),
        removeAt: null,
        from: 'Amit@Reemon.com',
        to: utilService.getRandomEmail()
    }
    return email
}

function _createEmailes(){
    const emailes =[]
    for( var i = 0; i <53; i++){
        emailes.push(_createEmail())
    }
    for( var i = 0; i <15; i++){
        emailes.push(_createSendEmail())
    }
    console.log('emiles are set')
    utilService.saveToStorage(EMAIL_KEY,emailes)
    return emailes
}

// return true if this email matches the given filter, false otherwise
function _isMatchFilter(email, filterBy) {

    const { from, subject, isRead , to, isStarred} = filterBy
    // from
    if(! email.from.toLowerCase().includes(from.toLowerCase())) {
        return false
    }
    // subject
    if(!email.subject.toLowerCase().includes(subject.toLowerCase()) ) {
        return false
    }
    //to
    if(!email.to.toLowerCase().includes(to.toLowerCase())){
        return false
    }
    // isRead
    if(isRead !== null) {
        if(email.isRead !== isRead) {
            return false
        }
    }
    //isStrread
    if(isStarred !== null){
        if(email.isStarred !== isStarred){
            return false
        }
    }
    return true
}

function _filterEmails(emails, filterBy) {
    if (filterBy.status) {
        emails = _filterMailsByFolder(emails, filterBy.status)
    }
    if (filterBy.from) {
        const regExp = new RegExp(filterBy.from, 'i')
        emails = emails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body) || regExp.test(mail.from))
    }
    if (filterBy.isRead !== null && filterBy.isRead !== undefined) {
        emails = emails.filter(mail => mail.isRead === filterBy.isRead)
    }
    return emails

}

function _filterMailsByFolder(emails, folder) {
    switch (folder) {
        case 'inbox':
            emails = emails.filter(email => (email.to === loggedInUser.email) && !email.removeAt && !email.isDraft)
            break
        case 'sent':
            emails = emails.filter(email => (email.from === loggedInUser.email) && !email.removeAt && !email.isDraft)
            break
        case 'starred':
            emails = emails.filter(email => email.isStarred && !email.removeAt && !email.isDraft)
            break
        case 'trash':
            emails = emails.filter(email => email.removeAt)
            break
        case 'draft':
            emails = emails.filter(email => !email.sentAt && !email.removeAt)
            break
    }

    return emails
}


