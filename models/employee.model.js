const mongoose = require('mongoose');


var employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    year: {
        type: String
    },
    title: {
        type: String
    },
    place: {
        type: String
    },
    publisher: {
        type: String
    },
    volume: {
        type: String
    },
    issue: {
        type: String
    },
    pages: {
        type: String
    },
});
mongoose.model('Employee', employeeSchema);
