'use strict'

let keys = ["id", "first_name", "last_name", "email", "street", "house"];

function getServerData(url) {
     let fetchOptions = {
        method: "GET",
        mode:"cors",
        cache:"no-cache"
    };

    return fetch(url, fetchOptions).then(
        response => response.json(),
        err=> console.error(err)
    );
}
function startGetUsers(){
    getServerData("http://localhost:3000/users").then(
        data => fillDataTable(data, "userTable")
    )
};
document.querySelector("#getDataButton").addEventListener("click", startGetUsers);


function fillDataTable(data, userTable){
    let table = document.querySelector(`#${userTable}`);
    if(!table){
        console.error(`Table "${userTable}" is not found.`)
        return;
    }


    
    

    let tBody = table.querySelector("tbody");
    tBody.innerHTML = '';
    let newRow = newUserRow();
    tBody.appendChild(newRow);

    for( let row of data){
        let tr = createAnyElement("tr");
        for(let k of keys){
            let td = createAnyElement("td");
            td.innerHTML = row[k];
            tr.appendChild(td);
        }
        let buttonGroup = createBtnGroup();
        tr.appendChild(buttonGroup);
        tBody.appendChild(tr);
    }
}

function createAnyElement(name, attributes){
    let element = document.createElement(name);
    for (let k in attributes){
        element.setAttribute(k, attributes[k]);
    }
    return element;
}

function createBtnGroup(){
    let group = createAnyElement("div", {class:"groupBtn"});
    let info = createAnyElement("button", {class: "info", onlick:"getInfo(this)"});
    info.innerHTML ='<i class="fa fa-refresh" aria-hidden="true"></i>';
    let del = createAnyElement("button", {class: "delete", onclick:"delRow(this)"});
    del.innerHTML ='<i class="fa fa-trash" aria-hidden="true"></i>';

    group.appendChild(info);
    group.appendChild(del);

    let td = createAnyElement("td");
    td. appendChild(group);
    return td;
}

function delRow(btn){
    let tr = btn.parentElement.parentElement.parentElement;
    let id = tr.querySelector("td:first-child").innerHTML;
    let fetchOptions= {
        method:"DELETE",
        mode:"cors",
        cache:"no-cache"
    };

    fetch(`http://localhost:3000/users/${id}`, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then (
        data => {
            startGetUsers();
        }
    )
}
function newUserRow(row){
    let tr = createAnyElement("tr");
    for (let k of keys){
        let td = createAnyElement("td");
        let input = createAnyElement("input", {
            class: "form",
            name: k
        });
        td.appendChild(input);
        tr.appendChild(td);
    }
    let newBtn = createAnyElement("button",{
        class: "success",
        onclick:"createUser(this)"
    });
    newBtn.innerHTML = `<i class="fa fa-plus-circle" aria-hidden="true"></i>`;
    let td = createAnyElement("td");
    td.appendChild(newBtn);
    tr.appendChild(td);

    return tr;
}


function createUser(btn){
let tr = btn.parentElement.parentElement;
let data = getRowData(tr);
delete data.id;
let fetchOptions = {
    method:"POST",
    mode:"cors",
    cache:"no-cache",
    headers:{
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(data)
};
fetch(`http://localhost:3000/users`, fetchOptions).then(
    resp => resp.json(),
    err => console.error(err)
).then(
    data => startGetUsers()
)

}

function getRowData(tr){
let inputs = tr.querySelectorAll("input");
let data = {};
for (let i =0; i< inputs.length; i++){
    data[inputs[i].name] = inputs[i].value;
}
return data;
}