const PatientModel = require('../models/Patient');

const addPatient = async (request, h) => {
    const patient = new PatientModel(request.payload);
    return await patient.save()
                 .then((pat) => {
                     return pat;
                 })
                 .catch((error) => {
                     console.log(error);
                     return error._message;
                 })
}


const getPatient = async (request, h) => {
    const patientId = request.query.id;
    if(patientId) {
    return await PatientModel.findById(patientId).populate('insurance_policy.provider')
                 .then((patient) => {
                     return patient;
                 })
                 .catch((error) => {
                     return error._message;
                 })

    }
    return await PatientModel.find({}).populate('insurance_policy.provider')
                 .then((patients) => {
                     return patients;
                 })
                 .catch((error) => {
                     return error._message;
                 })
}


const editPatient = async (request, h) => {
    const patientId = request.payload.id;
    console.log(request.payload.id);
    if(patientId) {
        return await PatientModel.findByIdAndUpdate(
            patientId, request.payload, {new: true}
            ).then((patient)=>{
                return patient;
            }).catch((error)=>{
                return "Unable to Update Patient Information";
            });
    }
    else {
        return "No Patient Specified to Update";
    }
}

const removePatient = async (request, h) => {
    const patientId = request.query.id;
    console.log(patientId);
    if(patientId) {
        return await PatientModel.findByIdAndDelete(patientId)
            .then((patient)=>{
                return patient;
            })
            .catch((error)=>{
                return error;
            });
    }
    else {
        return "No Patient Specified to Delete";
    }
}


module.exports = {
    addPatient: addPatient,
    getPatient: getPatient,
    editPatient: editPatient,
    removePatient: removePatient
}
