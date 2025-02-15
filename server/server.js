import express from 'express';

const app = express();
const port = 3000; // You can change this port number

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});