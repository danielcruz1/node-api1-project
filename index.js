// implement your API here
const express = require('express');
const db = require('./data/db');
const server = express();

server.use(express.json());

//Test connection
server.get('/', (req, res) => {
    res.send('CONNECTED!')
})

//MVP Required endpoints

//GET - see whole user list
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users)
        })
    .catch(err => {
        console.log('GET /user error')
        res.status(500).json({ errorMessage: 'User information could not be retrieved.'})
    })
});

//GET- find individual user
server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
        .then(user => {
            if (!user){
                res.status(404).json('User ID does not exist.')
            } else {
                res.status(200).json(user);
            }
        })
});

//POST - add new users to db
server.post('/api/users', (req, res) => {
    db.insert(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            console.log('Error adding user', err);
            res.status(400).json("Name and Bio required.")
        })
})





const port = 3000;
server.listen(3000, () => console.log(`Listening on port: ${port}`));