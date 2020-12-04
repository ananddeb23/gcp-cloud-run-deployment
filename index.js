const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const version = 5;
  console.log('LOGGING Version', version);
  res.send(`Version ${version}`);
});

app.get('/cached', (req, res) => {
    const data = ['Tom', 'Maxine', 'David'];
    res.header('Cache-Control', 'public, max-age=31557600')
    res.send(data);
  });

app.get('/uncached', (req, res) => {
    const data = ['Tom', 'Maxine', 'David'];
    res.send(data);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});