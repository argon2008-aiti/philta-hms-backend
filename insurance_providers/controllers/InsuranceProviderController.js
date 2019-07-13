const InsuranceProvider = require('../models/InsuranceProvider');

const addProvider = async (request, h) => {
    const provider = new InsuranceProvider(request.payload);
    return await provider.save()
                 .then((provider) => {
                     return provider.company_name + " saved";
                 })
                 .catch((error) => {
                     console.log(error);
                     return error._message;
                 })
}


const getProvider = async (request, h) => {
    const providerId = request.query.id;
    if(providerId) {
    return await InsuranceProvider.findById(providerId)
                 .then((provider) => {
                     return provider;
                 })
                 .catch((error) => {
                     return error._message;
                 })

    }
    return await InsuranceProvider.find({})
                 .then((providers) => {
                     return providers;
                 })
                 .catch((error) => {
                     return error._message;
                 })
}


const editProvider = async (request, h) => {
    const providerId = request.query.id;
    if(providerId) {
        return await InsuranceProvider.findOneAndUpdate(
            providerId, request.payload
            ).then((provider)=>{
                return "Update Successful";
            }).catch((error)=>{
                return "Unable to Update Provider Information";
            });
    }
    else {
        return "No Provider Specified to Update";
    }
}


const removeProvider = async (request, h) => {
    const providerId = request.query.id;
    if(providerId) {
        return await InsuranceProvider.findByIdAndDelete(providerId)
            .then((provider)=>{
                return "Delete Successful";
            })
            .catch((error)=>{
                return "Unable to Delete Patient";
            });
    }
    else {
        return "No Provider Specified to Delete";
    }
}


module.exports = {
    addProvider: addProvider,
    getProvider: getProvider,
    editProvider: editProvider,
    removeProvider: removeProvider
}