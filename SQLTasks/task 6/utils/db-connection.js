const { Sequelize, DataTypes } = require('sequelize');

// Create a Sequelize instance
const sequelize = new Sequelize('testDB', 'sharpener', 'Sharp@25', {
    host: 'localhost',
    dialect: 'mysql'
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connected to the database!');
        
        // Define Student model
        const Student = sequelize.define('Student', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING(20)
            },
            email: {
                type: DataTypes.STRING(20)
            }
        }, {
            // Disable the automatic timestamp fields (createdAt and updatedAt)
            timestamps: false,
            // Use the table name exactly as-is
            tableName: 'Students'
        });

        // Sync model with database (create table if it doesn't exist)
        Student.sync()
            .then(() => {
                console.log('Table created successfully!');
            })
            .catch(err => {
                console.error('Error creating table:', err);
            });

        // Attach model to sequelize instance for export
        sequelize.Student = Student;
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;