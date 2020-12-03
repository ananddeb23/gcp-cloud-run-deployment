const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const version = 4;
  console.log('LOGGING Version', version);
  res.send(`Version ${version}`);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});