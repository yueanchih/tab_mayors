const faunadb = require("faunadb");

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = async function (event, context) {
  if (event.headers["nightbot-channel"]) {
    const channel = event.headers["nightbot-channel"]
      .split("&")[0]
      .split("=")[1];

    const faunaDBQuery = q.Map(
      q.Paginate(q.Match(q.Index("mayors_by_channel"), channel)),
      q.Lambda(
        "mayors_by_channel",
        q.Update(q.Var("mayors_by_channel"), {
          data: {
            channel: channel,
            mayors: [],
          },
        })
      )
    );

    return client
      .query(faunaDBQuery)
      .then((response) => {
        return {
          statusCode: 200,
          body: JSON.stringify("Mayors fired."),
        };
      })
      .catch((error) => {
        console.log("error", error);

        return callback(null, {
          statusCode: 400,
          body: JSON.stringify(error),
        });
      });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "None-nightbot request" }),
  };
};
