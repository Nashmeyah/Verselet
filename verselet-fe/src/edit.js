class Edit {
  constructor(data) {}

  renderEditForm() {
    let id = event.target.getAttribute("data-poem-id");
    let data = event.path[1].textContent;
    console.log(event);
    let form = document.querySelector(".edit-popup");

    if (form.style.display === "block") {
      form.style.display = "none";
    } else {
      form.style.display = "block";
    }
    document.querySelector(".btn-update").setAttribute("data-id", id);
    document.getElementById("title").value = data;
  }

  // const editPoem = () => {
  //   console.log("This button was clicked");
  // };
}
