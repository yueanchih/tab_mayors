const faunadb = require("faunadb");

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = async function (event, context, callback) {
  const channel = event.headers["nightbot-channel"] ? event.headers["nightbot-channel"].split("&")[0].split("=")[1] : "default";

  const faunaDBQuery = q.Map(
    q.Paginate(q.Match(q.Index("mayors_by_channel"), channel)),
    q.Lambda("mayors_by_channel", q.Get(q.Var("mayors_by_channel")))
  );

  return client
    .query(faunaDBQuery)
    .then((response) => {
      console.log(1, response.data[0].data.mayors);
      const jj =
        response.data.length && response.data[0].data.mayors.length
          ? [response.data[0].data.mayors.join(", ")]
          : ["No mayors. Try !addmayor name"];
      console.log("mayors: ", jj);

      return {
        statusCode: 200,
        body: JSON.stringify(jj),
      };
    })
    .catch((error) => {
      console.log("error", error);

      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      });
    });
};
