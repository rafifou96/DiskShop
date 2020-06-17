const mongooseClient = require('mongoose');

const connection = async (url) => {

  await mongooseClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

module.exports.connection = connection;
