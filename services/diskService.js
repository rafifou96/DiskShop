const DiskModel = require("../db/models").DiskModel;

//Add a disk
const addDisk = async (diskToAdd) => {
  try {
    return await DiskModel.create(diskToAdd);
  } catch (e) {
    console.log("Failed to add the disk.", e);
  }
};

//Update a disk
const updateDisk = async (diskToUpdate) => {
  try {
    return await DiskModel.findByIdAndUpdate(
      diskToUpdate._id,
      diskToUpdate
    );
  } catch (e) {
    console.log("Failed to update this disk.", e);
  }
};

//Get all disks
const getAllDisk = async (query = {}, lean = false) => {
  try {
    const results = await DiskModel.find(query);
    if (lean) {
      return results.lean();
    }
    return results;
  } catch (e) {
    console.log("Cannot get all theses disk.", e);
  }
};

//Delete a disk
const deleteDiskById = async (id) => {
  try {
    return await DiskModel.findByIdAndDelete(id);
  } catch (e) {
    console.log("failed to deleted disk", e);
  }
};

//Get disk by id
const getDiskById = async (id) => {
  try {
    return await DiskModel.findOne({ _id: id });
  } catch (e) {
    console.log("Cannot get this disk.", e);
  }
};

module.exports = {
  add: addDisk,
  update: updateDisk,
  getAll: getAllDisk,
  delete: deleteDiskById,
  getDisk: getDiskById,
};
