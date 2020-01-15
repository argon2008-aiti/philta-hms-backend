const { addProvider, getProvider, editProvider, removeProvider } = require('./InsuranceProviderController');

module.exports = [{
        method: 'GET',
        path: '/upload/{file*}',
        options: {
            auth: false
        },
        handler: {
            directory: {
                path: 'uploaded_files'
            }
        }
    },
    {
        method: 'POST',
        path: '/provider',
        options: {
            payload: {
                output: "stream",
                allow: 'multipart/form-data',
                parse: true,
                maxBytes: 2 * 1000 * 1000
            },
        },
        handler: addProvider
    },

    {
        method: 'GET',
        path: '/provider',
        options: {},
        handler: getProvider
    },

    {
        method: 'PUT',
        path: '/provider',
        options: {},
        handler: editProvider
    },

    {
        method: 'DELETE',
        path: '/provider',
        options: {},
        handler: removeProvider
    },
]