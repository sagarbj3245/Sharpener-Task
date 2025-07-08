const express = require('express');
const router = express.Router();
const db = require('../db/mysql');
const { google, oauth2Client } = require('../google-auth');

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});

// Get slots
router.get('/slots', async (req, res) => {
  const [slots] = await db.query('SELECT * FROM slots');
  res.json(slots);
});

// Book slot with Google Meet
router.post('/book', async (req, res) => {
  const { name, email, time } = req.body;

  try {
    const [slot] = await db.query('SELECT available FROM slots WHERE time = ?', [time]);

    if (slot.length === 0 || slot[0].available <= 0) {
      return res.json({ success: false, message: 'No slots available' });
    }

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const event = {
      summary: `Meeting with ${name}`,
      start: {
        dateTime: `2025-07-08T${convertToISOTime(time).start}`,
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: `2025-07-08T${convertToISOTime(time).end}`,
        timeZone: 'Asia/Kolkata',
      },
      attendees: [{ email }],
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`
        }
      }
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
    });

    const meetLink = response.data.hangoutLink;
    const eventId = response.data.id;

    await db.query(
      'INSERT INTO bookings (name, email, time, meet_link, event_id) VALUES (?, ?, ?, ?, ?)',
      [name, email, time, meetLink, eventId]
    );

    await db.query('UPDATE slots SET available = available - 1 WHERE time = ?', [time]);

    console.log('✅ Booking successful, event created with ID:', eventId);

    res.json({ success: true });
  } catch (err) {
    console.error('❌ Error booking:', err);
    res.json({ success: false, message: 'Failed to book slot.' });
  }
});

// Get bookings
router.get('/bookings', async (req, res) => {
  const [results] = await db.query('SELECT * FROM bookings');
  res.json(results);
});

// Cancel booking and delete Google Calendar event
router.post('/cancel', async (req, res) => {
  const { id, time } = req.body;

  try {
    const [result] = await db.query('SELECT event_id FROM bookings WHERE id = ?', [id]);

    if (result.length === 0) {
      console.log('❌ Booking not found for id:', id);
      return res.json({ success: false, message: 'Booking not found.' });
    }

    const eventId = result[0].event_id;
    console.log('✅ Found event ID to delete:', eventId);

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    await calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId,
    });

    console.log('✅ Google Calendar event deleted.');

    await db.query('DELETE FROM bookings WHERE id = ?', [id]);
    await db.query('UPDATE slots SET available = available + 1 WHERE time = ?', [time]);

    console.log('✅ Booking deleted from DB and slot count updated.');

    res.json({ success: true });
  } catch (err) {
    console.error('❌ Error cancelling booking:', err);
    res.json({ success: false, message: 'Failed to cancel event.' });
  }
});

// Helper: Convert time range to ISO
function convertToISOTime(slotTime) {
  const [start, end] = slotTime.split(' - ');
  return { start: to24Hour(start), end: to24Hour(end) };
}

function to24Hour(time) {
  const [hm, mer] = time.split(' ');
  let [h, m] = hm.split(':').map(Number);
  if (mer === 'PM' && h !== 12) h += 12;
  if (mer === 'AM' && h === 12) h = 0;
  return `${String(h).padStart(2, '0')}:${m}:00`;
}

module.exports = router;
