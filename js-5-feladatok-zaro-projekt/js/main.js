"use strict";

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

    let buttonGroup = createTableButtons();
    let td = createAnyElement("td");
    td.appendChild(buttonGroup);
    tr.appendChild(td);
    tBody.appendChild(tr);
  }
}

let createAnyElement = (name, attributes) => {
  let element = document.createElement(name);
  for (let attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
  return element;
}

let createTableButtons = () => {
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

  return buttonGroup;
}

let startEditingUser = (btn) => {
  let saveUserButton = createAnyElement("button", {
    class: "save",
    type: "button",
    onclick: "saveUser(this)",
  })
  saveUserButton.innerHTML = 'save';
  btn.parentElement.appendChild(saveUserButton);

  let cancelEditingUserButton = createAnyElement("button", {
    type: "button",
    class: "cancel",
    onclick:"cancelEditingUser(this)"
  })
  
  cancelEditingUserButton.innerHTML = 'cancel';
  btn.parentElement.appendChild(cancelEditingUserButton);
  btn.remove();
}

let cancelEditingUser = (btn) => {
  let td = btn.parentElement.parentElement; // a td referenciáját elmentem későbbi használat céljából
  btn.parentElement.remove(); // a td tartalmát kiürítem

  let buttonGroup = createTableButtons(); // létrehozom a td leendő, új tartalmát, a gombokat(edit és delete)
  td.appendChild(buttonGroup); // a td-be berakom az új tartalmat
}

let deleteUser = async (btn) => {
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

let createUser = async(btn) => {
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

function validateForm(element) {
  let inputs = element.querySelectorAll("input");

  let regexpTest = (regExp, inputValue) => {
    if (regExp.test(inputValue)) {
      return true;
    } else {
      let spanElement = createAnyElement("span", {class: "redColor"});
      spanElement.innerHTML = "Validációs hiba!";
      let body = document.getElementsByTagName("body")[0];
      body.insertBefore(spanElement, body.firstChild);
      setTimeout(()=>spanElement.remove(), 5000);
      return false;
    }
  }

  let regExp;
  let first_name, last_name, email, street, house; 
  for (let i = 0; i < inputs.length; i++) {
    switch(inputs[i].name) {
      case "first_name":
        regExp = /^[a-zA-Z]{0,10}$/;
        first_name = regexpTest(regExp, inputs[i].value);
        break;
      case "last_name":
        regExp = /^[a-zA-Z]{0,10}$/;
        last_name = regexpTest(regExp, inputs[i].value);
        break;
      case "email":
        regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        email =  regexpTest(regExp, inputs[i].value);
        break;
      case "street":
        regExp = /^[a-zA-Z]{0,10}$/;
        street = regexpTest(regExp, inputs[i].value);
        break;
      case "house":
        regExp = /^[0-9]{0,8}$/;
        house = regexpTest(regExp, inputs[i].value);
        break;
      }
  }
  return first_name && last_name && email && street && house;
}

let getRowData = element => {
  let inputs = element.querySelectorAll("input");
  let data = {};

  for (let i = 0; i < inputs.length; i++) {
    data[inputs[i].name] = inputs[i].value;
  }
  return data;
}

let saveUser = async(btn) => {
  let tr = btn.parentElement.parentElement.parentElement;

  if (!validateForm(tr)) return;

  //az adott sorból kinyeri az inputok értékeit és js objektumba pakolja
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

  //menti a usert a json-be
  await fetch(`http://localhost:3000/users/${data.id}`, fetchOptions)
    .then(
      (resp) => resp.json(),
      (err) => console.error(err)
    )
    .then((data) => getUsers());
}