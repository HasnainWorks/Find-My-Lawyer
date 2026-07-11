import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmailToLawyer = async (req, res) => {
    console.log("Received form data:", req.body);
  try {
    const { name, email, contact, message, recipient } = req.body;

    // Validate required fields
    if (!name || !email || !contact || !message || !recipient) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Nodemailer transport setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Your Gmail
        pass: process.env.PASSWORD, // App password
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL,
      to: recipient,
      subject: `New Client Inquiry from ${name}`,
      text: `
You've received a new message from a client:

Name: ${name}
Email: ${email}
Phone: ${contact}

Message:
${message}
      `,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ error: "Server error while sending email" });
  }
};

export { sendEmailToLawyer };
