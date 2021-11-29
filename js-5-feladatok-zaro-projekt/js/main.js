"use strict";
import * as Utility from './utility.js';

const keys = ["id", "first_name", "last_name", "email", "street", "house"];

window.onload = () => {
  getUsers();
}

let getUsers = () => getServerData("http://localhost:3000/users").then((data) =>
fillUsersTable(data, "usersTable"));

async function getServerData(url) {
  let fetchOptions = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
  };

  return await fetch(url, fetchOptions).then(
    (response) => response.json(),
    (err) => console.error(err)
  );
}

let fillUsersTable = (data, usersTable) => {
  let table = document.querySelector(`#${usersTable}`);

  let tBody = table.querySelector("tbody");
  tBody.innerHTML = "";

  for (let row of data) {
    let tr = Utility.createAnyElement("tr");
    for (let key of keys) {
      let td = Utility.createAnyElement("td");
      let input = Utility.createAnyElement("input", {
        class: "control",
        value: row[key],
        name: key,
      });

      if (key == "id") {
        input.setAttribute("readonly", true);
      }
      td.appendChild(input);
      tr.appendChild(td);
    }

    let buttonGroup = createTableButtons();
    let td = Utility.createAnyElement("td");
    td.appendChild(buttonGroup);
    tr.appendChild(td);
    tBody.appendChild(tr);
  }
}

let startEditingUser = (event) => {
  let saveUserButton = Utility.createAnyElement("button", {
    class: "save",
    type: "button"
  });
  saveUserButton.innerHTML = "save";
  saveUserButton.addEventListener('click', saveUser);
  event.currentTarget.parentElement.appendChild(saveUserButton);

  let cancelEditingUserButton = Utility.createAnyElement("button", {
    type: "button",
    class: "cancel"
  });

  cancelEditingUserButton.innerHTML = "cancel";
  cancelEditingUserButton.addEventListener('click', cancelEditingUser);
  event.currentTarget.parentElement.appendChild(cancelEditingUserButton);
  event.currentTarget.remove();
};

let cancelEditingUser = (event) => {
  let td = event.currentTarget.parentElement.parentElement; // a td referenciáját elmentem későbbi használat céljából
  event.currentTarget.parentElement.remove(); // a td tartalmát kiürítem

  let buttonGroup = createTableButtons(); // létrehozom a td leendő, új tartalmát, a gombokat(edit és delete)
  td.appendChild(buttonGroup); // a td-be berakom az új tartalmat
};

let saveUser = async(event) => {
  let tr = event.currentTarget.parentElement.parentElement.parentElement;

  if (!Utility.validateForm(tr)) return;

  //az adott sorból kinyeri az inputok értékeit és js objektumba pakolja
  let data = Utility.getRowData(tr);

  let fetchOptions = {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  //menti a usert a json-be
  await fetch(`http://localhost:3000/users/${data.id}`, fetchOptions)
    .then(
      (resp) => resp.json(),
      (err) => console.error(err)
    )
    .then((data) => {
      Utility.showSuccessMessage();
      getUsers();
    });
}

let createTableButtons = () => {
  let buttonGroup = Utility.createAnyElement("div", { class: "groupBtn" });
  let editButton = Utility.createAnyElement("button", {
    class: "edit",
    type: "button"
  });
  editButton.addEventListener('click', startEditingUser),
  editButton.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';

  let deleteButton = Utility.createAnyElement("button", {
    class: "delete",
    type: "button"
  });
  deleteButton.addEventListener('click', deleteUser),
  deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

  buttonGroup.appendChild(editButton);
  buttonGroup.appendChild(deleteButton);

  return buttonGroup;
};

let deleteUser = async (event) => {
  let tr = event.currentTarget.parentElement.parentElement.parentElement;
  let id = tr
    .querySelector("td:first-child")
    .getElementsByTagName("input")[0].value;

  let fetchOptions = {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
  };

  await fetch(`http://localhost:3000/users/${id}`, fetchOptions)
    .then(
      (resp) => resp.json(),
      (err) => console.error(err)
    )
    .then((data) => {
      getUsers();
    });
}

let createUser = async(btn) => {
  let form = document.getElementById("form");
  if (!Utility.validateForm(form)) return;

  let data = Utility.getRowData(form);
  delete data.id;

  let fetchOptions = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch(`http://localhost:3000/users`, fetchOptions);
    await response.json();
    Utility.showSuccessMessage();
    getUsers();
  } catch(err) {
    console.error(err)
  }
}

document.getElementById("createUserButton").addEventListener("click", createUser);