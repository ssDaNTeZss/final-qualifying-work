let mongoose = require('mongoose');

let configSchema = new mongoose.Schema({
    key: {type: String, required: true},
    value: {type: String, required: true}
});

// компиляция модели
mongoose.model('config', configSchema );
