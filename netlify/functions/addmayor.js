const faunadb = require("faunadb");

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = async function (event, context) {
  if (event.headers["nightbot-channel"]) {
    const channel =
      event.headers["nightbot-channel"].split("&")[0].split("=")[1] ||
      "default";

    const mayor = event.queryStringParameters["mayor"];

    if (
      !mayors[event.headers["nightbot-channel"].split("&")[0].split("=")[1]]
    ) {
      mayors[
        event.headers["nightbot-channel"].split("&")[0].split("=")[1]
      ] = [];
    }

    mayors[event.headers["nightbot-channel"].split("&")[0].split("=")[1]].push(
      mayor
    );

    // todo: each streamer gets a document, instead of one document holding everyone
    // headache, but a good project :)

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Added mayor: X" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "None-nightbot request" }),
  };
};
