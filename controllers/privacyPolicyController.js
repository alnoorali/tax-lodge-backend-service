const db = require('../db');
const dotenv = require('dotenv');
const PrivacyPolicy = require('../models/privacy_policy');
const { WriteError } = require('./logsController');

dotenv.config();

const getPrivacyPolicy = async (req, res) => {
    try {
        // Use await with the promise-based API
        const [results] = await db.query('SELECT * FROM privacy_policy');

        return res.status(200).json(results[0]);
    } catch (err) {
        console.error('Error in getPrivacyPolicy:', err);
        WriteError("privacyPolicyController", "getPrivacyPolicy", "Error", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updatePrivacyPolicy = async (req, res) => {
    const { content  
    } = req.body;

    try {
        PrivacyPolicy.id = 1,
        PrivacyPolicy.content = content,
        PrivacyPolicy.modifiedby = 1;
        PrivacyPolicy.modifiedon = new Date();

        // console.log("Privacy Policy Object:", PrivacyPolicy);

        // Construct the SET clause dynamically
        const setClause = Object.keys(PrivacyPolicy)
            .map(key => `${key} = ?`)
            .join(', ');

        // Extract values from the Business Tax object
        const values = Object.values(PrivacyPolicy);
        values.push(PrivacyPolicy.id);

        // Construct the SQL query
        const query = `UPDATE privacy_policy SET ${setClause} WHERE Id = ?`;
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
        console.error('Error in updatePrivacyPolicy:', err);
        WriteError("privacyPolicyController", "updatePrivacyPolicy", "Error", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getPrivacyPolicy, updatePrivacyPolicy };