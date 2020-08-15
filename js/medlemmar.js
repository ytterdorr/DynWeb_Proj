import MEDLEMMAR from "./medlemsinfo.js";

/* create table of medlemmar */
function quickCreate(elementType, innerHTML = "") {
  return Object.assign(document.createElement(elementType), { innerHTML });
}

function createMemberTable() {
  let medlemTable = document.querySelector(".medlemslista");
  let t_head = document.createElement("thead");
  let th_row = document.createElement("tr");
  th_row.appendChild(quickCreate("th", "Förnamn"));
  th_row.appendChild(quickCreate("th", "Efternamn"));
  th_row.appendChild(quickCreate("th", "Epost"));
  th_row.appendChild(quickCreate("th", "Telefon"));
  t_head.appendChild(th_row);
  medlemTable.appendChild(t_head);

  let t_body = quickCreate("tbody");

  for (let medlem of MEDLEMMAR) {
    let tr = quickCreate("tr");
    tr.appendChild(quickCreate("td", medlem.fnamn));
    tr.appendChild(quickCreate("td", medlem.enamn));
    tr.appendChild(quickCreate("td", medlem.epost));
    tr.appendChild(quickCreate("td", medlem.telefon));
    t_body.appendChild(tr);
  }
  medlemTable.appendChild(t_body);
}

/* Password should be pulled from a server... But anyway */
const PASSWORD = "Djupvik";
function checkPassword(e) {
  e.preventDefault();
  let error = document.querySelector("#error-field");
  let pwd = document.querySelector("#member-password").value;
  let form = console.log("Password:", pwd);
  if (pwd == PASSWORD) {
    createMemberTable();
    error.innerHTML = "";
    document.querySelector(".password-protected").classList.add("hidden");
  } else {
    error.innerHTML = "Felaktigt lösenord";
  }
  return false;
}

document
  .querySelector("#password-check-btn")
  .addEventListener("click", checkPassword);

document
  .querySelector("#password-form")
  .addEventListener("submit", checkPassword);
console.log("Laddat medlemmar.js");
