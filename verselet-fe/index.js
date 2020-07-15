const BASE_URL = "http://localhost:3000";
const POETS_URL = `${BASE_URL}/poets`;
const POEMS_URL = `${BASE_URL}/poems`;

window.addEventListener("load", () => {
  getPoets();
});

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
  poetsCard.lastElementChild.addEventListener("click", addPoem);
  main().appendChild(poetsCard);
};
