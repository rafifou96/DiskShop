const mongooseClient = require('mongoose');

const diskShema = new mongooseClient.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qte: { type: Number, required: true },
});

const diskModel = mongooseClient.model('DiskModel', diskShema);

module.exports = diskModel;