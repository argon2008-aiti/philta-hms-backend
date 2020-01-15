const MedicalReportModel = require('../models/MedicalReportModel');
const DiagnosticDocumentModel = require('../models/DiagnosticDocumentModel');
const fs = require('fs');

const addReport = async(request, h) => {
    console.log(request.payload);
    const report = new MedicalReportModel(request.payload);
    return await report.save()
        .then((report) => {
            return report;
        })
        .catch((error) => {
            console.log(error);
            return error._message;
        })
}

const addDocument = async(request, h) => {
    console.log(request.payload);
    const filename = request.payload.path;
    const data = request.payload.file;
    const file_path = "./uploaded_files/" + filename;

    const diagnostics = new DiagnosticDocumentModel(request.payload);

    let report = null;

    await fs.writeFile(file_path, data, (err) => {
        if (err) throw err;

        diagnostics.save()
            .then((rep) => {
                report = rep._id;
            })
            .catch((error) => {
                console.log(error);
                error._message;
            })
    });

    return diagnostics;
}


const getReport = async(request, h) => {
    const reportId = request.query.id;
    if (reportId) {
        return await MedicalReportModel.findById(reportId).populate('patient')
            .then((rep) => {
                return rep;
            })
            .catch((error) => {
                return error._message;
            })

    }
    return await MedicalReportModel.find({}).populate('patient')
        .then((reports) => {
            return reports;
        })
        .catch((error) => {
            return error._message;
        })
}


const editReport = async(request, h) => {
    const patientId = request.payload.id;
    console.log(request.payload.id);
    if (patientId) {
        return await PatientQueueModel.findByIdAndUpdate(
                patientId, request.payload, { new: true }
            )
            .then((patient) => {
                return patient;
            }).catch((error) => {
                return "Unable to Update Patient Information";
            });
    } else {
        return "No Patient Specified to Update";
    }
}

const removeReport = async(request, h) => {
    const patientId = request.query.id;
    console.log(patientId);
    if (patientId) {
        return await PatientQueueModel.findByIdAndDelete(patientId)
            .then((patient) => {
                return patient;
            })
            .catch((error) => {
                return error;
            });
    } else {
        return "No Patient Specified to Delete";
    }
}


module.exports = {
    addReport: addReport,
    getReport: getReport,
    editReport: editReport,
    removeReport: removeReport,

    addDocument: addDocument
}