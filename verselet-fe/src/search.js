//function for search
const searchForPoets = () => {
  let searchBar = document.getElementById("searchBar");

  searchBar.addEventListener("keyup", (event) => {
    let poets = document.querySelectorAll("p");
    const search = event.target.value.toLowerCase();
    // console.log(poets);
    Array.from(poets).forEach((poet) => {
      // console.log(poet);
      let poetName = poet.innerText;

      if (poetName.toLowerCase().indexOf(search) > -1) {
        poet.parentElement.style.display = ""; //style is nothing
      } else {
        poet.parentElement.style.display = "none"; //style for pet disappears
      }
    });
  });
};
