// controllers/contact.controller.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const contactwithus = async (req, res) => {
  const { name, email, phone, message } = req.body;
  console.log(req.body);
  

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Hire a Lawyer" <${process.env.EMAIL}>`,
      to: 'iamrayanahmed007@gmail.com',
      subject: 'New Contact Form Submission',
      text: `
You've received a new message from the contact form:

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
      `,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ error: 'Failed to send message.' });
  }
};


export default contactwithus;