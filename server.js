const app = require('./lib/app.js');

const PORT = 8888;

app.list(PORT, () => {
  //eslint-disable-next-line no-console
  console.log(`App running on port ${PORT}`);
})