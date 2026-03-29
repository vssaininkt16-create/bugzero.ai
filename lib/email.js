import connectDB from '@/lib/mongodb';
import EmailQueue from '@/lib/models/EmailQueue';

export async function sendEmail({ to, subject, body, type = 'general', metadata = {} }) {
  await connectDB();

  // Queue the email in MongoDB
  const email = await EmailQueue.create({ to, subject, body, type, metadata, status: 'queued' });

  // Log to console in development
  console.log('\n========== EMAIL QUEUED ==========');
  console.log('To:', to);
  console.log('Subject:', subject);
  console.log('Type:', type);
  console.log('Body preview:', body.substring(0, 200) + '...');
  console.log('ID:', email._id);
  console.log('==================================\n');

  // TODO: When SMTP is configured, send real email here
  // const transporter = nodemailer.createTransport({ ... });
  // await transporter.sendMail({ from, to, subject, html: body });
  // email.status = 'sent'; await email.save();

  return email;
}

export async function sendLeadNotification(lead) {
  // Email to admin
  await sendEmail({
    to: process.env.ADMIN_EMAIL || 'admin@bugzero.solutions',
    subject: `New Lead: ${lead.company || lead.name} - BugZero`,
    body: `<h2>New Lead Received</h2>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Phone:</strong> ${lead.phone || 'N/A'}</p>
      <p><strong>Company:</strong> ${lead.company || 'N/A'}</p>
      <p><strong>Service:</strong> ${lead.service || 'N/A'}</p>
      <p><strong>Budget:</strong> ${lead.budget || 'N/A'}</p>
      <p><strong>Message:</strong> ${lead.message || 'N/A'}</p>
      <p><strong>Source:</strong> ${lead.source}</p>
      <p><strong>Priority:</strong> ${lead.priority}</p>`,
    type: 'admin_notification',
    metadata: { leadId: lead._id },
  });

  // Auto-reply to client
  await sendEmail({
    to: lead.email,
    subject: 'Thank you for contacting BugZero Cyber Solutions',
    body: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#00d4ff">Thank you, ${lead.name}!</h2>
      <p>Your request has been received. Our security experts will contact you within <strong>2 hours</strong>.</p>
      <hr/>
      <h3>Your Request Summary:</h3>
      <ul>
        <li><strong>Service:</strong> ${lead.service || 'General Inquiry'}</li>
        <li><strong>Company:</strong> ${lead.company || 'N/A'}</li>
        <li><strong>Reference ID:</strong> BZ-${Date.now().toString(36).toUpperCase()}</li>
      </ul>
      <p>Meanwhile, explore our services: <a href="https://bugzero.solutions/services">bugzero.solutions/services</a></p>
      <br/>
      <p>Stay Secure!</p>
      <p><strong>Team BugZero Cyber Solutions</strong></p>
    </div>`,
    type: 'client_auto_reply',
    metadata: { leadId: lead._id },
  });
}

export async function sendBookingConfirmation(booking) {
  await sendEmail({
    to: booking.email,
    subject: `Booking Confirmed: ${booking.bookingId} - BugZero`,
    body: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#00d4ff">Booking Confirmed!</h2>
      <p>Dear ${booking.name},</p>
      <p>Your free 30-minute security consultation has been booked.</p>
      <h3>Booking Details:</h3>
      <ul>
        <li><strong>Booking ID:</strong> ${booking.bookingId}</li>
        <li><strong>Date:</strong> ${booking.date}</li>
        <li><strong>Time:</strong> ${booking.time}</li>
        <li><strong>Service:</strong> ${booking.service || 'General Consultation'}</li>
      </ul>
      <h3>What to Prepare:</h3>
      <ul>
        <li>List of your digital assets (websites, apps, APIs)</li>
        <li>Current security measures in place</li>
        <li>Specific security concerns or requirements</li>
      </ul>
      <p>Stay Secure!</p>
      <p><strong>Team BugZero Cyber Solutions</strong></p>
    </div>`,
    type: 'booking_confirmation',
    metadata: { bookingId: booking._id },
  });

  // Notify admin
  await sendEmail({
    to: process.env.ADMIN_EMAIL || 'admin@bugzero.solutions',
    subject: `New Booking: ${booking.bookingId} - ${booking.name}`,
    body: `<h2>New Booking</h2><p>ID: ${booking.bookingId}</p><p>Name: ${booking.name}</p><p>Email: ${booking.email}</p><p>Date: ${booking.date} at ${booking.time}</p><p>Service: ${booking.service}</p>`,
    type: 'admin_notification',
  });
}

export async function sendWelcomeNewsletter(email) {
  await sendEmail({
    to: email,
    subject: 'Welcome to BugZero Cyber Security Newsletter!',
    body: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#00d4ff">Welcome to BugZero!</h2>
      <p>Thank you for subscribing to our cybersecurity newsletter.</p>
      <p>You will receive:</p>
      <ul>
        <li>Weekly Cyber Threat Alerts</li>
        <li>Monthly Security Tips</li>
        <li>Exclusive Offers & Free Resources</li>
      </ul>
      <p>Stay Secure!</p>
      <p><strong>Team BugZero Cyber Solutions</strong></p>
    </div>`,
    type: 'welcome_newsletter',
  });
}
