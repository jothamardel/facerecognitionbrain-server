const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'jotham',
      password : 'topimpabutterfly',
      database : 'smartbrain'
    }
  });



const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    db.select('*').from('users').then(data => {
        res.json(data); 
    });
    
})

app.post('/signin', (req, res) => {
    const { email, password } = req.body

    db.select('email', 'hash').from('login')
    .where('email', '=', email )
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash)

        isValid
        ? db.select('*').from('users').where('email', '=', email)
            .then(user => {
                res.json(user[0])
            }).catch(err => res.status(400).json('unable to get user'))
        : res.status(400).json('Error Siging in'); 
    })
    .catch(error => res.status(400).json('Wrong Credentials'))

})

app.post('/register', )

app.put('/image', (req, res) => {
    const { id } = req.body;
    console.log(id)
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(error => res.status(400).json('unable to get entrie(s)'))
})




// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


app.listen(3000, () => {
    console.log("app is running on port 3000")
}) 


/*
/ --> this is working

/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user

*/