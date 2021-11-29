

let createAnyElement = (name, attributes) => {
  let element = document.createElement(name);
  for (let attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
  return element;
};

function validateForm(element) {
  let inputs = element.querySelectorAll("input");

  let regexpTest = (regExp, input) => {
    if (regExp.test(input.value)) {
      return true;
    } else {
      let divElement = createAnyElement("div", { class: "redColor" });
      divElement.innerHTML = "Validációs hiba: " + input.name;
      let body = document.getElementsByTagName("body")[0];
      body.insertBefore(divElement, body.firstChild);

      input.classList.add("borderColorRed");
      setTimeout(() => {
        divElement.remove();
        input.classList.remove("borderColorRed");
      }, 5000);
      return false;
    }
  };

  let regExp;
  let first_name, last_name, email, street, house;
  for (let i = 0; i < inputs.length; i++) {
    switch (inputs[i].name) {
      case "first_name":
        regExp = /^[a-zA-Z]{0,10}$/;
        first_name = regexpTest(regExp, inputs[i]);
        break;
      case "last_name":
        regExp = /^[a-zA-Z]{0,10}$/;
        last_name = regexpTest(regExp, inputs[i]);
        break;
      case "email":
        regExp =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        email = regexpTest(regExp, inputs[i]);
        break;
      case "street":
        regExp = /^[a-zA-Z]{0,10}$/;
        street = regexpTest(regExp, inputs[i]);
        break;
      case "house":
        regExp = /^[0-9]{0,8}$/;
        house = regexpTest(regExp, inputs[i]);
        break;
    }
  }
  return first_name && last_name && email && street && house;
}

let getRowData = (element) => {
  let inputs = element.querySelectorAll("input");
  let data = {};

  for (let i = 0; i < inputs.length; i++) {
    data[inputs[i].name] = inputs[i].value;
  }
  return data;
};

let showSuccessMessage = () => {
  let divElement = createAnyElement("div", { class: "greenColor" });
  divElement.innerHTML = "Sikeres mentés";
  let body = document.getElementsByTagName("body")[0];
  body.insertBefore(divElement, body.firstChild);

  setTimeout(() => {
    divElement.remove();
  }, 5000);
};

export {
  createAnyElement,
  validateForm,
  getRowData,
  showSuccessMessage
};
