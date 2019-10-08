require("dotenv").config();

const express = require("express");
const yn = require("yn");

const { connect: connectToDb } = require("./db");
const { router } = require("./routes");
const { updateRooms, searchRooms } = require("./services/room");
const { updateAllplannings, getFreePlannings } = require("./services/planning");
const { post, pre } = require("./middlewares");
(async () => {
  try {
    // Bootstrap
    await connectToDb();

    // TODO: cron daily
    // await updateRooms();
    // console.log(
    //   await getFreePlannings(await searchRooms("u3-01"), "2019-10-07")
    // );

    // Server startup
    const app = express();

    pre.forEach(m => app.use(m));

    app.use(router);

    post.forEach(m => app.use(m));

    app.listen(process.env.PORT, () =>
      console.log("Listenning on port", process.env.PORT)
    );
  } catch (e) {
    console.log("Failed to start the server");
    if (yn(process.env.DEBUG)) {
      console.log(e);
    }
  }
})();
