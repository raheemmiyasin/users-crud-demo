const app = require('./app');

const port = process.argv[2] || 8080;
app.listen(port, '0.0.0.0');