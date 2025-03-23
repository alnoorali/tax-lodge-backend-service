const db = require('../db');
const dotenv = require('dotenv');
const RefundPolicy = require('../models/refund_policy');
const { WriteError } = require('./logsController');

dotenv.config();

const getRefundPolicy = async (req, res) => {
    try {
        // Use await with the promise-based API
        const [results] = await db.query('SELECT * FROM refund_policy');

        return res.status(200).json(results[0]);
    } catch (err) {
        console.error('Error in getRefundPolicy:', err);
        WriteError("refundPolicyController", "getRefundPolicy", "Error", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateRefundPolicy = async (req, res) => {
    const { content  
    } = req.body;

    try {
        RefundPolicy.id = 1,
        RefundPolicy.content = content,
        RefundPolicy.modifiedby = 1;
        RefundPolicy.modifiedon = new Date();

        // console.log("Refund Policy Object:", RefundPolicy);

        // Construct the SET clause dynamically
        const setClause = Object.keys(RefundPolicy)
            .map(key => `${key} = ?`)
            .join(', ');

        // Extract values from the Business Tax object
        const values = Object.values(RefundPolicy);
        values.push(RefundPolicy.id);

        // Construct the SQL query
        const query = `UPDATE refund_policy SET ${setClause} WHERE Id = ?`;
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
        console.error('Error in updateRefundPolicy:', err);
        WriteError("refundPolicyController", "updateRefundPolicy", "Error", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getRefundPolicy, updateRefundPolicy };