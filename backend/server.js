const app = require('./app');

const port = parseInt(process.argv[2]);
app.listen(port, '0.0.0.0');