const db = require('../db');
const dotenv = require('dotenv');
const BusinessTax = require('../models/business_tax');
const { WriteError } = require('./logsController');

dotenv.config();

const getBusinessTax = async (req, res) => {
    try {
        // Use await with the promise-based API
        const [results] = await db.query('SELECT * FROM business_tax');

        return res.status(200).json(results[0]);
    } catch (err) {
        console.error('Error in getBusinessTax:', err);
        WriteError("businessTaxController", "getBusinessTax", "Error", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateBusinessTax = async (req, res) => {
    const { heading_1, banner_content, content_section_1, content_section_2, content_section_3, content_section_4, 
        work_steps_heading_1, work_steps_content_1, work_steps_heading_2, work_steps_content_2, work_steps_heading_3, work_steps_content_3, 
        heading_2, content_2  
    } = req.body;

    try {
        BusinessTax.id = 1,
        BusinessTax.heading_1 = heading_1,
        BusinessTax.banner_content = banner_content,
        BusinessTax.content_section_1 = content_section_1,
        BusinessTax.content_section_2 = content_section_2,
        BusinessTax.content_section_3 = content_section_3,
        BusinessTax.content_section_4 = content_section_4,
        BusinessTax.work_steps_heading_1 = work_steps_heading_1,
        BusinessTax.work_steps_content_1 = work_steps_content_1,
        BusinessTax.work_steps_heading_2 = work_steps_heading_2,
        BusinessTax.work_steps_content_2 = work_steps_content_2,
        BusinessTax.work_steps_heading_3 = work_steps_heading_3,
        BusinessTax.work_steps_content_3 = work_steps_content_3,
        BusinessTax.heading_2 = heading_2,
        BusinessTax.content_2 = content_2,
        BusinessTax.modifiedby = 1;
        BusinessTax.modifiedon = new Date();

        // console.log("Business Tax Object:", BusinessTax);

        // Construct the SET clause dynamically
        const setClause = Object.keys(BusinessTax)
            .map(key => `${key} = ?`)
            .join(', ');

        // Extract values from the Business Tax object
        const values = Object.values(BusinessTax);
        values.push(BusinessTax.id); // Add the id for the WHERE clause

        // Construct the SQL query
        const query = `UPDATE business_tax SET ${setClause} WHERE Id = ?`;
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
        console.error('Error in updateBusinessTax:', err);
        WriteError("businessTaxController", "updateBusinessTax", "Error", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getBusinessTax, updateBusinessTax };