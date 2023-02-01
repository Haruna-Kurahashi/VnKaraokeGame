const db = new Dexie("badgeDB");

window.addEventListener("DOMContentLoaded", (event) => {
  const imgC = document.getElementById("c-dur");
  const imgG = document.getElementById("g-dur");
  const imgD = document.getElementById("d-dur");
  const imgA = document.getElementById("a-dur");
  const imgE = document.getElementById("e-dur");
  const imgH = document.getElementById("h-dur");
  const imgFis = document.getElementById("fis-dur");
  const imgCis = document.getElementById("cis-dur");
  const imgF = document.getElementById("f-dur");
  const imgB = document.getElementById("b-dur");
  const imgEs = document.getElementById("es-dur");
  const imgAs = document.getElementById("as-dur");
  const imgDes = document.getElementById("des-dur");
  const imgGes = document.getElementById("ges-dur");
  const imgCes = document.getElementById("ces-dur");

  db.version(1).stores({
    badges: "key,badge,num",
  });
  // db.badges.toArray().then(function (records) {
  //   console.log(records);
  // });

  db.badges
    .where("key")
    .equals("C")
    .each((records) => {
      console.log(records.badge);
      switch (records.badge) {
        case "Excellent!":
          imgC.src = "../img/gold.svg";
          break;
        case "Great!":
          imgC.src = "../img/silver.svg";
          break;
        case "Good!":
          imgC.src = "../img/bronze.svg";
          break;
        case "unbadged":
          imgC.src = "../img/unbadged.svg";
          break;
      }
    });


db.badges
.where("key")
.equals("G")
.each((records) => {
  console.log(records.badge);
  switch (records.badge) {
    case "Excellent!":
      imgG.src = "../img/gold.svg";
      break;
    case "Great!":
      imgG.src = "../img/silver.svg";
      break;
    case "Good!":
      imgG.src = "../img/bronze.svg";
      break;
    case "unbadged":
      imgG.src = "../img/unbadged.svg";
      break;
  }
});
    
db.badges
.where("key")
.equals("D")
.each((records) => {
  console.log(records.badge);
  switch (records.badge) {
    case "Excellent!":
      imgD.src = "../img/gold.svg";
      break;
    case "Great!":
      imgD.src = "../img/silver.svg";
      break;
    case "Good!":
      imgD.src = "../img/bronze.svg";
      break;
    case "unbadged":
      imgD.src = "../img/unbadged.svg";
      break;
  }
});
    
db.badges
.where("key")
.equals("A")
.each((records) => {
  console.log(records.badge);
  switch (records.badge) {
    case "Excellent!":
      imgA.src = "../img/gold.svg";
      break;
    case "Great!":
      imgA.src = "../img/silver.svg";
      break;
    case "Good!":
      imgA.src = "../img/bronze.svg";
      break;
    case "unbadged":
      imgA.src = "../img/unbadged.svg";
      break;
  }
});
    
db.badges
.where("key")
.equals("E")
.each((records) => {
  console.log(records.badge);
  switch (records.badge) {
    case "Excellent!":
      imgE.src = "../img/gold.svg";
      break;
    case "Great!":
      imgE.src = "../img/silver.svg";
      break;
    case "Good!":
      imgE.src = "../img/bronze.svg";
      break;
    case "unbadged":
      imgE.src = "../img/unbadged.svg";
      break;
  }
});
    
db.badges
.where("key")
.equals("H")
.each((records) => {
  console.log(records.badge);
  switch (records.badge) {
    case "Excellent!":
      imgH.src = "../img/gold.svg";
      break;
    case "Great!":
      imgH.src = "../img/silver.svg";
      break;
    case "Good!":
      imgH.src = "../img/bronze.svg";
      break;
    case "unbadged":
      imgH.src = "../img/unbadged.svg";
      break;
  }
});
    
db.badges
.where("key")
.equals("Fis")
.each((records) => {
  console.log(records.badge);
  switch (records.badge) {
    case "Excellent!":
      imgFis.src = "../img/gold.svg";
      break;
    case "Great!":
      imgFis.src = "../img/silver.svg";
      break;
    case "Good!":
      imgFis.src = "../img/bronze.svg";
      break;
    case "unbadged":
      imgFis.src = "../img/unbadged.svg";
      break;
  }
});
    
db.badges
.where("key")
.equals("Cis")
.each((records) => {
  console.log(records.badge);
  switch (records.badge) {
    case "Excellent!":
      imgCis.src = "../img/gold.svg";
      break;
    case "Great!":
      imgCis.src = "../img/silver.svg";
      break;
    case "Good!":
      imgCis.src = "../img/bronze.svg";
      break;
    case "unbadged":
      imgCis.src = "../img/unbadged.svg";
      break;
  }
});
    
db.badges
.where("key")
.equals("F")
.each((records) => {
  console.log(records.badge);
  switch (records.badge) {
    case "Excellent!":
      imgF.src = "../img/gold.svg";
      break;
    case "Great!":
      imgF.src = "../img/silver.svg";
      break;
    case "Good!":
      imgF.src = "../img/bronze.svg";
      break;
    case "unbadged":
      imgF.src = "../img/unbadged.svg";
      break;
  }
});
    
db.badges
.where("key")
.equals("B")
.each((records) => {
  console.log(records.badge);
  switch (records.badge) {
    case "Excellent!":
      imgB.src = "../img/gold.svg";
      break;
    case "Great!":
      imgB.src = "../img/silver.svg";
      break;
    case "Good!":
      imgB.src = "../img/bronze.svg";
      break;
    case "unbadged":
      imgB.src = "../img/unbadged.svg";
      break;
  }
});
    
db.badges
.where("key")
.equals("F")
.each((records) => {
  console.log(records.badge);
  switch (records.badge) {
    case "Excellent!":
      imgEs.src = "../img/gold.svg";
      break;
    case "Great!":
      imgEs.src = "../img/silver.svg";
      break;
    case "Good!":
      imgEs.src = "../img/bronze.svg";
      break;
    case "unbadged":
      imgEs.src = "../img/unbadged.svg";
      break;
  }
});
    
db.badges
.where("key")
.equals("As")
.each((records) => {
  console.log(records.badge);
  switch (records.badge) {
    case "Excellent!":
      imgAs.src = "../img/gold.svg";
      break;
    case "Great!":
      imgAs.src = "../img/silver.svg";
      break;
    case "Good!":
      imgAs.src = "../img/bronze.svg";
      break;
    case "unbadged":
      imgAs.src = "../img/unbadged.svg";
      break;
  }
});
    
db.badges
.where("key")
.equals("Des")
.each((records) => {
  console.log(records.badge);
  switch (records.badge) {
    case "Excellent!":
      imgDes.src = "../img/gold.svg";
      break;
    case "Great!":
      imgDes.src = "../img/silver.svg";
      break;
    case "Good!":
      imgDes.src = "../img/bronze.svg";
      break;
    case "unbadged":
      imgDes.src = "../img/unbadged.svg";
      break;
  }
});
    
db.badges
.where("key")
.equals("Ges")
.each((records) => {
  console.log(records.badge);
  switch (records.badge) {
    case "Excellent!":
      imgGes.src = "../img/gold.svg";
      break;
    case "Great!":
      imgGes.src = "../img/silver.svg";
      break;
    case "Good!":
      imgGes.src = "../img/bronze.svg";
      break;
    case "unbadged":
      imgGes.src = "../img/unbadged.svg";
      break;
  }
});
    
db.badges
.where("key")
.equals("Ces")
.each((records) => {
  console.log(records.badge);
  switch (records.badge) {
    case "Excellent!":
      imgCes.src = "../img/gold.svg";
      break;
    case "Great!":
      imgCes.src = "../img/silver.svg";
      break;
    case "Good!":
      imgCes.src = "../img/bronze.svg";
      break;
    case "unbadged":
      imgCes.src = "../img/unbadged.svg";
      break;
  }
});
});
