const sequelize = require('../utils/db-connection');

const addEntries = async (req, res) => {
    try {
        // Create a new student record
        const student = {
            name: 'Virat Kohli',
            email: 'virat.kohli@example.com'
        };

        const newStudent = await sequelize.Student.create(student);
        console.log('Record inserted successfully. ID:', newStudent.id);
        
        // Update the record
        await updateEntry(newStudent.id, res);
    } catch (error) {
        console.error('Error inserting record:', error);
        res.status(500).send('Error inserting record');
    }
};

const updateEntry = async (id, res) => {
    try {
        const updatedStudent = {
            name: 'King Kohli',
            email: 'king.kohli@example.com'
        };

        const result = await sequelize.Student.update(updatedStudent, {
            where: { id: id }
        });
        
        if (result[0] === 0) {
            console.log('No record found with ID:', id);
            return res.status(404).send('Student not found');
        }
        
        console.log('Record updated successfully. ID:', id);
        
        // Delete the record
        await deleteEntry(id, res);
    } catch (error) {
        console.error('Error updating record:', error);
        res.status(500).send('Error updating record');
    }
};

const deleteEntry = async (id, res) => {
    try {
        const result = await sequelize.Student.destroy({
            where: { id: id }
        });
        
        if (result === 0) {
            console.log('No record found with ID:', id);
            return res.status(404).send('Student not found');
        }
        
        console.log('Record deleted successfully. ID:', id);
        res.send('Operations completed successfully');
    } catch (error) {
        console.error('Error deleting record:', error);
        res.status(500).send('Error deleting record');
    }
};

module.exports = {
    addEntries
};