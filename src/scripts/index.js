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

const from = document.getElementById("from-input");
const to = document.getElementById("to-input");

const publishBtn = document.getElementById("publish-btn");
const endorsementList = document.getElementById("endor-list");

let inputValue = input.value;

publishBtn.addEventListener("click", function () {
  pushToDB();
  input.value = "";
});

function pushToDB() {

  push(
    endorsements,
    {
      "endorsement":`${input.value}`,
      "from":`${from.value}`,
      "to": `${to.value}`,
      "likes" : 0
    }
  );
}

function removeFromDB(id) {
  let findElement = ref(database, `endorsements/${id}`);

  remove(findElement);
}

onValue(endorsements, (snapshot) => {
  if (snapshot.exists()) {
    renderEndorsements(snapshot.val());
  } else {
    endorsementList.innerHTML = `No Endorsements Bruh ... `;
  }
});

function renderEndorsements(data) {
  endorsementList.innerHTML = "";

  let snapshotArray = Object.entries(data);

  for (let i = 0; i < snapshotArray.length; i++) {
    let id = snapshotArray[i][0];
    
    let msgFrom = snapshotArray[i][1].from;
    let msgTo = snapshotArray[i][1].to;
    let endorsementMsg = snapshotArray[i][1].endorsement;

    let listEl = document.createElement("li");
    let toEl = document.createElement("h3");
    let fromEl = document.createElement("h3");
    let numLikes = document.createElement("h3");

    toEl.textContent = `To ${msgTo}`;
    fromEl.textContent = `From ${msgFrom}`;
    numLikes.textContent = `❤️ ${snapshotArray[i][1].likes}`

    listEl.append(toEl);
    listEl.append(endorsementMsg);
    listEl.append(fromEl);
    listEl.append(numLikes)
    
    listEl.addEventListener("dblclick", function () {
      removeFromDB(id);;
    });

    numLikes.addEventListener("click", function() {
      numLikes.textContent = `❤️ ${1}`
    })

    endorsementList.append(listEl);
  }
}

//Publish -> pushes data to DB and updates on UI
