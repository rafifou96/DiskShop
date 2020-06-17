const db = require('./db');

const diskServices = require('./services/diskService');
const diskService = require('./services/diskService');

const start = async() => {

    await db.connection('mongodb://localhost:27017/diskshop');
    console.log('start');

    const disk = {
        name: 'coucou',
        price: 10,
        qte: 5
    };

   await diskService.add(disk);
}

start();