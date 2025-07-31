const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { check, validationResult } = require('express-validator');

const User = require('../../models/User'); // Assuming you have a User model defined


// @route   POST api/users
// @desc    Register a user
// @access  Public

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })

],
async(req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);

    const { name, email, password } = req.body;

    try {
        //see if user already exists in the database
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        //Get user gravatar
        const avatar = gravatar.url(email, {
            s: '200', // Size
            r: 'pg', // Rating
            d: 'mm' // Default image
        });

        user = new User({
            name,
            email,
            avatar,
            password
        });
        //Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

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