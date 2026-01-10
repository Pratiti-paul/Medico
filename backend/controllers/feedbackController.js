const nodemailer = require("nodemailer");

exports.sendFeedback = async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation to avoid empty or malformed payloads
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email and message are required" });
  }

  try {
    // Allow disabling email in local/dev environments
    if (process.env.DISABLE_EMAIL === "true") {
      return res.status(200).json({ message: "Feedback received (email disabled)" });
    }
    // Use Gmail SMTP with app password for reliability
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.FEEDBACK_EMAIL,
        pass: process.env.FEEDBACK_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `Medico Feedback <${process.env.FEEDBACK_EMAIL}>`,
      replyTo: email,
      to: process.env.FEEDBACK_EMAIL,
      subject: "New Medico Feedback",
      html: `
        <h3>New Feedback Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ message: "Feedback sent successfully" });
  } catch (error) {
    console.error("Feedback email failed:", error?.message || error);
    res.status(500).json({ message: "Failed to send feedback" });
  }
};
