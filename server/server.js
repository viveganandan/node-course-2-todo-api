const {ObjectID} = require('mongodb');
const _ = require('lodash');
const express = require('express');
const bodyparser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express();
const port  = process.env.PORT || 3000;

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
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(400).send();
        }
        return res.send({todo});
    }, (err) => {
        return res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    // remove todo by id
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(400).send();
        }
        res.send({todo});
    }, (err) => {
        return res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    // Subset of things the user sent to us
    var body = _.pick(req.body, ['text', 'completed']);

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.complete = false;
        body.completedAt = null;
    }
    // Update by using mongodb operators
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(400).send();
        }
        return res.send({todo});
    }, (err) => {
        return res.status(400).send();
    });
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
