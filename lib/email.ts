import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER || 'ayushmanpraharaj85@gmail.com',
      pass: process.env.SMTP_PASS, // Use App Password for Gmail
    },
  });
};

export interface ContactEmailData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  timestamp: Date;
}

// Send notification email to you
export async function sendContactNotification(data: ContactEmailData) {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.SMTP_USER || 'ayushmanpraharaj85@gmail.com',
    to: 'ayushmanpraharaj85@gmail.com',
    subject: `New Contact Form Message: ${data.subject || 'No Subject'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #007bff; margin-top: 0;">Contact Details</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Subject:</strong> ${data.subject || 'No subject provided'}</p>
          <p><strong>Submitted:</strong> ${data.timestamp.toLocaleString()}</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
          <h3 style="color: #333; margin-top: 0;">Message</h3>
          <p style="line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 5px;">
          <p style="margin: 0; font-size: 14px; color: #6c757d;">
            This email was sent from your portfolio contact form. 
            Reply directly to this email to respond to ${data.name}.
          </p>
        </div>
      </div>
    `,
    replyTo: data.email, // Allow direct reply to the sender
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Notification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending notification email:', error);
    throw error;
  }
}

// Send auto-reply email to the user
export async function sendAutoReply(data: ContactEmailData) {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.SMTP_USER || 'ayushmanpraharaj85@gmail.com',
    to: data.email,
    subject: 'Thank you for contacting me - Ayushman Praharaj',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #007bff; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          Thank You for Your Message!
        </h2>
        
        <p>Hi ${data.name},</p>
        
        <p>Thank you for reaching out to me through my portfolio website. I have received your message and will get back to you as soon as possible.</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Your Message Summary</h3>
          <p><strong>Subject:</strong> ${data.subject || 'No subject'}</p>
          <p><strong>Submitted:</strong> ${data.timestamp.toLocaleString()}</p>
        </div>
        
        <p>I typically respond within 24-48 hours. If your inquiry is urgent, you can also reach me directly at:</p>
        
        <ul>
          <li>Email: ayushmanpraharaj85@gmail.com</li>
          <li>Phone: +91 9777072381</li>
          <li>LinkedIn: <a href="https://www.linkedin.com/in/ayushman-praharaj-28985231b/">Ayushman Praharaj</a></li>
        </ul>
        
        <p>Best regards,<br>
        <strong>Ayushman Praharaj</strong><br>
        Full Stack Developer</p>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #e9ecef; border-radius: 5px; font-size: 12px; color: #6c757d;">
          <p style="margin: 0;">
            This is an automated response. Please do not reply to this email. 
            If you need immediate assistance, please contact me directly using the information above.
          </p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Auto-reply email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending auto-reply email:', error);
    // Don't throw error for auto-reply failures
    return { success: false, error: error };
  }
}
