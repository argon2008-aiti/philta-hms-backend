const {addPatient, getPatient, editPatient, removePatient} = require('./PatientController');

module.exports = [
    {
        method: 'POST',
        path: '/patient',
        options: {
            auth: {
                mode: "required",
            }
        },
        handler: addPatient
    },

    {
        method: 'GET',
        path: '/patient',
        options: {
            auth: {
                mode: "required",
            }
        },
        handler: getPatient
    },

    {
        method: 'PUT',
        path: '/patient',
        options: {
            auth: {
                mode: "required",
            }
        },
        handler:  editPatient
    },

    {
        method: 'DELETE',
        path: '/patient',
        options: {
            auth: {
                mode: "required",
            }
        },
        handler: removePatient
    },
]