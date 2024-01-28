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

function removeFromDB(id) {

  let findElement = ref(database, `endorsements/${id}`)

  remove(findElement);
}

onValue(endorsements, (snapshot) => {
  if (snapshot.exists()) {
    renderEndorsements(snapshot.val());
  } else {
    endorsementList.innerHTML = `no endorsements bruh ... `;
  }
});

function renderEndorsements(data) {
  
  endorsementList.innerHTML = "";

  let snapshotArray = Object.entries(data);

  for (let i = 0; i < snapshotArray.length; i++) {

    let id = snapshotArray[i][0];
    let value = snapshotArray[i][1];

    let listEl = document.createElement("li")
    listEl.textContent =`${value}`;

    listEl.addEventListener("click", function(){
      removeFromDB(id);
      console.log(id);
    });

    endorsementList.append(listEl);

  }

}

//Publish -> pushes data to DB and updates on UI
