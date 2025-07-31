const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth'); // Assuming you have an auth middleware
const User = require('../../models/User'); // Assuming you have a User model defined
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const { check, validationResult } = require('express-validator');


// @route   GET api/auth
// @desc    Test route
// @access  Public

router.get('/', auth, async(req, res) =>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



// @route   POST api/auth
// @desc    Authenticate a user and get token
// @access  Public

router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()

],
async(req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);

    const { email, password } = req.body;

    try {
        //see if user already exists in the database
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        
        //Return jsonwebtoken   

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5 days' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        console.log(err);
        res.status(500).send('Server Error');
    }

    
});


module.exports = router;