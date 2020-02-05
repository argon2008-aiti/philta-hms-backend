const mongoose = require('mongoose');
const User = require('../models/User');


mongoose.connect('mongodb://localhost/philta', {
    useNewUrlParser: true,
    useFindAndModify: false,
});

function validateNonNull(input, answers) {
    if (!input) {
        console.log(answers);
        return 'This field is required';
    }
    return true;
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('successfully connected to db');
    const bcrypt = require('bcryptjs');
    const inquirer = require('inquirer');
    const { hashPassword } = require('./encryption')
    inquirer.prompt([{
            type: 'input',
            name: 'first_name',
            message: 'user first name:',
            validate: validateNonNull
        },
        {
            type: 'input',
            name: 'other_names',
            message: 'user other names:',
            validate: validateNonNull
        },
        {
            type: 'input',
            name: 'role',
            message: 'user role:',
            validate: validateNonNull
        },
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
        if (bcrypt.compareSync(
                answers['password_confirm'],
                answers['password']
            )) {
            const user = new User(answers);
            user.save()
                .then(user => {
                    console.log('new user created successfully!');
                    process.exit(0);
                })
                .catch(error => {
                    console.log('unable to create new superuser');
                    process.exit(0);
                })
        } else {
            console.log('passwords do not match. Exiting...');
            process.exit(0);
        }
    });

});