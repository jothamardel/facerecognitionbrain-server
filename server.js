const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const morgan = require('morgan');

const register = require('./controllers/register')
const sigin = require('./controllers/signin')
const image = require('./controllers/image')
const users = require('./controllers/users')


const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    }
  });



const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {users.handleUsers(req, res, db) });
app.post('/signin', (req, res) => {sigin.handleSigin(req, res, db, bcrypt) });
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt) });
app.put('/image', (req, res) => {image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res) });


// let PORT = process.env.PORT
let PORT = 3000;

app.listen(PORT || 3000, () => {
    console.log(`app is running on port ${PORT}`)
});


/*
/ --> this is working

/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user

*/