let actors = [];

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

  let divs = document.getElementsByClassName('div');
  Array.from(divs).forEach((div, i) => {
    div.getElementsByTagName('img')[0].src = actors[i].portrait;
    div.getElementsByTagName('span')[0].innerHTML = actors[i].name;
  });
  
};

window.onload = getActors();





