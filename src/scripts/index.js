//Firebase Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://endorsements-1257f-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsements = ref(database, "endorsements");

//DOM Elements
const input = document.getElementById("endor-field");
const publishBtn = document.getElementById("publish-btn");
const endorsementList = document.getElementById("endor-list");

let inputValue = input.value;

publishBtn.addEventListener("click", function () {
  pushToDB();
  input.value = "";
});

function pushToDB() {
  push(endorsements, input.value);
}

function removeFromDB(data) {
  let id = data;
  remove(endorsements);
}

onValue(endorsements, (snapshot) => {
  if (snapshot.exists()) {
    renderEndorsements(snapshot.val());
  } else {
    endorsementList.innerHTML = `They are not any endorsements yet ... :)`;
  }
});

function renderEndorsements(data) {
  
  endorsementList.innerHTML = "";

  let snapshotArray = Object.entries(data);

  for (let i = 0; i < snapshotArray.length; i++) {

    let id = snapshotArray[i][0];
    let value = snapshotArray[i][1];

    endorsementList.innerHTML += `<li>${value}</li>`
  }
}

//Publish -> pushes data to DB and updates on UI
