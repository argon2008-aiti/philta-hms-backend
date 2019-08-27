const mongoose = require('mongoose');
const User = require('./authentication/models/User');


mongoose.connect('mongodb://localhost/philta', {
    useNewUrlParser: true,
    useFindAndModify: false,
});

function validateNonNull(input, answers) {
    if(!input) {
        console.log(answers);
        return 'This input is required';
    }
    return true;
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('successfully connected to db');
    User.findOne({'admin':true}, (err, user)=> {
        if(user) {
            console.log("Admin already exists for this database!")
            process.exit(0);
        }

        else {
            const bcrypt = require('bcrypt');
            const inquirer = require('inquirer');
            const {hashPassword} = require('./authentication/utils/encryption')
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'username',
                    message: 'superuser username:',
                    validate: validateNonNull
                },

                {
                    type: 'input',
                    name: 'email',
                    message: 'email:',
                    validate: validateNonNull
                },

                {
                    type: 'password',
                    name: 'password',
                    message: 'password:',
                    mask: true,
                    validate: validateNonNull,
                    filter: hashPassword
                },

                {
                    type: 'password',
                    name: 'password_confirm',
                    message: 'confirm password:',
                    mask: true,
                    validate: validateNonNull,
                },

            ]).then(answers => {
                if(bcrypt.compareSync(
                    answers['password_confirm'],
                    answers['password']
                )) {
                    answers.admin = true;
                    answers.role = 'admin'
                    const user = new User(answers);
                    user.save()
                    .then(user => {
                        console.log('new superuser created');
                        process.exit(0);
                    })
                    .catch(error => {
                        console.log('unable to create new superuser');
                        process.exit(0);
                    })
                }
                else {
                    console.log('passwords do not match. Exiting...');
                    process.exit(0);
                }
            })
        }
    });
});

