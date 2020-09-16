const BASE_URL = "http://localhost:3000";
const POETS_URL = `${BASE_URL}/poets`;
const POEMS_URL = `${BASE_URL}/poems`;

window.addEventListener("load", () => {
  getPoets();
  createNewPoet();
  searchForPoets();
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
  poemsList.setAttribute("class", "poems-list");
  poemsList.dataset.id = poets.id;
  poetsCard.appendChild(poemsList);

  poets.poems.forEach((poem) => renderPoems(poem, poemsList));
};

const createNewPoet = () => {
  let form = document.querySelector("a");
  form.addEventListener("click", displayPoetForm);
};

const displayPoetForm = () => {
  let poetForm = document.getElementById("poet-form");
  let html = `
  <form>
    <label>Name</label>
    <input type="text" id="name">
    <label>Style</label>
    <input type="text" id="style">
    <input type="submit" value="Submit">
  </form>
  `;

  poetForm.innerHTML = html;
  document.querySelector("form").addEventListener("submit", createPoet);
};

const createPoet = () => {
  event.preventDefault();
  console.log("Form clicked");

  const poet = {
    name: document.getElementById("name").value,
    style: document.getElementById("style").value,
  };

  //fetch POST
  fetch(POETS_URL, {
    method: "POST",
    body: JSON.stringify(poet),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      renderPoetsCard(data);
      clearPoetForm();
    });
};

const renderPoems = (poem, list) => {
  let poemCard = document.createElement("li");
  poemCard.id = `poem-${poem.id}`;
  poemCard.innerHTML = `<br>Title: ${poem.title} <br> Poem: ${poem.body} `;

  //edit button
  let editBtn = document.createElement("button");
  editBtn.className = "edit";
  editBtn.dataset.poemId = poem.id;
  editBtn.innerText = "Edit";
  editBtn.addEventListener("click", renderEditForm);

  //delete button
  let releaseBtn = document.createElement("button");
  releaseBtn.className = "delete";
  releaseBtn.dataset.poemId = poem.id;
  releaseBtn.innerText = "Delete";
  releaseBtn.addEventListener("click", deletePoem);
  poemCard.appendChild(releaseBtn);
  poemCard.appendChild(editBtn);
  if (!list) {
    list = event.target.parentElement.lastElementChild;
  }
  list.appendChild(poemCard);
};

const renderEditForm = (event) => {
  let id = event.target.getAttribute("data-poem-id");
  let data = event.path[1].textContent;
  console.log(event.path[1].textContent);
  let form = document.querySelector(".edit-popup");

  if (form.style.display === "block") {
    form.style.display = "none";
  } else {
    form.style.display = "block";
  }
  document.querySelector(".btn-update").setAttribute("data-id", id);
  document.getElementById("title").value = data;
};

// const editPoem = () => {
//   console.log("This button was clicked");
// };

const clearForm = () => {
  let poem = document.getElementById("poem-form");
  poem.innerHTML = "";
};
const clearPoetForm = () => {
  let poet = document.getElementById("poet-form");
  poet.innerHTML = "";
};

const deletePoem = () => {
  fetch(POEMS_URL + `/${event.target.dataset.poemId}`, {
    method: "DELETE",
  }).then(removePoem(event.target.dataset.poemId));
};

const removePoem = (id) => {
  let cardToRemove = document.getElementById(`poem-${id}`);
  cardToRemove.parentElement.removeChild(cardToRemove);
};

const displayPoemForm = () => {
  let poemForm = document.getElementById("poem-form");
  let html = `
  <form data-poet-id="${event.target.dataset.poetId}">
    <label>Title</label>
    <input type="text" id="title">
    <label>Poem Body</label>
    <textarea type="text" id="body" rows=2></textarea>
    <input type="submit" value"Submit">
  </form>
  `;

  poemForm.innerHTML = html;
  document.querySelector("form").addEventListener("submit", createPoem);
};

const createPoem = () => {
  event.preventDefault();
  console.log("adding poems...");
  let poetCardId = event.target.dataset.poetId;
  console.log(poetCardId);
  const poem = {
    title: document.getElementById("title").value,
    body: document.getElementById("body").value,
    poet_id: poetCardId,
  };

  console.log(poem);

  fetch(POEMS_URL, {
    method: "POST",
    body: JSON.stringify(poem),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let poem = new Poem(data);
      poem.renderPoem();
      clearForm();
    });
};
