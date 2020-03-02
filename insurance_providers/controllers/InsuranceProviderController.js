const InsuranceProvider = require('../models/InsuranceProvider');
const InsuranceClaim = require('../models/InsuranceClaim');
const fs = require('fs-path');

const addProvider = async(request, h) => {
    console.log(request.payload);
    const provider = new InsuranceProvider(request.payload);
    const filename = request.payload.logo.hapi.filename;
    const data = request.payload.logo._data;
    const file_path = "./uploaded_files/" + filename;

    provider.logo_url = filename;

    await fs.writeFile(file_path, data, (err) => {
        if (err) throw err;

        return provider.save()
            .then((provider) => {
                return provider.company_name + " saved";
            })
            .catch((error) => {
                console.log(error);
                return error._message;
            })

    });

    return provider;


}

const getClaim = async(request, h) => {
    const claimId = request.query.id;
    if (claimId) {
        return await InsuranceClaim.findById(claimId)
            .then((claim) => {
                return claim.populate('patient')
                    .populate('provider')
                    .populate('bill')
                    .execPopulate()
            })
            .catch((error) => {
                return error._message;
            })

    }
    return await InsuranceClaim.find({}).sort({ created_at: -1 })
        .populate('patient')
        .populate('provider')
        .populate('bill')
        .then((claims) => {
            return claims;
        })
        .catch((error) => {
            return error._message;
        })
}


const getProvider = async(request, h) => {
    const providerId = request.query.id;
    if (providerId) {
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

const editClaim = async(request, h) => {
    const claimId = request.query.id;
    if (claimId) {
        return await InsuranceClaim.findOneAndUpdate(
            claimId, request.payload
        ).then((claim) => {
            return "Update Successful";
        }).catch((error) => {
            return "Unable to Update Provider Information";
        });
    } else {
        return "No Provider Specified to Update";
    }
}


const editProvider = async(request, h) => {
    const providerId = request.query.id;
    if (providerId) {
        return await InsuranceProvider.findOneAndUpdate(
            providerId, request.payload
        ).then((provider) => {
            return "Update Successful";
        }).catch((error) => {
            return "Unable to Update Provider Information";
        });
    } else {
        return "No Provider Specified to Update";
    }
}


const removeProvider = async(request, h) => {
    const providerId = request.query.id;
    if (providerId) {
        return await InsuranceProvider.findByIdAndDelete(providerId)
            .then((provider) => {
                return "Delete Successful";
            })
            .catch((error) => {
                return "Unable to Delete Patient";
            });
    } else {
        return "No Provider Specified to Delete";
    }
}


module.exports = {
    addProvider: addProvider,
    getProvider: getProvider,
    editProvider: editProvider,
    removeProvider: removeProvider,
    getClaim: getClaim,
    editClaim: editClaim,
}