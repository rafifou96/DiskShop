const DiskModel = require("../models/diskModel");

//Add a disk
const addDisk = async (diskToAdd) => {
  try {
    const result = await DiskModel.create(diskToAdd);
    return result;
  } catch (e) {
    console.log("Failed to add the disk.", e);
  }
};

//Update a disk
const updateDisk = async (diskToUpdate) => {
  try {
    console.log(diskToUpdate);
    const result = await DiskModel.findByIdAndUpdate(
      diskToUpdate._id,
      diskToUpdate
    );
    return result;
  } catch (e) {
    console.log("Failed to update this disk.");
  }
};

//Get all disks
const getAllDisk = async (query = {}, lean = false) => {
  try {
    const results = lean
      ? await DiskModel.find(query).lean()
      : await DiskModel.find(query);
    return results;
  } catch (e) {
    console.log(`Cannot get all theses disk.`);
  }
};

//Delete a disk
const deleteDiskById = async (id) => {
  try {
    const result = await DiskModel.findByIdAndDelete(id);
    console.log("disk delete from the DB");
  } catch (e) {
    console.log("failed to deleted disk");
  }
};

//Get disk by id
const getDiskById = async (id) => {
  try {
    const result = await DiskModel.findOne({ _id: id });
    return result;
  } catch (e) {
    console.log(`Cannot get this disk.`);
  }
};

module.exports = {
  add: addDisk,
  update: updateDisk,
  getAll: getAllDisk,
  delete: deleteDiskById,
  getDisk: getDiskById,
};
