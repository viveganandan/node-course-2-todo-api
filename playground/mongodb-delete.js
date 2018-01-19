const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to DB', err);
    }
    const db = client.db('TodoApp');

    // deleteMany
    db.collection('Todos').deleteMany({
        text: 'Walk the dog'
    }).then((result) => {
        console.log(result.result);
    });
    // deleteOne
    db.collection('Todos').deleteOne({
        text: 'Sleep on time'
    }).then((result) => {
        console.log(result.result);
    });

    // findOneandDelete
    db.collection('Todos').findOneAndDelete({
        completed: false
    }).then((result) => {
        console.log(result);
    });

    client.close();
});
