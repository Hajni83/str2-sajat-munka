let actors = [];

function loadOntoSidebar(character, i) {
  character.getElementsByClassName("picture")[0].src = actors[i].picture;
  character.getElementsByTagName("h1")[0].innerHTML = actors[i].name;
  if (actors[i].house) {
    character.getElementsByClassName("house")[0].src = "./assets/houses/" + actors[i].house + ".png";
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

  let typingTimer;
  let doneTypingInterval = 1000;
  let input = document.getElementById("input");

  input.addEventListener('keyup', () =>{
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  });

  input.addEventListener('keydown', () => {
    clearTimeout(typingTimer);
  });

  let foundElement;

  const doneTyping = () => {
    foundElement = actors.findIndex((element)=>{
      return element.name.toLowerCase() === input.value;
    });

    if (foundElement != -1 ) {
      document.getElementById("notFoundSpan").innerHTML = "";
      loadOntoSidebar(character, foundElement);
    } else {
      document.getElementById("notFoundSpan").innerHTML = "Character not found!";
    }
  }
  
};

window.onload = getActors();