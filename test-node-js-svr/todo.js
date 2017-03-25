var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    created_at: Date
});

TodoSchema.pre('save', function(next) {
    var todo = this;
    var currentDate = new Date();
    
    // se created_at nao exister..
    if (!todo.created_at) {
        todo.created_at = currentDate;
    }
    next();
});

var Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;