const diskModel = require('../models/diskModel');

//Add a disk 
const addDisk = async(diskToAdd) =>{
    try{
        const result = await diskModel.create(diskToAdd);
        return result;
    }catch(e){
        console.log('Failed to add the disk.');
    }
}

//Update a disk 
const updateDisk = async(diskToUpdate) =>{
    try{
        console.log(diskToUpdate);
        const result = await diskModel.findByIdAndUpdate(diskToUpdate._id,diskToUpdate);
        return result;
    }catch(e){
        console.log('Failed to update this disk.');
    }
}
 
// //Get all disks
// const getAllDisks = async(query :{}= {} , lean :Boolean = false) =>{
//     try{
//         const results = lean ? await diskModel.find(query).lean() : await diskModel.find() ??????
//         return results;
//     }catch(e){
//         console.log('Failed to get all disks.');
//     }
// }

//Delete a disk 
const deleteDiskById = async(id)=>{
    try{
        const result = await diskModel.findByIdAndDelete(id);
        console.log('disk delete from the DB');
    }catch(e){
        console.log('failed to deleted disk');
    }
}

module.exports = { add:addDisk, update:updateDisk, delete:deleteDiskById };