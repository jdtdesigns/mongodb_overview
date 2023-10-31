const router = require('express').Router();

const { User } = require('../models');
const { isLoggedIn, authenticate } = require('./helpers');

// Register
router.post('/register', isLoggedIn, async (req, res) => {
  try {
    const user = await User.create(req.body);

    // Authenticate/Log In User
    req.session.user_id = user._id;

    res.json(user);
  } catch (err) {

    const code = err.code;
    const errors = [];

    if (code === 11000) {
      return res.status(403).send({ message: 'That email address is already in use.' });
    }

    for (let prop in err.errors) {
      const txt = err.errors[prop].message;

      errors.push(txt);
    }

    res.status(403).send({
      message: 'Authentication Error',
      errors
    });
  }
});

router.post('/login', isLoggedIn, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // If they don't exist, we send back an error stating they must register
    if (!user) {
      return res.status(403).send({
        message: 'User with that email address does not exist.'
      });
    }

    // If user exists, we validate their password
    const pass_is_valid = await user.validatePass(password);

    if (!pass_is_valid) return res.status(401).send({
      message: 'Password is invalid'
    });

    // If all checks pass, we create a new session (req.session.user_id = user._id)
    req.session.user_id = user._id;

    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Is Authenticated
router.get('/authenticate', authenticate, (req, res) => {
  res.json(req.user);
});

// Log Out
router.get('/logout', (req, res) => {
  req.session.destroy();

  res.json({
    message: 'Logged out successfully!'
  });
});

module.exports = router;