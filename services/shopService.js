const prompts = require("prompts");

const diskService = require("./diskService");

let db;

//I build my disk by receive informations from the console by using the package "Prompts"
const buildDisk = async (initial) =>
  await prompts([
    {
      type: "text",
      name: "title",
      message: "Title ?",
      initial: initial ? initial.title : ''
    },
    {
      type: "number",
      name: "price",
      message: "Price ?",
      initial: initial ? initial.price : ''
    },
    {
      type: "number",
      name: "quantity",
      message: "Quantity ?",
      initial: initial ? initial.quantity : ''
    },
  ]);

  //Create a function that select a disk in from my DataBase
  //It show me the disks and i can select one of them (by index)
const selectADisk = async (diskList, showPrice = false) => {
  const list = diskList.map(disk => {
    return showPrice ? { title: disk.title, price: disk.price } : { title: disk.title }
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

//Fonction that permit to buy a disk
//Show how many of selected disk remain 
//If remain enougth of disks I can buy them
const buyDisk = async (disk) => {
  try {
    console.log(`Remain ${disk.quantity} disks of ${disk.title}`);
    const quantity = await prompts({
      type: "number",
      name: "value",
      message: "Select a quantity ?",
      validate: (value) => (disk.quantity - value < 0 ? `Not enough quantity` : true),
    });
    disk.quantity -= quantity.value;
    await diskService.update(disk);
  } catch (e) {
    console.log(`Unable to buy this items`);
  }
};

//Show the many options of my main 
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

//Main()
//At first we run the shop and receive a choice 
//We switch the choice and apply the adaptive function 
//At least we run the main too 
const runShop = async (skipDocs = false) => {
  let diskList = 0;
  let selectedDisk = null;

  if (!skipDocs) {
      showDocs();
  }
  //Receive the choice 
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
      selectedDisk.title = updatedDisk.title;
      selectedDisk.price = updatedDisk.price;
      selectedDisk.quantity = updatedDisk.quantity;
      await diskService.update(selectedDisk);
      console.log(`Successful updated this item.`);
      break;
    }
    case 3: {
      diskList = await diskService.getAll();
      selectedDisk = await selectADisk(diskList);
      await diskService.deleteById(selectedDisk._id);
      console.log(`Successful deleted this item.`);
      break;
    }
    case 4: {
      diskList = await diskService.getAll();
      const diskListSummary = diskList.map(disk => {
        return { 
          title: disk.title,
          price: disk.price,
          quantity: disk.quantity
        }
      });
      console.table(diskListSummary);
      break;
    }
    case 5: {
      diskList = await diskService.getAll({ quantity: { $gt: 0 } }); // all disponible list.
      selectedDisk = await selectADisk(diskList, true);
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
