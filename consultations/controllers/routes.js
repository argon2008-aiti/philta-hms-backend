const { addPatient, getPatient, editPatient, removePatient } = require('./PatientQueueController');
const { addReport, getReport, editReport, removeReport } = require('./MedicalReportController');
const { addDocument, getDocument } = require('./MedicalReportController');

module.exports = [{
        method: 'POST',
        path: '/queue',
        options: {
            auth: {
                mode: "required",
            }
        },
        handler: addPatient
    },

    {
        method: 'POST',
        path: '/report',
        options: {
            auth: {
                mode: "required",
            }
        },
        handler: addReport
    },

    {
        method: 'POST',
        path: '/document',
        options: {
            auth: {
                mode: "required",
            }
        },
        handler: addDocument
    },

    {
        method: 'GET',
        path: '/document',
        options: {
            auth: {
                mode: "required",
            }
        },
        handler: getDocument
    },

    {
        method: 'GET',
        path: '/queue',
        options: {
            auth: {
                mode: "required",
            }
        },
        handler: getPatient
    },

    {
        method: 'GET',
        path: '/report',
        options: {
            auth: {
                mode: "required",
            }
        },
        handler: getReport
    },

    {
        method: 'PUT',
        path: '/queue',
        options: {
            auth: {
                mode: "required",
            }
        },
        handler: editPatient
    },
    {
        method: 'PUT',
        path: '/report',
        options: {
            auth: {
                mode: "required",
            }
        },
        handler: editReport
    },

    {
        method: 'DELETE',
        path: '/queue',
        options: {
            auth: {
                mode: "required",
            }
        },
        handler: removePatient
    },
    {
        method: 'DELETE',
        path: '/report',
        options: {
            auth: {
                mode: "required",
            }
        },
        handler: removeReport
    }
]