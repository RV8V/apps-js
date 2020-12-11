// SERVER>JS ++++++++++++++++++++++++++

'use strict'

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email), // email => users.find(({ email }) => email === email),
  id => users.find(user => user.id === id)
)

const users = [] // use db

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())

app.use(session({
  secret: process.env.SESSION_SECRET,// a key that we what to encrypt all of our information for us with
  resave: false, // it says -- should we resave our session variables if nothing has changed | in our case we do not resave it if nothing has changed
  saveUninitialized: false // means -- do you want to save an empty value in the session if there is no value | and we do not actually want to do that
}))


app.use(passport.initialize()) // we can set up a passport -- initialize is gonna set up some of the basics for us
app.use(passport.session()) // and since we want to store variables to be persisted across the entire session our user has --
                            //we want to use passport.session which is going to work with our app.use(session), up here
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const { email, name, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    users.push({ name, email, password: hashedPassword, id: Date.now().toString() })
    res.redirect('/login')
  } catch { res.redirect('/register') }
  console.log({ users })
})

app.post('/login', checkNotAuthenticated, passport.authenticate(/*we want to use local strategy*/'local',
 {/*pass list of options that we want to modify*/
   successRedirect: '/', // whare we wnat to go if there is a success -- just home page -- in our case
   failureRedirect: '/login', // for some reason if it is a faluire | redirect back to login
   failureFlash: true// want to show a message -- (flash message) which we can display to the user which is gonna be equal to our messages in here (passport-config) - string (9 or 12),
                     // depend on what error they get
    // now in order to display error message we need to go into our login.ejs --- we write if (...) ...
 }
 ))
// we do not need cb like (req, res) => ... because we gonna use just passport authentication middleware

app.delete('/logout', (req, res) => {
  req.logOut() // clear a session and log the user out
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return res.redirect('/')
  next()
}

app.listen(3000)


// SERVER>JS ++++++++++++++++++++++++++





// PASSPORT_CONFIG.JS &&&&&&&&&&&&&&&&

'use strict'

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const initializePassport = (passport, getUserByEmail, getUserById) => {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email)
    if (!user) return done(null, false, { message: `No user with that email: ${email}` })
    try {
      if (await bcrypt.compare(password, user.password)) return done(null, user)
      return done(null, false, { message: `Password incorrect: ${user.password}` })
    } catch(error) { return done(error) }
  }
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => done(null, getUserById(id)) )
}

module.exports = initializePassport

// PASSPORT_CONFIG.JS &&&&&&&&&&&&&&&&




// VIEWS

<h1>Register</h1>
<form action="/register" method="POST" >
  <div>
    <label for="name">Name</label>
    <input type="text" id="name" name="name" required>
  </div>
  <div>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required>
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" id="password" name="password" required>
  </div>
  <button type="submit">Register</button>
</form>
<a href="/login">Login</a>





<h1>Login</h1>
<% if (messages.error) { %>
  <%= messages.error %>
<% } %>
<form action="/login" method="POST">
  <div>
    <label for="email">Email</label>
    <input type="email" id="email" name="email"
    required>
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" id="password" name="password"
    required>
  </div>
  <button type="submit">Login</button>
</form>
<a href="/register">Register</a>





<h1>Hi <%= name %></h1>
<form action="/logout?_method=DELETE" method="POST">
  <button type="submit">Log out</button>
</form>

// VIEWS
