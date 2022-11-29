const express = require('express');
const connectDB = require('./config/db.cjs');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware.cjs');
const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/vault', require('./routes/vaultRoutes.cjs'));
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
