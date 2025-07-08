async function fetchSlots() {
  const res = await fetch('/api/slots');
  const slots = await res.json();
  const slotsDiv = document.getElementById('slots');
  slotsDiv.innerHTML = '';

  slots.forEach(slot => {
    if (slot.available > 0) {
      const div = document.createElement('div');
      div.className = 'slot';
      div.innerHTML = `
        <strong>${slot.time}</strong><br>Available: ${slot.available}<br>
        <button onclick="openModal('${slot.time}')">Book</button>
      `;
      slotsDiv.appendChild(div);
    }
  });
}

function openModal(time) {
  const modal = document.getElementById('modal');
  const form = document.getElementById('modal-form');
  modal.style.display = 'block';
  form.innerHTML = `
    <label>Name: <input type="text" id="name"></label><br>
    <label>Email: <input type="email" id="email"></label><br>
    <button onclick="book('${time}')">Confirm Booking</button>
  `;
}

document.getElementById('close').onclick = () => {
  document.getElementById('modal').style.display = 'none';
};

async function book(time) {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  const res = await fetch('/api/book', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ name, email, time })
  });

  const data = await res.json();
  alert(data.success ? 'Booked!' : data.message);
  document.getElementById('modal').style.display = 'none';
  fetchSlots();
  fetchBookings();
}

async function fetchBookings() {
  const res = await fetch('/api/bookings');
  const bookings = await res.json();
  const bookingsDiv = document.getElementById('bookings');
  bookingsDiv.innerHTML = '';
  bookings.forEach(b => {
    bookingsDiv.innerHTML += `
      <div class="booking">
        <strong>${b.name}</strong> (${b.email})<br>
        ${b.time}<br>
        <a href="${b.meet_link}" target="_blank">Join Meet</a><br>
        <button onclick="cancelBooking(${b.id}, '${b.time}')">Cancel</button>
      </div>
    `;
  });
}

async function cancelBooking(id, time) {
  const res = await fetch('/api/cancel', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ id, time })
  });

  const data = await res.json();
  alert(data.success ? 'Booking cancelled!' : 'Failed to cancel.');

  fetchSlots();
  fetchBookings();
}

fetchSlots();
fetchBookings();
