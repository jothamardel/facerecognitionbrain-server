const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const sigin = require('./controllers/signin')
const image = require('./controllers/image')


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

app.post('/signin', (req, res) => {sigin.handleSigin(req, res, db, bcrypt) })

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt) })

app.put('/image', (req, res) => {image.handleImage(req, res, db) })




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