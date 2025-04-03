const db = require('../db');
const dotenv = require('dotenv');
const Home = require('../models/home');
const { WriteError } = require('./logsController');

dotenv.config();

const getHome = async (req, res) => {
    try {
        // Use await with the promise-based API
        const [results] = await db.query('SELECT * FROM home');

        return res.status(200).json(results[0]);
    } catch (err) {
        console.error('Error in getHome:', err);
        WriteError("homeController", "getHome", "Error", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateHome = async (req, res) => {
    const { banner_tagline, banner_heading, banner_content, about_main_heading, about_main_heading_content, 
        about_sub_heading, about_sub_heading_content, work_steps_heading_1, work_steps_content_1, work_steps_heading_2, 
        work_steps_content_2, work_steps_heading_3, work_steps_content_3, why_choose_heading, why_choose_box_heading_1, 
        why_choose_box_content_1, why_choose_box_heading_2, why_choose_box_content_2, why_choose_box_heading_3, why_choose_box_content_3, 
        why_choose_box_heading_4, why_choose_box_content_4, why_choose_box_heading_5, why_choose_box_content_5, 
        why_choose_box_heading_6, why_choose_box_content_6, why_choose_box_heading_7, why_choose_box_content_7, 
        why_choose_box_heading_8, why_choose_box_content_8 
    } = req.body;

    try {
        Home.id = 1,
        Home.banner_tagline = banner_tagline;
        Home.banner_heading = banner_heading;
        Home.banner_content = banner_content;
        Home.about_main_heading = about_main_heading;
        Home.about_main_heading_content = about_main_heading_content;
        Home.about_sub_heading = about_sub_heading;
        Home.about_sub_heading_content = about_sub_heading_content;
        Home.work_steps_heading_1 = work_steps_heading_1;
        Home.work_steps_content_1 = work_steps_content_1;
        Home.work_steps_heading_2 = work_steps_heading_2;
        Home.work_steps_content_2 = work_steps_content_2;
        Home.work_steps_heading_3 = work_steps_heading_3;
        Home.work_steps_content_3 = work_steps_content_3;
        Home.why_choose_heading = why_choose_heading;
        Home.why_choose_box_heading_1 = why_choose_box_heading_1;
        Home.why_choose_box_content_1 = why_choose_box_content_1;
        Home.why_choose_box_heading_2 = why_choose_box_heading_2;
        Home.why_choose_box_content_2 = why_choose_box_content_2;
        Home.why_choose_box_heading_3 = why_choose_box_heading_3;
        Home.why_choose_box_content_3 = why_choose_box_content_3;
        Home.why_choose_box_heading_4 = why_choose_box_heading_4;
        Home.why_choose_box_content_4 = why_choose_box_content_4;
        Home.why_choose_box_heading_5 = why_choose_box_heading_5;
        Home.why_choose_box_content_5 = why_choose_box_content_5;
        Home.why_choose_box_heading_6 = why_choose_box_heading_6;
        Home.why_choose_box_content_6 = why_choose_box_content_6;
        Home.why_choose_box_heading_7 = why_choose_box_heading_7;
        Home.why_choose_box_content_7 = why_choose_box_content_7;
        Home.why_choose_box_heading_8 = why_choose_box_heading_8;
        Home.why_choose_box_content_8 = why_choose_box_content_8;
        Home.modifiedby = 1;
        Home.modifiedon = new Date();

        // console.log("Home Object:", Home);

        // Construct the SET clause dynamically
        const setClause = Object.keys(Home)
            .map(key => `${key} = ?`)
            .join(', ');

        // Extract values from the Customer object
        const values = Object.values(Home);
        values.push(Home.id); // Add the id for the WHERE clause

        // console.log("Values Array:", values);

        // Construct the SQL query
        const query = `UPDATE home SET ${setClause} WHERE Id = ?`;
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
        console.error('Error in updateHome:', err);
        WriteError("homeController", "updateHome", "Error", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getHome, updateHome };