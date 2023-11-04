const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const table1 = require('./table1.json');
const table2 = require('./table2.json');

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
}

app.get('/mock/data1', cors(corsOptions), (req, res) => {
  const data = table1
  res.json(data);
});

app.get('/mock/data2', cors(corsOptions), (req, res) => {
  const data = table2
  res.json(data);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});
