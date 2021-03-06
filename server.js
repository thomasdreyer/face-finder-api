const express = require('express');

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
//const saltRounds = 10;

const register = require('./controllers/register');

const signin = require('./controllers/signin');

const profile = require('./controllers/profile');

const image = require('./controllers/image');

const cors = require('cors');

const knex = require('knex');
const db = knex({
  client: 'pg',
  connection: {
   connectionString: process.env.DATABASE_URL,
    ssl: true,
  }
});

// db.select('*').from('users').then((data) =>{
//
// })

const app = express();



app.use(bodyParser.json());
app.use(cors());



app.get('/', (req, res) => { res.send('it is working!')});
app.post('/signin', (req,res) =>{signin.handleSignin(req, res, bcrypt, db)});
app.post('/register', (req, res) =>{register.handleRegister(req, res, bcrypt, db)} );
app.get('/profile/:id', (req, res) =>{profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) =>{image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) =>{image.handleApiCall(req, res)})


const PORT = process.env.PORT;
app.listen(PORT, ()=>{ console.log(`app is running on port ${PORT}`)});
