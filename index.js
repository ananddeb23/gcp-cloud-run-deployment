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
    client.get("key", (err, reply) => {
      res.send(`
      <html>
        <head>
        </head>
        <body>
          <p>Connecting to Redis at: ${process.env.REDIS_IP}</p>
          <p>Value of key just read: ${reply}</p>
        </body>
      </html>
      `);
      });
    });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});