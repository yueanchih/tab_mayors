const faunadb = require("faunadb");

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = async function (event, context, callback) {
  if (event.headers["nightbot-channel"]) {
    const channel = event.headers["nightbot-channel"].split("&")[0].split("=")[1];

    const mayorIndex = event.queryStringParameters["mayor_index_mayor_name"].split(/ (.+)/)[0];
    const mayor = event.queryStringParameters["mayor_index_mayor_name"].split(/ (.+)/)[1];

    let faunaDBQuery;

    const mayorsQuery = q.Map(
      q.Paginate(q.Match(q.Index("mayors_by_channel"), channel)),
      q.Lambda("mayors_by_channel", q.Get(q.Var("mayors_by_channel")))
    );

    const mayors = await client.query(mayorsQuery).then((response) => {
      return response.data;
    });

    if (mayors && Boolean(mayors.length) && Boolean(mayors[0].data.mayors.length)) {
      console.log(1234, mayors[0].data.mayors);
      mayors[0].data.mayors[mayorIndex] = mayor;

      faunaDBQuery = q.Map(
        q.Paginate(q.Match(q.Index("mayors_by_channel"), channel)),
        q.Lambda(
          "mayors_by_channel",
          q.Update(q.Var("mayors_by_channel"), {
            data: {
              channel: channel,
              mayors: mayors[0].data.mayors,
            },
          })
        )
      );
    } else {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(["Mayor bucket is empty already."]),
      });
    }

    return client
      .query(faunaDBQuery)
      .then((response) => {
        console.log("1 xyz", response.data[0].data.mayors);

        return {
          statusCode: 200,
          body: JSON.stringify("Mayor Renamed."),
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
