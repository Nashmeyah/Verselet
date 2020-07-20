class Poem {
  constructor(data) {
    this.id = poem.id;
    this.poet.id = data.poet.id;
    this.title = data.title;
    this.body = data.body;
  }

  renderPoem() {
    let card = document.querySelector(`[data-id='${this.poet.id}']`);
    let ul = card.querySelector(".poems-list");

    let poemCard = document.createElement("li");
    poemCard.id = `poem-${this.id}`;
    poemCard.innerText = `Title: ${this.title}`;
    let releaseBtn = document.createElement("button");
    releaseBtn.className = "delete";
    releaseBtn.dataset.poemId = this.id;
    releaseBtn.innerText = "Delete";
    releaseBtn.addEventListener("click", deletePoem);
    ul.appendChild(poemCard);
    poemCard.appendChild(releaseBtn);
  }
}
