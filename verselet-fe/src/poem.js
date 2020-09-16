class Poem {
  constructor(data) {
    this.id = data.id;
    this.poet = data.poet;
    this.title = data.title;
    this.body = data.body;
  }

  renderPoem() {
    let card = document.querySelector(`[data-id='${this.poet.id}']`);
    let ul = card.querySelector(".poems-list");

    let poemCard = document.createElement("li");
    poemCard.id = `poem-${this.id}`;
    poemCard.innerText = `Title: ${this.title}`;

    //edit button
    let editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.dataset.poemId = this.id;
    editBtn.innerText = "Edit";
    editBtn.addEventListener("click", editPoem);

    //delete button
    let releaseBtn = document.createElement("button");
    releaseBtn.className = "delete";
    releaseBtn.dataset.poemId = this.id;
    releaseBtn.innerText = "Delete";
    releaseBtn.addEventListener("click", deletePoem);

    ul.appendChild(poemCard);
    poemCard.appendChild(editBtn);
    poemCard.appendChild(releaseBtn);
  }
}
