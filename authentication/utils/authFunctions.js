const UserModel = require('../models/User');
const bcrypt = require('bcrypt');

const verifyUniqueUser = async function(request, h) {
    let existingFields = [];
    await UserModel.findOne({username:
        request.payload.username})
               .then((user) => {
                   if(user) {
                      existingFields.push('username');
                 }
             });

    // check if the provided email is used
    await UserModel.findOne({email:
        request.payload.email})
               .then((user) => {
                   if(user) {
                      existingFields.push('email');
                    }
              });
        const validatorObject = {};
        validatorObject.errors = existingFields;
        return validatorObject;
}

const verifyCredentials = async function(request, h) {
    const password = request.payload.password;

  // Find an entry from the database that
  // matches either the email or username
  let validatorObject ={};
  await UserModel.findOne({username: request.payload.username})
           .then(async (user) => {
                console.log(user);
                let valid = false;
                await bcrypt.compare(password, user.password)   
                      .then((isValid) => {
                          valid = isValid;
                      });
                validatorObject.error = valid? null : "Incorrect password";
                validatorObject.user = user;
            })
            .catch((error) => {
                console.log("incorrect username");
                validatorObject.error = "Incorrect username";
            });
    return validatorObject;
}

module.exports = {
    verifyUniqueUser: verifyUniqueUser,
    verifyCredentials: verifyCredentials
}
