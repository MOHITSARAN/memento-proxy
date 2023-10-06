const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require("config");
const jwt = require("jsonwebtoken");
const middlewares = require("../middleware");
const { encrypt, decrypt, httpsAgent } = require("../utils");

//Create JWT Token to Secure API Call
function makeJWTToken(id) {
  const payload = {
    id,
  };
  const options = {
    expiresIn: 3600,
  };
  const token = jwt.sign(payload, config.get("app.jwt.secret"), options);
  return token;
}

/*
Endpoint : /api/v1/nft_token
Method : GET
Description : Get NFT Token 
middlewares.restricted
*/
router.post("/nft_token", async (reqest, respones) => {
  try {
    let { url, code } = reqest.body;
    console.log(url, code);

    //Call to S3
    axios
      .get(url, { httpsAgent })
      .then((res) => {
        respones.status(200).json({
          email: res.data.data.email,
          token: "abc#$%xyz=##",
          message: "Success",
        });
      })
      .catch((err) => respones.status(500).json(err));
  } catch (error) {
    console.log(error);
    respones.status(500).json(error);
  }
});

module.exports = router;
