import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.HAVEN_EMAIL,
    clientId: process.env.HAVEN_EMAIL_CLIENT_ID,
    clientSecret: process.env.HAVEN_EMAIL_CLIENT_SECRET,
    refreshToken: process.env.HAVEN_EMAIL_REFRESH_TOKEN,
  }
});

const emailer = {
  setMailOptions: (email, subject, html) => {
    return {
      from: process.env.HAVEN_EMAIL,
      to: email,
      subject,
      html,
    };
  },

  sendEmail: mailOptions => transporter.sendMail(mailOptions),
};

export default emailer;
