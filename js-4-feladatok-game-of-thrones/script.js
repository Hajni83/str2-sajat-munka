let actors = [];

function loadOntoSidebar(character, i) {
  character.getElementsByClassName("picture")[0].src = actors[i].picture;
  character.getElementsByTagName("h1")[0].innerHTML = actors[i].name;
  if (actors[i].house) {
    character.getElementsByClassName("house")[0].src = "/assets/houses/" + actors[i].house + ".png";
  } else {
    character.getElementsByClassName("house")[0].src = "";
  }
  character.getElementsByTagName("p")[0].innerHTML = actors[i].bio;
}

const getActors = async (url = "./json/got.json") => {
  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  data.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
  actors = data;

  let character = document.getElementById("character");

  let divs = document.getElementsByClassName('div');
  Array.from(divs).forEach((div, i) => {
    div.getElementsByTagName('img')[0].src = actors[i].portrait;
    div.getElementsByTagName('span')[0].innerHTML = actors[i].name;
    div.addEventListener('click', (target) => {
      loadOntoSidebar(character, i);
    })
  });

  let form = document.getElementsByTagName('form')[0];
  let foundElement;
  form.addEventListener('submit', () =>{
    let input = document.getElementById("input");
    
    foundElement = actors.findIndex((element)=>{
      element.toLowerCase() === input.value;
    });

    if (foundElement != -1 ) {
      loadOntoSidebar(character, foundElement);
    } else {
      document.getElementById("notFoundSpan").innerHTML = "Character not found!";
    }
  });
  
};

window.onload = getActors();