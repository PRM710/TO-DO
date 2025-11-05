const cron = require('node-cron');
const db = require('./db');
const nodemailer = require('nodemailer');

//  Send HTML Email
async function sendHTMLEmail(subject, tasks, to) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Build HTML list
  const taskListHTML = tasks.map(
    t => `
      <li style="margin-bottom:10px;">
        <strong>${t.title}</strong><br>
        <span>${t.description || 'No description provided'}</span><br>
        <small style="color:#777;">Created: ${new Date(t.created_at).toLocaleString()}</small>
      </li>
    `
  ).join('');

  // HTML email
  const html = `
    <div style="font-family: Arial, sans-serif; background:#f2f2f7; padding:25px;">
      <div style="max-width:600px; background:white; margin:auto; padding:25px; border-radius:10px; border:1px solid #ddd;">
        <h2 style="color:#2d3436;">📝 ${tasks.length} New Task(s) Added</h2>

        <p>Hello! New task(s) were added to your To-Do system.</p>

        <ul style="padding-left:18px;">
          ${taskListHTML}
        </ul>

        <p style="margin-top:25px;">✅ You can view full details in the Dashboard.</p>

        <hr style="margin:30px 0; border:0; border-top:1px solid #eee;">

        <p style="text-align:center; color:#555;">
          Made  by <strong>Prakash Mane</strong><br>
          <small style="color:#999;">This is an automated email from your To-Do API.</small>
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    html 
  });
}

async function checkForNewTasksAndNotify({ manualTrigger = false } = {}) {
  try {
    const res = await db.query(
      `SELECT * FROM tasks WHERE notified = false ORDER BY created_at ASC`
    );

    if (res.rows.length === 0) {
      if (manualTrigger) console.log("Cron: No new tasks.");
      return { notifiedCount: 0 };
    }

    const tasks = res.rows;
    const subject = `✅ ${tasks.length} New Task(s) Added`;
    const notifyTo = process.env.NOTIFY_TO || process.env.SMTP_USER;

    await sendHTMLEmail(subject, tasks, notifyTo);
    console.log(`✅ Email sent for ${tasks.length} task(s)`);

    await db.query(
      `UPDATE tasks SET notified = TRUE WHERE id = ANY($1::int[])`,
      [tasks.map(t => t.id)]
    );

    return { notifiedCount: tasks.length };

  } catch (err) {
    console.error("Cron Error:", err);
    throw err;
  }
}

// every 5 minutes
cron.schedule('*/5 * * * * *', async () => {
  console.log('[cron] Running at', new Date().toISOString());
  await checkForNewTasksAndNotify();
});

module.exports = { checkForNewTasksAndNotify };
