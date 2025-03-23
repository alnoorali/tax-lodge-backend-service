const db = require('../db');
const dotenv = require('dotenv');
const AboutUs = require('../models/about_us');
const { WriteError } = require('./logsController');

dotenv.config();

const getAboutUs = async (req, res) => {
    try {
        // Use await with the promise-based API
        const [results] = await db.query('SELECT * FROM about_us');

        return res.status(200).json(results[0]);
    } catch (err) {
        console.error('Error in getAboutUs:', err);
        WriteError("aboutUsController", "getAboutUs", "Error", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateAboutUs = async (req, res) => {
    const { main_heading, content_1, content_2, content_3, content_4, contact_designation, 
        contact_info
    } = req.body;

    try {
        AboutUs.id = 1,
        AboutUs.main_heading = main_heading,
        AboutUs.content_1 = content_1,
        AboutUs.content_2 = content_2,
        AboutUs.content_3 = content_3,
        AboutUs.content_4 = content_4,
        AboutUs.contact_designation = contact_designation,
        AboutUs.contact_info = contact_info,
        AboutUs.modifiedby = 1;
        AboutUs.modifiedon = new Date();

        // console.log("About Us Object:", AboutUs);

        // Construct the SET clause dynamically
        const setClause = Object.keys(AboutUs)
            .map(key => `${key} = ?`)
            .join(', ');

        // Extract values from the Business Tax object
        const values = Object.values(AboutUs);
        values.push(AboutUs.id);

        // Construct the SQL query
        const query = `UPDATE about_us SET ${setClause} WHERE Id = ?`;
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
        console.error('Error in updateAboutUs:', err);
        WriteError("aboutUsController", "updateAboutUs", "Error", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAboutUs, updateAboutUs };