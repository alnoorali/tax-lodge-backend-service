const db = require('../db');
const dotenv = require('dotenv');
const Customer = require('../models/customer');
const { WriteError } = require('./logsController');

dotenv.config();

const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;

        // Use await with the promise-based API
        const [results] = await db.query('SELECT * FROM customers WHERE Id = ?', [id]);

        if (!results || results.length === 0) {
            let message = "No data found";
            WriteError("customerController", "getCustomerById", "No Data Found", message);
            return res.status(404).json({ error: message });
        }

        return res.status(200).json(results[0]);
    } catch (err) {
        console.error('Error in getCustomerById:', err);
        WriteError("customerController", "getCustomerById", "Error", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateCustomer = async (req, res) => {
    const { id, name, email, phone, address, loginid } = req.body;

    try {
        Customer.Id = id;
        Customer.Name = name;
        Customer.Email = email;
        Customer.Phone = phone;
        Customer.Address = address;
        Customer.ModifiedBy = loginid;
        Customer.ModifiedOn = new Date();

        console.log("Customer:", Customer);

        // Construct the SET clause dynamically
        const setClause = Object.keys(Customer)
            .map(key => `${key} = ?`)
            .join(', ');

        // Extract values from the Customer object
        const values = Object.values(Customer);
        values.push(id); // Add the id for the WHERE clause

        // Construct the SQL query
        const query = `UPDATE customers SET ${setClause} WHERE Id = ?`;
        console.log("Query:", query);
        console.log("Values:", values);

        // Execute the query
        const [results] = await db.execute(query, values);
        console.log("Update Results:", results);

        // Check if the record was updated
        if (results.affectedRows === 0) {
            return res.status(404).json({ errorCode: "404", message: 'Customer not found' });
        }

        // Return success response
        return res.status(200).json({ errorCode: "000", message: 'Profile updated successfully', data: Customer });
    } catch (err) {
        console.error('Error in updateCustomer:', err);
        WriteError("customerController", "updateCustomer", "Error", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// const updateCustomer = async (req, res) => {
//     const { id, name, email, phone, address, loginid } = req.body;

//     try {
//         Customer.Id = id;
//         Customer.Name = name;
//         Customer.Email = email;
//         Customer.Phone = phone;
//         Customer.Address = address;
//         Customer.ModifiedBy = loginid;
//         Customer.ModifiedOn = new Date();

//         console.log("Customer :", Customer);

//         const [results] = await db.execute('UPDATE customer SET ? WHERE Id = ?', [Customer, id]);
//         console.log("Update Results:", results);

//         return res.status(200).json({ errorCode: "000", message: 'Profile updated successfully', data: updatedCustomer });
//     } catch (err) {
//         console.error('Error in updateCustomer:', err);
//         WriteError("customerController", "updateCustomer", "Error", err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

module.exports = { getCustomerById, updateCustomer };