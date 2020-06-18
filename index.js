const db = require('./db');
const diskServices = require('./services/diskService');
const prompts = require('prompts');
const shopService = require('./Services/shopService');

const start = async() => {

    await db.connection('mongodb://localhost:27017/diskshop');
    console.log('start');

    const disk = {
        name: 'coucou',
        price: 10,
        qte: 5
    };

//    await diskServices.add(disk);
//    await diskServices.delete("5eeb2d1cd059fc324cbe637c");

await shopService.run();

}

start();