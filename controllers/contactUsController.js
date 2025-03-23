const db = require('../db');
const dotenv = require('dotenv');
const ContactUs = require('../models/contact_us');
const { WriteError } = require('./logsController');

dotenv.config();

const getContactUs = async (req, res) => {
    try {
        // Use await with the promise-based API
        const [results] = await db.query('SELECT * FROM contact_us');

        return res.status(200).json(results[0]);
    } catch (err) {
        console.error('Error in getContactUs:', err);
        WriteError("aboutUsController", "getContactUs", "Error", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateContactUs = async (req, res) => {
    const { heading_1, content_1, contact_1, contact_2, location_1, location_2, 
        email_1, email_2 
    } = req.body;

    try {
        ContactUs.id = 1,
        ContactUs.heading_1 = heading_1,
        ContactUs.content_1 = content_1,
        ContactUs.contact_1 = contact_1,
        ContactUs.contact_2 = contact_2,
        ContactUs.location_1 = location_1,
        ContactUs.location_2 = location_2,
        ContactUs.email_1 = email_1,
        ContactUs.email_2 = email_2,
        ContactUs.modifiedby = 1;
        ContactUs.modifiedon = new Date();

        // console.log("Contact Us Object:", ContactUs);

        // Construct the SET clause dynamically
        const setClause = Object.keys(ContactUs)
            .map(key => `${key} = ?`)
            .join(', ');

        // Extract values from the Business Tax object
        const values = Object.values(ContactUs);
        values.push(ContactUs.id);

        // Construct the SQL query
        const query = `UPDATE contact_us SET ${setClause} WHERE Id = ?`;
        // console.log("Query:", query);
        // console.log("Values:", values);

        // Execute the query
        const [results] = await db.execute(query, values);

        // Check if the record was updated
        if (results.affectedRows === 0) {
            return res.status(404).json({ errorCode: "404", message: 'Record not found' });
        }

        // Return success response
        return res.status(200).json({ errorCode: "000", message: 'Record updated successfully' });
    } catch (err) {
        console.error('Error in updateContactUs:', err);
        WriteError("aboutUsController", "updateContactUs", "Error", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getContactUs, updateContactUs };