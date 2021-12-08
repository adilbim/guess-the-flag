const express = require("express");
const router = express.Router();
const axios = require("axios");
const lodash = require("lodash");
const countries = require('./countries.json');

router.get("/countries", async (req, res) => {
  const allCountries = await axios.get("https://restcountries.com/v2/all");
  const random4Countries = lodash.sampleSize(allCountries.data, 4);

  const data = random4Countries.map((elm) => {
    return {
      name: elm.name,
      code: elm.numericCode,
      flag: elm.flag,
    };
  });

  data[1].selected = true;

  res.send([ ...data ]);
});

module.exports = router;
