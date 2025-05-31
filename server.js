const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors()); // Configure allowed origins in production

// Configure your email service and credentials
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email provider
  auth: {
    user: 'neerajdhebana@gmail.com',
    pass: 'Neeraj@123', // Use an App Password (Gmail) or real password (not recommended)
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).send('Missing fields');
  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <your.email@gmail.com>`,
      to: 'neerajdhebana@gmail.com', // Your receiving address
      subject: `Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      replyTo: email
    });
    res.status(200).send('Message sent');
  } catch (err) {
    res.status(500).send('Failed to send message');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
