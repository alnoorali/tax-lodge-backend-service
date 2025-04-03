const db = require('../db');
const dotenv = require('dotenv');
const ContactForm = require('../models/contact_form');
const { WriteError } = require('./logsController');

dotenv.config();

const getContactList = async (req, res) => {
    try {
        // Use await with the promise-based API
        const [results] = await db.query('SELECT * FROM contact_form ORDER BY submitted_on DESC');

        return res.status(200).json(results);
    } catch (err) {
        console.error('Error in getContactList:', err);
        WriteError("contactFormController", "getContactList", "Error", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const submitContactForm = async (req, res) => {
    const { first_name, last_name, email, phone, subject, message } = req.body;

    try {
        ContactForm.first_name = first_name,
        ContactForm.last_name = last_name,
        ContactForm.email = email,
        ContactForm.phone = phone,
        ContactForm.subject = subject,
        ContactForm.message = message,
        ContactForm.submitted_on = new Date();

        // console.log("Contact Form Object:", ContactForm);

        // Get the columns and values separately
        const columns = Object.keys(ContactForm).join(', ');
        const placeholders = Object.keys(ContactForm).map(() => '?').join(', ');
        const values = Object.values(ContactForm);

        // Construct the SQL query for INSERT
        const query = `INSERT INTO contact_form (${columns}) VALUES (${placeholders})`;

        // Execute the query
        const [results] = await db.execute(query, values);

        // Check if the record was inserted
        if (results.affectedRows === 0) {
            return res.status(500).json({ errorCode: "500", message: 'Failed to submit form' });
        }

        // Return success response
        return res.status(200).json({ 
            errorCode: "000", 
            message: 'Form submitted successfully',
            insertId: results.insertId
        });
    } catch (err) {
        console.error('Error in submitContactForm:', err);
        WriteError("contactFormController", "submitContactForm", "Error", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getContactList, submitContactForm };