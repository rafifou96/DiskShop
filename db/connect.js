const mongoose = require('mongoose');

const connect = async (url) => await mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = connect;
