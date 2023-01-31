const db = new Dexie("badgeDB");

db.version(1).stores({
    badges: "key,badge,num"
  });
db.badges
    .toArray()
    .then(function (records) {
      console.log(records);
    });