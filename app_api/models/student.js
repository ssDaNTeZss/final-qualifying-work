let mongoose = require( 'mongoose' );

let studentSchema = new mongoose.Schema({
    pack: {type: String, required: true},
    fio: {type: String, required: true}
});

// компиляция модели
mongoose.model('student', studentSchema );