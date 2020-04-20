let mongoose = require( 'mongoose' );

let packSchema = new mongoose.Schema({
    name: {type: String, required: true}
});

// компиляция модели
mongoose.model('pack', packSchema );