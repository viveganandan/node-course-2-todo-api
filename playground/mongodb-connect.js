const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to DB', err);
    }
    const db = client.db('TodoApp');
    // Insert new doc into Users: name, age, location
    db.collection('Users').insertOne({
        name: 'Jane Doe',
        age: 35,
        location: '444 Singley Dr. Milpitas, CA 95035'
    }, (error, result) => {
        if (error) {
            return console.log('Unable to enter add document to Users', error);
        }
        console.log(result.ops);
    });
    client.close();
});

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to DB', err);
    }
    const db = client.db('TodoApp');
    // Insert new doc into Todos: text, completed
    db.collection('Todos').insertOne({
        text: 'Walk the dog',
        completed: false,
    }, (error, result) => {
        if (error) {
            return console.log('Unable to enter add document to Users', error);
        }
        console.log(result.ops);
    });
    client.close();
});
