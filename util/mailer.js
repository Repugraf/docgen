const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(JSON.parse(process.env.MAIL_CONNECTION_JSON));

module.exports = async (to, html, subject) => (
  await transporter.sendMail({ from: 'Docgen <docgen.work@gmail.com>', to, subject, html })
);