// utils/emailSender.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,     // Ensure your .env has EMAIL_USER
    pass: process.env.EMAIL_PASSWORD  // Ensure your .env has EMAIL_PASSWORD (App Password if 2FA is enabled)
  }
});


export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"HR Team" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};
