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

// //POST - add new users to db
server.post('/api/users', (req, res) => {
      
    db.insert(req.body)
        .then(user => {
            if ((req.body.name < 1) || (req.body.bio < 1)) {
                res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
            } else {
            res.status(201).json(user);
            }
        })
        .catch(err => {
            console.log('Error adding user', err);
        })
})

//GET - see whole user list
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log('GET /user error', err)
            res.status(500).json({ errorMessage: 'The users information could not be retrieved.' })
        })
});

//GET- find individual user
server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
        .then(user => {
            if (!user){
                res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.' })
            } else {
                res.status(200).json(user);
            }
        })
});

//UPDATE - update user info
server.put('/api/users/:id', (req, res) => {
    db.update(req.params.id, req.body)
        .then(user => {
            if (!user) {
                res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.' })
            } else if ((req.body.name.length < 1) || (req.body.bio.length < 1)) {
                res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
            } else {
            res.status(200).json(user); 
            }
        })
        .catch(err => {
            console.log("error on UPDATE", err);
            res.status(500).json({ errorMessage: 'The user information could not be modified.' });
        });

});

//DELETE - delete a user
server.delete('/api/user/:id', (req, res) => {
    db.remove(req.params.id)
        .then(user => {
            if (!user) {res.status(404).send({ errorMessage: "The user with the specified ID does not exist." })
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            console.log('error DELETE', err);
            res.status(500).json({ errorMessage: 'The user could not be removed' });
        });
});

const port = 3000;
server.listen(3000, () => console.log(`Listening on port: ${port}`));