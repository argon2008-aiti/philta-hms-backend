const Bill = require('../models/BillingsModel');
const Patient = require("../../patient_records/models/Patient");
const InsuranceClaim = require("../../insurance_providers/models/InsuranceClaim");

const addBill = async(request, h) => {
    console.log(request.payload);
    const bill = new Bill(request.payload);

    return await bill.save()
        .then((bill) => {
            return bill.populate('patient')
                .populate('authorized_by')
                .populate('payment_status.received_by')
                .execPopulate();
        }).catch((err) => {
            console.log(err);
            return err._message;
        });
}


const getBill = async(request, h) => {
    const billId = request.query.id;
    if (billId) {
        return await Bill.findById(billId)
            .then((bill) => {
                return bill.populate('patient')
                    .populate('authorized_by')
                    .populate('payment_status.received_by')
                    .execPopulate();
            })
            .catch((error) => {
                return error._message;
            })

    }
    return await Bill.find({}).sort({ createdAt: -1 })
        .populate('patient')
        .populate('authorized_by')
        .populate('payment_status.received_by')
        .then((bills) => {
            return bills;
        })
        .catch((error) => {
            return error._message;
        })
}


const editBill = async(request, h) => {
    const billId = request.payload.id;
    if (billId) {
        return await Bill.findByIdAndUpdate(
            billId, request.payload, { new: true }
        ).then((bill) => {
            if (bill.payment_status.paid) processInsuranceClaim(bill);
            return bill.populate('patient')
                .populate('authorized_by')
                .populate('payment_status.received_by')
                .execPopulate();
        }).catch((error) => {
            return error._message;
        });
    } else {
        return "No Provider Specified to Update";
    }
}


const removeBill = async(request, h) => {
    const billId = request.query.id;
    if (billId) {
        return await Bill.findByIdAndDelete(billId)
            .then((bill) => {
                return "Delete Successful";
            })
            .catch((error) => {
                return "Unable to Delete Patient";
            });
    } else {
        return "No Provider Specified to Delete";
    }
}

async function processInsuranceClaim(bill) {
    let claim = {};
    claim.patient = bill.patient;
    claim.bill = bill._id;
    let patient = await Patient.findById(bill.patient);
    claim.provider = patient.insurance_policy.provider;
    claim.bill_array = bill.bill_array.filter(bill => bill.covered_by_insurance == true);
    if (claim.provider && claim.bill_array.length != 0) {
        new InsuranceClaim(claim).save();
    }
    console.log(claim);
}


module.exports = {
    addBill: addBill,
    getBill: getBill,
    editBill: editBill,
    removeBill: removeBill
}