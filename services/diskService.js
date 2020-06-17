const diskModel = require('../models/diskModel');

const addDisk = async(diskToAdd) =>{

    try{
        const result = await diskModel.create(diskToAdd);
        return result;
    }catch(e){
        console.log('failed to add disk')
    }
}

// const updateDisk = async(diskToUpdate) =>{

//     try{
//         const result = await diskModel.findByI(diskToUpdate);
//         return result;
//     }catch(e){
//         console.log('failed to update disk')
//     }
// }

module.exports = { add : addDisk};