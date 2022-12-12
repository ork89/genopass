const path = require('path');
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
app.use('/api/users', require('./routes/userRoutes.cjs'));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/dist')));

	app.get('*', (request, response) => {
		response.sendFile(path.resolve(__dirname, '../', 'client', 'dist', 'index.html'));
	});
} else {
	app.get('/', (request, response) => response.send('Environment is not set to production'));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
