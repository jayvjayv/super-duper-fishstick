//Firebase Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://playground-5069d-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsements = ref(database, "endorsements")

//DOM Elements
const input = document.getElementById("endor-field");
const publishBtn = document.getElementById("publish-btn");
const endorsementList = document.getElementById("endor-list");

input.addEventListener("click", function(){
    push(endorsements, input.value);
    endorsementList.innerHTML += `<li>${input.value}</li>`
    input.value = ""
    
})
