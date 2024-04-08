const nodemailer = require('nodemailer');

// Создайте транспорт для отправки почты
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nur20039@gmail.com',
    pass: 'xclolhitajqeqrya',
  },
});

// Определите функцию для отправки email сообщений
function sendMail(to, subject, text) {
  const mailOptions = {
    from: 'nur20039@gmail.com',
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
