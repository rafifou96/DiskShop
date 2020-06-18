const prompts = require("prompts");

const diskService = require("./diskService");

let db;

const buildDisk = async () =>
  await prompts([
    {
      type: "text",
      name: "title",
      message: "Title ?",
    },
    {
      type: "number",
      name: "price",
      message: "Price ?",
    },
    {
      type: "number",
      name: "quantity",
      message: "Quantity ?",
    },
  ]);

const selectADisk = async (diskList) => {
  const list = await diskList.map((disc, index) => {
    return { Name: disc.title };
  });

  console.log("Select a disk number in the list");
  console.table(list);

  const diskIndex = await prompts({
    type: "number",
    name: "value",
    message: "Select a disk by index ?",
    validate: (value) => (value >= list.length ? `Index not found` : true),
  });

  return diskList[diskIndex.value];
};

const buyDisk = async (disk) => {
  try {
    console.log(`Remain ${disk.qty} for ${disk.title}`);
    const qty = await prompts({
      type: "number",
      title: "value",
      message: "Select a qty ?",
      validate: (value) => (disk.qty - value < 0 ? `Not enough qty` : true),
    });

    disk.qty -= qty.value;
    await diskService.update(disk);
  } catch (e) {
    console.log(`Unable to buy this items`);
  }
};

const showDocs = () =>
  console.log(`
***************************
Welcome to 108 disk shop !!
***************************
0 - Exit
1 - Add disk
2 - Update disk
3 - Delete disk
4 - Get all disks
5 - Buy disk
***************************
`);

const runShop = async (skipDocs = false) => {
  let diskList = 0;
  let selectedDisk = null;

  if (!skipDocs) {
      showDocs();
  }

  const choice = await prompts({
    type: "number",
    name: "value",
    message: "Make a choice ?",
  });

  switch (choice.value) {
    case 1: {
      await diskService.add(await buildDisk());
      console.log(`Successful added this item.`);
      break;
    }
    case 2: {
      diskList = await diskService.getAll();
      selectedDisk = await selectADisk(diskList);
      const updatedDisk = await buildDisk(selectedDisk);
      await diskService.update(updatedDisk);
      console.log(`Successful updated this item.`);
      break;
    }
    case 3: {
      diskList = await diskService.getAll();
      selectedDisk = await selectADisk(diskList);
      await diskService.delete(selectedDisk._id);
      console.log(`Successful deleted this item.`);
      break;
    }
    case 4: {
      diskList = await diskService.getAll({}, true);
      console.table(diskList);
      break;
    }
    case 5: {
      diskList = await diskService.getAll({ qty: { $gt: 0 } }); // all disponible list.
      selectedDisk = await selectADisk(diskList);
      await buyDisk(selectedDisk);
      console.log(`Successful buy this item.`);
      break;
    }
    case 0: {
        console.log(`\nThank you!`);
        db.connection.close();
      return;
    }
    default:
      console.log(`Sorry, choice is invalid!\n`);
      runShop(true);
      return;
  }

  runShop();
};

const run = (_db) => {
    db = _db;
    runShop();
};

module.exports.run = run;
