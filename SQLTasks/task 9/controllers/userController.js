const db = require('../models/db');

// Insert User
exports.createUser = async (req, res) => {
    const { username, email, phone } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO users (username, email, phone) VALUES (?, ?, ?)',
            [username, email, phone]
        );
        res.json({ id: result.insertId, username, email, phone });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get All Users
exports.getUsers = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM users WHERE id = ?', [id]);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
