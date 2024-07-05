const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const userData = require('../Models/userModel');

// Function to create a new user
const createUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        // Example: Hashing password (you should include your bcrypt logic here)
        const hashedPassword = await bcrypt.hash(password, 10); // Hashing password

        // Create new userData instance
        const newUser = new userData({
            userName,
            email,
            password: hashedPassword
        });

        // Save userData instance
        await newUser.save();

        // Send registration confirmation email
        await sendRegistrationConfirmationEmail(email);

        res.json({
            message: 'User created successfully. Registration confirmation sent to your email.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user or send registration confirmation email.' });
    }
};

// Function to send registration confirmation email
async function sendRegistrationConfirmationEmail(email) {
    try {
        // Create a nodemailer transporter using Gmail and an app password
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'gopisiva724@gmail.com',
                pass: 'ceux fepn hntw vqdr' // Replace with your generated app password
            }
        });

        // Send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'gopisiva724@gmail.com',
            to: email,
            subject: 'Registration Confirmation',
            text: 'Hello,\n\nYou have successfully completed the registration process.\n\nThank you!',
            html: '<p>Hello,</p><p>You have successfully completed the registration process.</p><p>Thank you!</p>'
        });

        console.log('Registration confirmation email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending registration confirmation email:', error);
        throw new Error('Failed to send registration confirmation email');
    }
}

// Function to fetch user data by ID
const getUser = async (req, res) => {
    try {
        const objectId = req.params.id;
        const getUser = await userData.findById(objectId);
        res.json({
            data: getUser,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const updatePassword = async (req, res) => {
    const { id } = req.params;
    const { newPassword } = req.body;

    try {
        const user = await userData.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();

        res.json({ message: 'Password updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update password.' });
    }
};

module.exports = { createUser, getUser,updatePassword };
