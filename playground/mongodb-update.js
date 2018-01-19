const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to DB', err);
    }
    const db = client.db('TodoApp');

    // findOneAndUpdate
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5a625f286d1a8b5402ab7612')
    },{
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5a6255cc6e82fcc811d52090')
    },{
        $set: {
            name: 'Bree'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    client.close();
});
