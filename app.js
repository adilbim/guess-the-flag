const express = require('express');
const app = express();
const cors = require('cors');

const countriesRoute = require('./routes/countries');

app.use(cors());
app.use(countriesRoute);

app.listen(4000, () => {
  console.log("Listning on port 4000.");
});