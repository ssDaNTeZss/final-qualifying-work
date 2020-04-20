let mongoose = require( 'mongoose' );

let absenteeismSchema = new mongoose.Schema({
    pack: {type: String, required: true},
    dateSkip: {type: Date, required: true},
    fio: {type: String, required: true},
    skipTime: {type: String, required: true}
});

// компиляция модели
mongoose.model('absenteeism', absenteeismSchema );