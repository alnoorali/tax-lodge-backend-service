const db = require('../db');
const dotenv = require('dotenv');
const Service = require('../models/service');
const { WriteError } = require('./logsController');

dotenv.config();

const getService = async (req, res) => {
    try {
        // Use await with the promise-based API
        const [results] = await db.query('SELECT * FROM services');

        return res.status(200).json(results[0]);
    } catch (err) {
        console.error('Error in getService:', err);
        WriteError("serviceController", "getService", "Error", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateService = async (req, res) => {
    const { main_image, main_heading, main_heading_content, service_box_heading_1, service_box_content_1, service_box_heading_2, 
        service_box_content_2, service_box_heading_3, service_box_content_3, service_box_heading_4, service_box_content_4, 
        main_heading_2, main_heading_content_2, main_heading_3, main_heading_content_3, main_heading_3_image, 
        main_heading_3_point_1, main_heading_3_point_2, main_heading_3_point_3, main_heading_3_point_4, main_heading_4, 
        main_heading_content_4  
    } = req.body;

    try {
        Service.id = 1,
        Service.main_image = main_image,
        Service.main_heading = main_heading,
        Service.main_heading_content = main_heading_content,
        Service.service_box_heading_1 = service_box_heading_1,
        Service.service_box_content_1 = service_box_content_1,
        Service.service_box_heading_2 = service_box_heading_2,
        Service.service_box_content_2 = service_box_content_2,
        Service.service_box_heading_3 = service_box_heading_3,
        Service.service_box_content_3 = service_box_content_3,
        Service.service_box_heading_4 = service_box_heading_4,
        Service.service_box_content_4 = service_box_content_4,
        Service.main_heading_2 = main_heading_2,
        Service.main_heading_content_2 = main_heading_content_2,
        Service.main_heading_3 = main_heading_3,
        Service.main_heading_content_3 = main_heading_content_3,
        Service.main_heading_3_image = main_heading_3_image,
        Service.main_heading_3_point_1 = main_heading_3_point_1,
        Service.main_heading_3_point_2 = main_heading_3_point_2,
        Service.main_heading_3_point_3 = main_heading_3_point_3,
        Service.main_heading_3_point_4 = main_heading_3_point_4,
        Service.main_heading_4 = main_heading_4,
        Service.main_heading_content_4 = main_heading_content_4,
        Service.modifiedby = 1;
        Service.modifiedon = new Date();

        // console.log("Service Object:", Service);

        // Construct the SET clause dynamically
        const setClause = Object.keys(Service)
            .map(key => `${key} = ?`)
            .join(', ');

        // Extract values from the Customer object
        const values = Object.values(Service);
        values.push(Service.id); // Add the id for the WHERE clause

        // Construct the SQL query
        const query = `UPDATE services SET ${setClause} WHERE Id = ?`;
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
        console.error('Error in updateService:', err);
        WriteError("serviceController", "updateService", "Error", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getService, updateService };