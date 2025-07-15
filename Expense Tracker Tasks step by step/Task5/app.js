require('dotenv').config();
const express = require('express');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'signup.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/expenses', (req, res) => res.sendFile(path.join(__dirname, 'views', 'expense.html')));

app.use('/api', paymentRoutes);
app.use('/api', authRoutes);
app.use('/api', expenseRoutes);

app.listen(3000, () => console.log(`Server running: http://localhost:3000`));
