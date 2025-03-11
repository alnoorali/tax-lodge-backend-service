const db = require('../db');
const Logs = require('../models/logs');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

function WriteError(controllerName, functionName, action, error, res = null) {
    try {
        Logs.LogId = uuidv4();
        Logs.LogDate = new Date();
        Logs.PageName = controllerName;
        Logs.FunctionName = functionName;
        Logs.ErrorType = action;
        Logs.Error = error;

        db.query('INSERT INTO logs SET ?', Logs, (dbError, results) => {
            if (dbError) {
                console.error('Error Write', dbError);
                WriteTextError(controllerName, functionName, action, dbError);
                if (res) {
                    return res.status(201).json({ error: dbError });
                }
            }

            // If res is provided, send a response
            if (res) {
                console.log("res write error :", res);
                return res.status(500).json({ error: res });
            }

            // If res is not provided, log the error but don't send a response
            console.error('Database query error:', dbError);
        });
    } catch (catchError) {
        WriteTextError(controllerName, functionName, action, catchError);
        if (res) {
            res.status(500).json({ error: res });
        }
        console.error('Exception while writing error:', catchError);
    }
}

function WriteTextError(controllerName, functionName, action, error) {
    const projectDirectory = process.cwd();
    const relativePath = 'Logs';
    let fileName = path.join(projectDirectory, relativePath);

    // Replace backslashes with forward slashes
    fileName = fileName.replace(/\\/g, '/').replace('file:/', '');

    const strText = `${new Date().toISOString()}\t${controllerName}\t${functionName}\t\t${action}\t${error}`;

    // Check if the directory exists and create it if it doesn't
    if (!fs.existsSync(fileName)) {
        fs.mkdirSync(fileName, { recursive: true });
    }

    // Append date to the filename
    fileName = path.join(fileName, `logs_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}.txt`);

    // Write the log text to the file
    fs.appendFile(fileName, strText + '\n', (err) => {
        if (err) {
            console.error('Error occurred while writing the log file:', err);
        } else {
            console.log('Log successfully written to:', fileName);
        }
    });
}

module.exports = {
    WriteError
};