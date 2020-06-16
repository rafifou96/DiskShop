const db = require('./db');

db.connection(function (db) {
  console.log(db);
});

if (process.argv[2] == 'list') { 
  console.log('list of disk');
} else if (process.argv[2] == 'add') { 
    console.log('add disk');
}