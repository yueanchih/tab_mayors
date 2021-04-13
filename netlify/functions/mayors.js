const mayors = require("./../models/mayors.json");

console.log("ZZ node version: ", process.version);
console.log("ZX node versions: ", process.versions);

exports.handler = async function (event, context) {
  const channel = event.headers["nightbot-channel"]
    ? event.headers["nightbot-channel"].split("&")[0].split("=")[1]
    : "default";

  console.log(mayors[channel]);

  return {
    statusCode: 200,
    body: JSON.stringify(mayors[channel]),
  };
};
