const DiskModel = require("../db/models").DiskModel;

//Add a disk
const add = async (diskToAdd) => {
  try {
    return await DiskModel.create(diskToAdd);
  } catch (e) {
    console.log("Failed to add the disk.", e);
  }
};

//Update a disk
const update = async (diskToUpdate) => {
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
const getAll = async (query = {}) => {
  try {
    return await DiskModel.find(query);
  } catch (e) {
    console.log("Cannot get all theses disk.", e);
  }
};

//Delete a disk
const deleteById = async (id) => {
  try {
    return await DiskModel.findByIdAndDelete(id);
  } catch (e) {
    console.log("failed to deleted disk", e);
  }
};

//Get disk by id
const getById = async (id) => {
  try {
    return await DiskModel.findOne({ _id: id });
  } catch (e) {
    console.log("Cannot get this disk.", e);
  }
};

module.exports = {
  add,
  update,
  getAll,
  deleteById,
  getById,
};
