/* eslint-disable no-undef */

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import favicon from 'express-favicon';
import { join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 4400;
const app = express();

app.use(favicon(__dirname + '/build/favicon.ico'));

app.use(express.static(__dirname));
app.use(express.static(join(__dirname, 'build')));

app.get('/ping', function(req, res) {
	return res.send('pong');
});

app.get('/*', function(req, res) {
	res.sendFile(join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`server started on port ${port}`));
