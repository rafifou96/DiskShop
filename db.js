const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";

const dbName = "diskshop";

function connection(callback) {
  MongoClient.connect(url, function (err, client) {
    if (err) {
      callback(null);
      return;
    }
  
    const db = client.db(dbName);
    db.collection('disks');

    callback(db);

    // client.close();
  });
}

module.exports.connection = connection;
