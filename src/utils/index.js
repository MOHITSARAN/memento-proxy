const Crypto = require("crypto-js");
const config = require("config");
const https = require("https");

let secret_key = config.get("app.aes.secret");

const encrypt = (data) => {
  const encrypted = Crypto.AES.encrypt(
    JSON.stringify(data),
    secret_key
  ).toString();
  return encrypted;
};

const decrypt = (data) => {
  const decrypted = Crypto.AES.decrypt(token, secret_key).toString(
    Crypto.enc.Utf8
  );
  const decryptedData = JSON.parse(decrypted);
  return { ...data, ...decryptedData };
};

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

module.exports = {
  encrypt,
  decrypt,
  httpsAgent,
};
