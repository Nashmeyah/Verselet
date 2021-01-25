//function for search
const searchForPoets = () => {
  let searchBar = document.getElementById("searchBar");

  searchBar.addEventListener("keyup", (event) => {
    let poets = document.querySelectorAll("p");
    const search = event.target.value.toLowerCase();
    Array.from(poets).forEach((poet) => {
      let poetName = poet.innerText;

      if (poetName.toLowerCase().indexOf(search) > -1) {
        poet.parentElement.style.display = "";
      } else {
        poet.parentElement.style.display = "none";
      }
    });
  });
};
