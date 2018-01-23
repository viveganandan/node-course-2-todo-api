const {ObjectID} = require('mongodb');
const express = require('express');
const bodyparser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express();
app.use(bodyparser.json());

// Creating a new todo
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

// Get all todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send();
    }
    Todo.findById(req.params.id).then((todo) => {
        res.send({todo});
    }, (err) => {
        return res.status(400).send();
    })
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});
