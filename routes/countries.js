const express = require("express");
const router = express.Router();
const axios = require("axios");
const lodash = require("lodash");

router.get("/countries", async (req, res) => {
  try {
    const NUMBER_OF_COUNTRIES = 4;
    const allCountries = await axios.get("https://restcountries.com/v2/all");
    const random4Countries = lodash.sampleSize(allCountries.data, NUMBER_OF_COUNTRIES);

    const data = random4Countries.map((elm) => {
      return {
        name: elm.name,
        code: elm.numericCode,
        flag: elm.flag,
      };
    });

    const randomCountryIndex = lodash.random(NUMBER_OF_COUNTRIES - 1);
    data[randomCountryIndex].selected = true;

    res.send(data);
  } catch(error) {
    res.status(500).send({error: 'An error has occured while fetching countries.'});
  }
});

module.exports = router;
