const db = require('../db');
const dotenv = require('dotenv');
const OnlineTaxReturn = require('../models/online_tax_return');
const { WriteError } = require('./logsController');

dotenv.config();

const getOnlineTaxReturn = async (req, res) => {
    try {
        // Use await with the promise-based API
        const [results] = await db.query('SELECT * FROM online_tax_return');

        return res.status(200).json(results[0]);
    } catch (err) {
        console.error('Error in getOnlineTaxReturn:', err);
        WriteError("onlineTaxReturnController", "getOnlineTaxReturn", "Error", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateOnlineTaxReturn = async (req, res) => {
    const { heading_1, banner_content, heading_2, content_2, work_steps_heading_1, work_steps_content_1, 
        work_steps_heading_2, work_steps_content_2, work_steps_heading_3, work_steps_content_3, 
        heading_3, content_3  
    } = req.body;

    try {
        OnlineTaxReturn.id = 1,
        OnlineTaxReturn.heading_1 = heading_1,
        OnlineTaxReturn.banner_content = banner_content,
        OnlineTaxReturn.heading_2 = heading_2,
        OnlineTaxReturn.content_2 = content_2,
        OnlineTaxReturn.work_steps_heading_1 = work_steps_heading_1,
        OnlineTaxReturn.work_steps_content_1 = work_steps_content_1,
        OnlineTaxReturn.work_steps_heading_2 = work_steps_heading_2,
        OnlineTaxReturn.work_steps_content_2 = work_steps_content_2,
        OnlineTaxReturn.work_steps_heading_3 = work_steps_heading_3,
        OnlineTaxReturn.work_steps_content_3 = work_steps_content_3,
        OnlineTaxReturn.heading_3 = heading_3,
        OnlineTaxReturn.content_3 = content_3,
        OnlineTaxReturn.modifiedby = 1;
        OnlineTaxReturn.modifiedon = new Date();

        // console.log("Online Tax Return Object:", OnlineTaxReturn);

        // Construct the SET clause dynamically
        const setClause = Object.keys(OnlineTaxReturn)
            .map(key => `${key} = ?`)
            .join(', ');

        // Extract values from the Business Tax object
        const values = Object.values(OnlineTaxReturn);
        values.push(OnlineTaxReturn.id); // Add the id for the WHERE clause

        // Construct the SQL query
        const query = `UPDATE online_tax_return SET ${setClause} WHERE Id = ?`;
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
        console.error('Error in updateOnlineTaxReturn:', err);
        WriteError("onlineTaxReturnController", "updateOnlineTaxReturn", "Error", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getOnlineTaxReturn, updateOnlineTaxReturn };