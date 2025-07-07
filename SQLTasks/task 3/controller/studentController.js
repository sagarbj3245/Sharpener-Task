const db = require('../utils/db-connection');

const addEntries = (req, res) => {
            const student = {
        name: req.body.name,
        email: req.body.email
    };


    db.query('INSERT INTO Students (name, email) VALUES (?, ?)', 
        [student.name, student.email], 
        (err, result) => {
            if (err) {
                console.error('Error inserting record:', err);
                return res.status(500).send('Error inserting record');
            }
            
            console.log('Record inserted successfully. ID:', result.insertId);
            
            // Update the record
            updateEntry(result.insertId, res);
        }
    );
};

const updateEntry = (id, res) => {
    const updatedStudent = {
        name: 'King Kohli',
        email: 'king.kohli@example.com'
    };

    db.query('UPDATE Students SET name = ?, email = ? WHERE id = ?', 
        [updatedStudent.name, updatedStudent.email, id], 
        (err, result) => {
            if (err) {
                console.error('Error updating record:', err);
                return res.status(500).send('Error updating record');
            }
            
            if (result.affectedRows === 0) {
                console.log('No record found with ID:', id);
                return res.status(404).send('Student not found');
            }
            
            console.log('Record updated successfully. ID:', id);
            
            // Delete the record
            deleteEntry(id, res);
        }
    );
};

const deleteEntry = (id, res) => {
    db.query('DELETE FROM Students WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error deleting record:', err);
            return res.status(500).send('Error deleting record');
        }
        
        if (result.affectedRows === 0) {
            console.log('No record found with ID:', id);
            return res.status(404).send('Student not found');
        }
        
        console.log('Record deleted successfully. ID:', id);
        res.send('Operations completed successfully');
    });
};

module.exports = {
    addEntries
};