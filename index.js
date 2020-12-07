const express = require('express');
const app = express();
const redis = require("redis");

const client = redis.createClient({
    "host": "10.223.214.131"
  });
  client.on("error", function(error) {
    console.error(error);
  });

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

app.get('/redis', (req, res) => {
    res.set('Cache-Control', 'no-store');
    client.set("key", "value!", redis.print);
    client.get("counter", (err, reply) => {
        const counter = reply ? reply + 1 : 1;
        client.set("counter", counter);
      res.send(`
      <html>
        <head>
        </head>
        <body>
          <p>Count of visitors: ${reply}</p>
        </body>
      </html>
      `);
      });
    });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});