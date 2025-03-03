const nodemailer =require("nodemailer");
const emailTemplate =require("../templates/EmailTemplates");

const sendVerificationEmail = async (userEmail, verifyToken) => {
  try {
    // Create a transporter using SMTP settings
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or use your email service provider
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your app password (use App Passwords for Gmail)
      },
    });

    // Email content
    const mailOptions = {
      from: `"T-COM" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "Verify Your Email - MERN Project",
      html:emailTemplate(verifyToken)
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

module.exports= sendVerificationEmail;
