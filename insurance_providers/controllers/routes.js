const {addProvider, getProvider, editProvider, removeProvider} = require('./InsuranceProviderController');

module.exports = [
    {
        method: 'POST',
        path: '/provider',
        options: {
        },
        handler: addProvider
    },

    {
        method: 'GET',
        path: '/provider',
        options: {
        },
        handler: getProvider
    },

    {
        method: 'PUT',
        path: '/provider',
        options: {
        },
        handler:  editProvider
    },

    {
        method: 'DELETE',
        path: '/provider',
        options: {
        },
        handler: removeProvider
    },
]
