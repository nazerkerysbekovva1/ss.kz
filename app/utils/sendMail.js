const nodemailer = require('nodemailer');

// Создайте транспорт для отправки почты
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nazerkerysbek32@gmail.com',
    pass: 'naziko.32',
  },
});

// Определите функцию для отправки email сообщений
function sendMail(to, subject, text) {
  const mailOptions = {
    from: 'nazerkerysbek32@gmail.com',
    to: to,
    subject: subject,
    text: text,
  };

  // Отправьте email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendMail;
