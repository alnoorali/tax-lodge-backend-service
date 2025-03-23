const db = require('../db');
const dotenv = require('dotenv');
const TermsConditions = require('../models/terms_conditions');
const { WriteError } = require('./logsController');

dotenv.config();

const getTermsConditions = async (req, res) => {
    try {
        // Use await with the promise-based API
        const [results] = await db.query('SELECT * FROM terms_conditions');

        return res.status(200).json(results[0]);
    } catch (err) {
        console.error('Error in getTermsConditions:', err);
        WriteError("termsConditionsController", "getTermsConditions", "Error", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateTermsConditions = async (req, res) => {
    const { content  
    } = req.body;

    try {
        TermsConditions.id = 1,
        TermsConditions.content = content,
        TermsConditions.modifiedby = 1;
        TermsConditions.modifiedon = new Date();

        // console.log("Terms Conditions Object:", TermsConditions);

        // Construct the SET clause dynamically
        const setClause = Object.keys(TermsConditions)
            .map(key => `${key} = ?`)
            .join(', ');

        // Extract values from the Business Tax object
        const values = Object.values(TermsConditions);
        values.push(TermsConditions.id);

        // Construct the SQL query
        const query = `UPDATE terms_conditions SET ${setClause} WHERE Id = ?`;
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
        console.error('Error in updateTermsConditions:', err);
        WriteError("termsConditionsController", "updateTermsConditions", "Error", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getTermsConditions, updateTermsConditions };