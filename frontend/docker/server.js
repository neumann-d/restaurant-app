const express = require('express');
const path = require('path');

const app = express();

const frontendPath = path.join(__dirname, '..', 'build');

app.use('/', express.static(frontendPath));

app.get('/*', (_, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(5000);
