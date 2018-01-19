const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to DB', err);
    }
    const db = client.db('TodoApp');

    // Find
    db.collection('Todos').find({
        _id: new ObjectID('5a6256ea6d1a8b5402ab74dd')
    }).toArray().then((docs) => {
        console.log(docs);
    }, (err) => {
        console.log('bad', err);
    });

    // Count todos in Todos collection
    db.collection('Todos').find({
    }).count().then((count) => {
        console.log(count);
    }, (err) => {
        console.log('bad', err);
    });

    db.collection('Users').find({
        name: 'Jane'
    }).toArray().then((docs) => {
        console.log(docs);
    }, (err) => {
        console.log('bad', err);
    });

    client.close();
});
