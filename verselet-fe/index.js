const BASE_URL = "http://localhost:3000";

window.addEventListener("load", () => {
  getPoets();
});

function getPoets() {
  clearForm();
  let main = document.querySelector("#main");
  main.innerHTML = "";
  fetch(BASE_URL + "/poets")
    .then((response) => response.json())
    .then((poets) => {
      main.innerHTML += poets
        .map(
          (poet) => `
      <li>
        <a href="#" data-id="${poet.id}">${poet.name}</a>
        - ${poet.style}
      </li>
    `
        )
        .join("");
    });

  attachClicktoLinks();
}

function clearForm() {
  let poemFormDiv = document.getElementById("poem-form");
  poemFormDiv.innerHTML = "";
}

function attachClicktoLinks() {
  let poems = document.querySelectorAll("li a");
  poems.forEach((poem) => {
    poem.addEventListener("click", displayPoem);
  });

  document
    .getElementById("poemForm")
    .addEventListener("click", displayPoemForm);
}

function displayPoemForm() {
  let poemFormDiv = document.getElementById("poem-form");

  let html = `
  <form>
    <label>Title</label>
    <input type="text" id="title">
    <label>Poem</label>
    <input type="text" id="body">
    <input type="submit">
  </form>
  `;

  poemFormDiv.innerHTML = html;
  document.querySelector("form").addEventListener("submit", createPoem);
}

function createPoem() {
  event.preventDefault();
  const poem = {
    title: document.getElementById("title").value,
    body: document.getElementById("body").value,
  };

  fetch(BASE_URL + "/poets", {
    method: "POST",
    body: JSON.stringify(poem),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json)
    .then((poet) => {
      document.querySelector("#main").innerHTML += `
    <li>
        <a href="#" data-id="${poet.id}">${poet.name}</a>
        - ${poet.style}
      </li>
      `;
      attachClicktoLinks();
      clearForm();
    });
}

function displayPoem() {}
