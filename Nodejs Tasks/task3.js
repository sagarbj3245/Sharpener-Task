const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'messages.txt');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    let message = '';

    if (fs.existsSync(FILE_PATH)) {
        message = fs.readFileSync(FILE_PATH, 'utf-8').trim();
    }

    const html = `
        <div class="message-box">${message}</div>

        <form method="POST" action="/">
            <input type="text" name="message" placeholder="Type your message here" required />
            <button type="submit">Send</button>
        </form>
    `;

    res.send(html);
});

app.post('/', (req, res) => {
    let newMessage = req.body.message.trim();
    newMessage = newMessage.replace(/ /g, '+');

    fs.writeFileSync(FILE_PATH, newMessage);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
