const express = require('express');
const bodyparser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express();
app.use(bodyparser.json());

// Creating a new todo
app.post('/todos', (req, res) => {
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        console.log(doc);
        res.send(doc);
    }, (err) => {
        console.log( JSON.stringify(err, undefined, 2));
        res.status(400).send(err);
    });
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});
