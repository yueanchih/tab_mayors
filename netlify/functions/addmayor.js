const fs = require("fs");
const mayors = require("./../models/mayors.json");

exports.handler = async function (event, context) {
  console.log("headers", event.headers);

  const channel = event.headers["nightbot-channel"]
    ? event.headers["nightbot-channel"].split("&")[0].split("=")[1]
    : "default";

  const mayor = event.queryStringParameters["mayor"];

  if (channel === "default") {
    mayors[event.headers["nightbot-channel"].split("&")[0].split("=")[1]] = [
      mayor,
    ];
  } else {
    mayors[event.headers["nightbot-channel"].split("&")[0].split("=")[1]].push(
      mayor
    );
  }

  fs.writeFile(
    "./../models/mayors.json",
    JSON.stringify(mayors, null, 2),
    (err) => {
      if (err) throw err;
      console.log("Data written to file");
    }
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Added mayor: X" }),
  };
};
