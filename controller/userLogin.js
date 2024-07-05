const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Login = require('../Models/loginModel'); // Adjust path as per your structure
const { v4: uuidv4 } = require('uuid');


// Generate a UUID and convert it to string for JWT secret key
const jwtSecret = uuidv4();

const login=('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await Login.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate password (example without pre-save hook)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    // Return the token
    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = login;
