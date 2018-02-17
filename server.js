const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const apiRoutes = require('./app/routing/apiRoutes.js');
const htmlRoutes = require('./app/routing/htmlRoutes.js');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, () => {
	console.log('listening on port: ' + PORT);
});