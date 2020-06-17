const crypto = require('crypto');

function createSalt (){
    return crypto.randomBytes(16).toString('hex');
}

function createHash(pass, salt){
    return crypto.pbkdf2Sync(pass, salt, 1000, 64, 'sha512').toString('hex');
}

function checkPassword(password, user) {
    if (user == null) {
        return false
    } else {
        var hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, `sha512`).toString(`hex`);
        return hash === user.password;
    }
};

module.exports = {
    createSalt, createHash, checkPassword
}