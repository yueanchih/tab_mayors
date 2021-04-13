const mayors = require("./../models/mayors.json");

exports.handler = async function (event, context) {
  const channel =
    event.headers["nightbot-channel"]?.split("&")[0].split("=")[1] || "default";

  console.log(mayors[channel]);

  return {
    statusCode: 200,
    body: JSON.stringify(mayors[channel]),
  };
};
