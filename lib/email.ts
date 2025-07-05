import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM || 'jamaliakbar909@gmail.com',
      to,
      subject,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
};

export const sendNotificationEmail = async (message: any) => {
  const subject = `New Inquiry from ${message.name}`;
  const html = `
    <h2>New Project Inquiry</h2>
    <p><strong>Name:</strong> ${message.name}</p>
    <p><strong>Email:</strong> ${message.email}</p>
    <p><strong>Phone:</strong> ${message.phone}</p>
    <p><strong>Location:</strong> ${message.location}</p>
    <p><strong>Project Type:</strong> ${message.projectType}</p>
    <p><strong>Budget:</strong> ${message.budget || 'Not specified'}</p>
    <p><strong>Message:</strong></p>
    <p>${message.message}</p>
  `;

  return sendEmail(process.env.ADMIN_EMAIL || 'jamaliakbar909@gmail.com', subject, html);
};