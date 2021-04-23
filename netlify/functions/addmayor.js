const faunadb = require("faunadb");
alert("test");
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = async function (event, context) {
  if (event.headers["nightbot-channel"]) {
    const channel = event.headers["nightbot-channel"].split("&")[0].split("=")[1];

    const mayor = event.queryStringParameters["mayor"];

    let faunaDBQuery;
    alert("???");
    const mayorsQuery = q.Map(
      q.Paginate(q.Match(q.Index("mayors_by_channel"), channel)),
      q.Lambda("mayors_by_channel", q.Get(q.Var("mayors_by_channel")))
    );

    const mayors = await client.query(mayorsQuery).then((response) => {
      return response.data;
    });

    if (mayors && Boolean(mayors.length)) {
      faunaDBQuery = q.Map(
        q.Paginate(q.Match(q.Index("mayors_by_channel"), channel)),
        q.Lambda(
          "mayors_by_channel",
          q.Update(q.Var("mayors_by_channel"), {
            data: {
              channel: channel,
              mayors: [...mayors[0].data.mayors, mayor],
            },
          })
        )
      );
    } else {
      faunaDBQuery = q.Create(q.Collection("mayors"), {
        data: { channel: channel, mayors: [mayor] },
      });
    }

    return client
      .query(faunaDBQuery)
      .then((response) => {
        const jj = response.data.length ? [(response.data[0].data.mayors || []).join(", ")] : [];
        console.log("mayors: ", jj);

        return {
          statusCode: 200,
          // body: JSON.stringify(jj),
          body: JSON.stringify("Mayor added: " + mayor),
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
