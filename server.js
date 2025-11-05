require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const auth = require('./middleware/auth');         // JWT
const tasksRouter = require('./routes/tasks');
const authRoutes = require('./routes/auth'); 
const { checkForNewTasksAndNotify } = require('./cron');

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use(authRoutes);


app.use(auth);


app.use('/tasks', tasksRouter);


app.post('/cron/trigger', async (req, res) => {
  try {
    const result = await checkForNewTasksAndNotify({ manualTrigger: true });
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: 'Cron run failed' });
  }
});

app.get('/', (req, res) => res.send('To-Do API is alive'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  if (process.env.DISABLE_CRON !== 'true') {
    console.log('✅ Cron job enabled (every 5 minutes).');
  } else {
    console.log('⚠ Cron job disabled via DISABLE_CRON.');
  }
});
