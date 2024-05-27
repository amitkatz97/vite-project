export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    getRandomEmail,
    makeLorem,
    makeShortLorem
}

function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}

function getRandomEmail(){
        const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        let email = '';
    
        // Generate a random username of length between 5 and 10 characters
        const usernameLength = Math.floor(Math.random() * 6) + 5;
        for (let i = 0; i < usernameLength; i++) {
            email += letters.charAt(Math.floor(Math.random() * letters.length));
        }
    
        // Pick a random domain
        const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    
        // Construct the email address
        email += '@' + randomDomain;
    
        return email; 
}

function makeLorem(size = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color', 'of nature', 'tuned', 'to', 'a live channel', 'All', 'this happened', 'more or less', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)]
        if (size >= 1) txt += ' '
    }
    return txt
}

function makeShortLorem(size = 5){
    const words = ['I', "miss", "you", "why", "bills", "doctor", "reason", "Document", "Love", "Girls", "There is", "according to"]
    let subject =''
    while (size > 0) {
        size--
        subject += words[Math.floor(Math.random() * words.length)]
        if (size >= 1) subject += ' '
    }
    return subject
}