"use strict";

const keys = ["id", "first_name", "last_name", "email", "street", "house"];

window.onload = () => {
  getUsers();
}

function getUsers() {
  getServerData("http://localhost:3000/users").then((data) =>
    fillUsersTable(data, "usersTable")
  );
}

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

function fillUsersTable(data, usersTable) {
  let table = document.querySelector(`#${usersTable}`);

  let tBody = table.querySelector("tbody");
  tBody.innerHTML = "";

  for (let row of data) {
    let tr = createAnyElement("tr");
    for (let key of keys) {
      let td = createAnyElement("td");
      let input = createAnyElement("input", {
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

    let tableButtons = createTableButtons();
    tr.appendChild(tableButtons);
    tBody.appendChild(tr);
  }
}

function createAnyElement(name, attributes) {
  let element = document.createElement(name);
  for (let attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
  return element;
}

function createTableButtons() {
  let buttonGroup = createAnyElement("div", { class: "groupBtn" });
  let editButton = createAnyElement("button", {
    class: "edit",
    type: "button",
    onclick: "startEditingUser(this)",
  });
  editButton.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
  let deleteButton = createAnyElement("button", {
    class: "delete",
    type: "button",
    onclick: "deleteUser(this)",
  });
  deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

  buttonGroup.appendChild(editButton);
  buttonGroup.appendChild(deleteButton);

  let td = createAnyElement("td");
  td.appendChild(buttonGroup);
  return td;
}

function startEditingUser(btn) {
  let saveUserButton = createAnyElement("button", {
    type: "button"
  })
  saveUserButton.innerHTML = 'save';
  btn.parentElement.appendChild(saveUserButton);

  let cancelEditingUserButton = createAnyElement("button", {
    type: "button"
  })
  cancelEditingUserButton.innerHTML = 'cancel';
  btn.parentElement.appendChild(cancelEditingUserButton);
  btn.remove();
}

async function deleteUser(btn) {
  let tr = btn.parentElement.parentElement.parentElement;
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

async function createUser(btn) {
  let form = document.getElementById("form");
  let data = getRowData(form);
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

  await fetch(`http://localhost:3000/users`, fetchOptions)
    .then(
      (resp) => resp.json(),
      (err) => console.error(err)
    )
    .then((data) => getUsers());
}

function getRowData(element) {
  let inputs = element.querySelectorAll("input");
  let data = {};
  for (let i = 0; i < inputs.length; i++) {
    data[inputs[i].name] = inputs[i].value;
  }
  return data;
}

async function saveUser(btn) {
  let tr = btn.parentElement.parentElement.parentElement;
  let data = getRowData(tr);

  let fetchOptions = {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  await fetch(`http://localhost:3000/users/${data.id}`, fetchOptions)
    .then(
      (resp) => resp.json(),
      (err) => console.error(err)
    )
    .then((data) => getUsers());
}
