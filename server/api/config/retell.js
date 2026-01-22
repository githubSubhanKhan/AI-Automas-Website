const Retell = require("retell-sdk").default;

const retellClient = new Retell({
  apiKey: process.env.RETELL_API_KEY,
});

module.exports = retellClient;
