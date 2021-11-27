'use strict'

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

document.querySelector("#getDataButton").addEventListener("click", function(){
    getServerData("http://localhost:3000/users").then(
        data => fillDataTable(data, "userTable")
    );
});

function fillDataTable(data, userTable){
    let table = document.querySelector(`#${userTable}`);
    if(!table){
        console.error(`Table "${userTable}" is not found.`)
        return;
    }
    let tBody = table.querySelector("tbody");
    for( let row of data){
        let tr = createAnyElement("tr");
        for(let k in row){
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

function delRow(el){
    console.log(el);
}
