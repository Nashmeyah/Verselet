const BASE_URL = "http://localhost:3000";
const POETS_URL = `${BASE_URL}/poets`;
const POEMS_URL = `${BASE_URL}/poems`;

window.addEventListener("load", () => {
  getPoets();
});

const main = () => {
  return document.querySelector("main");
};
//loads poets
const getPoets = () => {
  fetch("http://localhost:3000/poets")
    .then((response) => response.json())
    .then((data) => renderPoets(data));
};

const renderPoets = (poetsData) => {
  poetsData.forEach((poet) => renderPoetsCard(poet));
};

const renderPoetsCard = (poets) => {
  let poetsCard = document.createElement("div");
  poetsCard.className = "card";
  poetsCard.dataset.id = poets.id;
  poetsCard.innerHTML = `
    <p>${poets.name}</p>
    <button data-poet-id=${poets.id}>Add Poem</button>
  `;
  poetsCard.lastElementChild.addEventListener("click", displayPoemForm);
  main().appendChild(poetsCard);
  let poemsList = document.createElement("ul");
  poetsCard.appendChild(poemsList);

  poets.poems.forEach((poem) => renderPoems(poem, poemsList));
};

const renderPoems = (poem, list, e) => {
  let poemCard = document.createElement("li");
  poemCard.id = `poem-${poem.id}`;
  poemCard.innerText = `${poem.title} (${poem.body})`;
  let releaseBtn = document.createElement("button");
  releaseBtn.className = "delete";
  releaseBtn.dataset.poemId = poem.id;
  releaseBtn.innerText = "Delete";
  releaseBtn.addEventListener("click", deletePoem);
  poemCard.appendChild(releaseBtn);
  if (!list) {
    list = e.target.parentElement.lastElementChild;
  }
  list.appendChild(poemCard);
};

const clearForm = () => {
  let poem = document.getElementById("poem-form");
  poem.innerHTML = "";
};

const deletePoem = (e) => {
  fetch(POEMS_URL + `/${e.target.dataset.poemId}`, {
    method: "DELETE",
  })
    .then((r) => r.json())
    .then((poem) => removePoem(poem.id));
};

const removePoem = (id) => {
  let cardToRemove = document.getElementById(`poem-${id}`);
  cardToRemove.parentElement.removeChild(cardToRemove);
};

const displayPoemForm = () => {
  let poemForm = document.getElementById("poem-form");
  let html = `
  <form>
    <label>Title</label>
    <input type="text" id="title">
    <label>Poem Body</label>
    <input type="text" id="body">
    <input type="submit" value"Submit">
  </form>
  `;

  poemForm.innerHTML = html;
  document.querySelector("form").addEventListener("submit", createPoem);
};

const createPoem = (e) => {
  e.preventDefault();
  console.log("adding poems...");
  const poem = {
    title: document.getElementById("title").nodeValue,
    body: document.getElementById("body").value,
  };

  fetch(POEMS_URL, {
    method: "POST",
    body: JSON.stringify(poem),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => addPoemsToDom(data, e));
};

const addPoemsToDom = (data, e) => {
  clearForm();
  if (data.message) {
    alert(data.message);
  } else {
    renderPoems(data, undefined, e);
  }
};
