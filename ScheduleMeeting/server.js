const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const schedulerRouter = require('./routes/scheduler'); // your booking routes
const authRouter = require('./routes/auth'); // your OAuth routes

const app = express();
app.use(bodyParser.json());

// ✅ Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// ✅ Auth routes: /auth, /oauth2callback
app.use('/', authRouter);

// ✅ Scheduler routes: /api/slots, /api/book, /api/bookings, /api/cancel
app.use('/api', schedulerRouter);

// ✅ Optional root route fallback
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
