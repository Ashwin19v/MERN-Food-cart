const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ashwinash190105@gmail.com",
        pass: "mbiv bdek pshn liwk",
      },
    });

    await transporter.sendMail({
      from: '"Food Cart ashwinash190105@gmail.com" ',
      to,
      subject,
      html,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
