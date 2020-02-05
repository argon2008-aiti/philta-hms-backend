const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSignSecret = 'ThisIsAStrongEnoughPassCode';

const hashPassword = function(password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(password, salt, (error, hash) => {
                if (error) reject(error);
                else {
                    resolve(hash);
                }
            });
        });
    });
}

const createToken = function(user) {
    const secret = jwtSignSecret;
    let scopes;
    // Check if the user object passed in
    // has admin set to true, and if so, set
    // scopes to admin
    if (user.admin) {
        scopes = 'admin';
    }
    // Sign the JWT
    return jwt.sign({ id: user._id, username: user.username, scope: scopes }, secret, { algorithm: 'HS256', expiresIn: "3d" });
}

module.exports = {
    hashPassword: hashPassword,
    createToken: createToken,
    secret: jwtSignSecret
}