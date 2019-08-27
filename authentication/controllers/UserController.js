const UserModel = require('../models/User');
const hashPassword = require('../utils/encryption').hashPassword;
const createToken = require('../utils/encryption').createToken;

const addUser =  async (request, h) => {

    // check if uniqueUser validator returned an error
    const errors = request.pre.uniqueValidator.errors
    if(errors.length>0) {
        const errorObject = {};
        errors.map((error)=>{
            errorObject[error] = request.payload[error] + " is already used";
        });   
        return h.response(errorObject).code(403);
    }

    // yeaa!! no error from uniqueUser validator :-) continue
    const newUser = new UserModel(request.payload);
    if(newUser.password) {
        await hashPassword(newUser.password)
                  .then((hash)=> {
                      newUser.password = hash;
                  })
                  .catch((error)=> {
                      console.log(error);
                  });
    }

    let output = {};
    await newUser.save()
           .then((user) => {
            // user has been saved successfully
               console.log(user);
               output.data = user;
           })
           .catch((err) => {
               // error whiles saving user
               console.log(err);
               output.error = err;
           })
    if(output.error) {
        return h.response(output.error.message).code(400)
    }
    return h.response(output.data.username + " is saved successfully!");
}

const loginUser = function(request, h) {
    console.log(request.pre.login);
    const error = request.pre.login.error;
    if(error) {
        return h.response("Error: "+error).code(403);
    }
    const responseObject = {}
    responseObject.token = createToken(request.pre.login.user);
    responseObject.user = request.pre.login.user;
    
    return h.response(responseObject);
}

const validateUser = async function(decoded, request) {
    const validationObject = {};
    await UserModel.find({username:decoded.username})
             .then((user) => {
                 validationObject.isValid=true;
             })
            .catch((error) => {
                 validationObject.isValid=false;
             });
    return validationObject;
}

const getUser = async function(request, h) {
    const userId = request.query.id;
    if(userId) {
        return await UserModel.findById(userId)
                    .select('-__v -password')
                    .then((user)=>{
                        return user;
                    })
                    .catch((error)=> {
                        return error;
                    });
    }
    
    return await UserModel.find({})
                .select('-__v -password')
                .then((users)=>{
                    return users;
                })
                .catch((error)=> {
                    return error;
                });
}

module.exports = {
    addUser: addUser,
    loginUser: loginUser,
    getUser: getUser,
    validate: validateUser
}
