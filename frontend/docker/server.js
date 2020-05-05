const express = require('express');
const path = require('path');

const port = 5000;
const app = express();

const frontendPath = path.join(__dirname, '..', 'build');

app.use('/', express.static(frontendPath));

app.get('/*', (_, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// start the Express server
app.listen(port, () => {
    console.log(`🚀 frontend server started at http://localhost:${port}`);
});
