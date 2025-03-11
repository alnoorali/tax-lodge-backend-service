const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const login = async (req, res) => {
    const { email, password } = req.body;
    const salt = "$2b$10$hidpeu9pbw4H6fUCca9E6O";

    // Hash the password
    // const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // console.log('Salt:', salt);
    // console.log('Bcrypt Hash:', hashedPassword);

    try {
        // Check if user exists
        const [rows] = await db.query('SELECT id, email, username, logintype, isactive FROM users WHERE email = ? AND password = ?', [email, hashedPassword]);
        if (rows.length === 0) {
            return res.status(400).json({ errorCode: "001", message: 'Invalid User Id or Password' });
        }

        const user = rows[0];

        if (user.isactive == 0) {
            return res.status(400).json({ errorCode: "002", message: 'Acount In-Active' });
        }

        // Compare passwords
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //     return res.status(400).json({ errorCode: "002",message: 'Invalid User Id or Password' });
        // }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY
        });

        res.json({ errorCode: "000", token: token, data: user });
    } catch (err) {
        console.error(err);
        WriteError("authController", "login", "Login Account", error);
        res.status(500).json({ errorCode: "999", message: 'Server error' });
    }
};

module.exports = { login };