const { addBill, getBill, editBill, removeBill } = require('./BillsController');

module.exports = [{
        method: 'POST',
        path: '/bill',
        options: {
            auth: {
                mode: "required",
            }
        },
        handler: addBill
    },

    {
        method: 'GET',
        path: '/bill',
        options: {

            auth: {
                mode: "required",
            }
        },
        handler: getBill
    },

    {
        method: 'PUT',
        path: '/bill',
        options: {

            auth: {
                mode: "required",
            }
        },
        handler: editBill
    },

    {
        method: 'DELETE',
        path: '/bill',
        options: {

            auth: {
                mode: "required",
            }
        },
        handler: removeBill
    },
]