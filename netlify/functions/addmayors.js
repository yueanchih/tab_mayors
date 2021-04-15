/* This command is supposed to add the mayors all at once */
/* Comma-separate them automatically */

exports.handler = async function (event, context) {
  console.log("headers", event.headers);
  console.log("multiValueHeaders", event.multiValueHeaders);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Added mayors: X, Y, Z" }),
  };
};
