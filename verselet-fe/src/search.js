const searchForPoets = () => {
  const poets = document.querySelectorAll("#poet-container div.card p");
  const searchBar = document.querySelector("#searchBar");

  searchBar.addEventListener("keyup", () => {
    const searchString = event.target.value.toLowerCase();

    for (i = 0; i < poets.length; i++) {
      console.log(poets);
      a = poets[i].textContent;
      console.log(a);
      if (a.innerHTML.toLowerCase(searchString) > -1) {
        console.log(poet[i]);
      } else {
        console.log("testing");
      }
    }
  });
};
