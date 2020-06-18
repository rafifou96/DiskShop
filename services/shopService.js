//const diskModel = require('../models/diskModel');
const diskService = require('./diskService');
const prompts = require('prompts');


const selectADisk = async (diskList) => {

    const list = await diskList.map((disc, index) => {
        return {Name: disc.name};
    });

    console.log('Select a disk number in the list');
    console.table(list);

    const diskIndex = await prompts({
        type: 'number',
        name: 'value',
        message: 'Select a disk by index ?',
        validate: value => value >= list.length ? `Index not found` : true
    });

    return diskList[diskIndex.value];
};

const buyDisk = async (disk) => {
    try {
        console.log(`Remain ${disk.qty} for ${disk.name}`);
        const qty = await prompts({
            type: 'number',
            name: 'value',
            message: 'Select a qty ?',
            validate: value => disk.qty - value < 0 ? `Not enough qty` : true
        });

        disk.qty -= qty.value;
        await diskService.update(disk);

    } catch (e) {
        console.log(`Unable to buy this items`);
    }
};

const runShop = async () => {
    let choice = 0;
    let diskList = 0;
    let selectedDisk = null;
    do {
        console.log('********************************');
        console.log('Welcome to 108 disk shop !!');
        console.log('********************************');
        console.log('1 - Add disk');
        console.log('2 - Update disk');
        console.log('3 - Delete disk');
        console.log('4 - Get all disks');
        console.log('5 - Buy disk');
        console.log('********************************');
        choice = await prompts({
            type: 'number',
            name: 'myChoice',
            message: 'Make a choice ?',
        });
        switch (choice.value) {
            case 1:
                const disk = await buildDisk();
                await diskService.add(disk);
                console.log(`Successful added this item.`);
                break;
            case 2:
                diskList = await diskService.getAll();
                selectedDisk = await selectADisk(diskList);
                //const updatedDisk = await buildDisk(selectedDisk);
                await diskService.update(updatedDisk);
                console.log(`Successful updated this item.`);
                break;
            case 3:
                diskList = await diskService.getAll();
                selectedDisk = await selectADisk(diskList);
                await diskService.delete(selectedDisk._id);
                console.log(`Successful deleted this item.`);
                break;
            case 4:
                diskList = await diskService.getAll({}, true);
                console.table(diskList);
                break;
            case 5:
                diskList = await diskService.getAll({qty: {$gt: 0}}); // all disponible list.
                selectedDisk = await selectADisk(diskList);
                await buyDisk(selectedDisk);
                console.log(`Successful buy this item.`)
                break;
            case -1:
                break;
            default:
                console.log(`Invalid input !`)
                break;
        }
    } while (choice.value >= 0);

    console.log(`Shop closed !`);
};

module.exports.run = runShop;