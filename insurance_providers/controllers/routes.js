const {
    addProvider,
    getProvider,
    editProvider,
    removeProvider,
    getClaim,
    editClaim,
} = require('./InsuranceProviderController');

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
            auth: {
                mode: "required",
            }
        },
        handler: addProvider
    },

    {
        method: 'GET',
        path: '/provider',
        options: {

            auth: {
                mode: "required",
            }
        },
        handler: getProvider
    },

    {
        method: 'GET',
        path: '/claim',
        options: {

            auth: {
                mode: "required",
            }
        },
        handler: getClaim
    },

    {
        method: 'PUT',
        path: '/provider',
        options: {

            auth: {
                mode: "required",
            }
        },
        handler: editProvider
    },

    {
        method: 'PUT',
        path: '/claim',
        options: {

            auth: {
                mode: "required",
            }
        },
        handler: editClaim
    },

    {
        method: 'DELETE',
        path: '/provider',
        options: {

            auth: {
                mode: "required",
            }
        },
        handler: removeProvider
    },
]