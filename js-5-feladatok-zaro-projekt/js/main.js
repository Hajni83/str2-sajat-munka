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