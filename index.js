require('dotenv').config();
const express = require('express');
const app = express();
const ip = require('ip');
console.log('HELLO!!');
const path = require('path');
// Middleware
const corsMiddleware = require('./middleware/cors');
const logger = require('./middleware/morgan');

// Routers
const registerRouter = require('./routes/register');
const videoRouter = require('./routes/videos');

//Routes
const PORT = process.env.PORT || 8080;

app.use(corsMiddleware);
app.use(express.json());
// app.use("/", logger);

// Static images
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));

// Routers
app.use('/register', registerRouter);
app.use('/videos', videoRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on http://${ip.address()}:${PORT}`);
});
