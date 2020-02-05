'use strict'
//import Hapi from 'hapi'
const Hapi = require('hapi');
const mongoose = require('mongoose');

const authRoutes = require('./authentication/controllers/routes');
const patientRoutes = require('./patient_records/controllers/routes');
const insuranceProviderRoutes = require('./insurance_providers/controllers/routes');
const queueRoutes = require('./consultations/controllers/routes');
const { secret } = require('./authentication/utils/encryption');
const { validate } = require('./authentication/controllers/UserController');


mongoose.connect('mongodb://localhost/philta', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('successfully connected to db');
});


const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const io = require('socket.io')(server.listener);

io.on('connection', function(socket) {

    console.log("connection received to socket io");
    socket.on('Patient Added to Queue', function(patient) {
        console.log("New See Doctor Request " + patient);
        socket.broadcast.emit('AddPatientToQueue', patient);
    });

    socket.on('Remove Patient From Queue', function(id) {
        console.log("Delete Queue Request -- " + id);
        socket.broadcast.emit('RemovePatientFromQueue', id);
    });

});


const init = async() => {
    await server.register(require('inert'));
    await server.register(require('hapi-auth-jwt2'));
    await server.register({
        plugin: require('hapi-cors'),
        options: {
            methods: ['POST, GET, DELETE, PUT']
        }
    });

    server.auth.strategy('jwt', 'jwt', {
        key: secret,
        validate: validate,
        verifyOptions: { algorithms: ['HS256'] }
    });

    server.auth.default('jwt');

    // so that default authentication scheme is applied
    // before routes are called.

    server.route(authRoutes);
    server.route(patientRoutes);
    server.route(insuranceProviderRoutes);
    server.route(queueRoutes);

    await server.start();
    console.log('Server running at: ' + server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})


init();