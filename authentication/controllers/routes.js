const {addUser, loginUser, getUser} = require('./UserController');
const {verifyUniqueUser, verifyCredentials} = require('../utils/authFunctions');

module.exports = [
    {
        method: 'POST',
        path: '/auth/login',
        options: {
            pre: [
                {method: verifyCredentials, assign: 'login'}
            ],
            auth: false
        },
        handler: loginUser
    },

    {
        method: 'GET',
        path: '/auth/logout',
        options: {
            pre: [
                {method: verifyCredentials, assign: 'logout'}
            ],
            auth: false
        },
        handler: loginUser
    },

    {
        method: 'POST',
        path: '/auth',
        options: {
            pre: [
                {method: verifyUniqueUser, assign: 'uniqueValidator'}
            ],
        },
        handler:  addUser
    },

    {
        method: 'GET',
        path: '/auth',
        options: {
        },
        handler: getUser
    },
]