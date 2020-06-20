const connect = require("./db/connect");

const config = require("./db/config");

const shopService = require("./Services/shopService");

const start = async () => {
  let db;
  try {
    db = await connect(config.DB_URI);
  } catch (e) {
    console.error("Unable to connect to Database", e);
    process.exit(1);
  }

  shopService.run(db);
};

start();
