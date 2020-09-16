class Edit {
  constructor(data) {
    this.id = data.target.getAttribute("data-poem-id");
    this.data = event.path[1].textContent;
  }

  renderEditForm() {
    console.log(event);
    let form = document.querySelector(".edit-popup");

    if (form.style.display === "block") {
      form.style.display = "none";
    } else {
      form.style.display = "block";
    }
    document.querySelector(".btn-update").setAttribute("data-id", this.id);
    document.getElementById("title").value = this.data;
  }

  // const editPoem = () => {
  //   console.log("This button was clicked");
  // };
}
