const BASE_URL = "http://localhost:3000";

window.addEventListener("load", () => {
  getPoets();
});

function getPoets() {
  clearForm();
  let main = document.querySelector("#main");
  main.innerHTML = "";
  fetch(BASE_URL + "/poets")
    .then((respone) => respone.json())
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
}
