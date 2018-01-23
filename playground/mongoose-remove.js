const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

// Removes all if left emtpy
Todo.remove({
}).then((todos) => {
    console.log('todos', todos);
}, (err) => {
    console.log(err.message);
})

// Remove first todo
Todo.findOneAndRemove({
}).then((todo) => {
    console.log('Removed', todo);
}, (err) => {
    console.log(err.message);
});

Todo.findByIdAndRemove('5a66c55178a932074b454d90')
.then((todo) => {
    console.log(todo);
}, (err) => {
    console.log(err.message);
})
