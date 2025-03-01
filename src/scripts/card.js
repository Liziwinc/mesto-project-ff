const cardTemplate = document.querySelector("#card-template").content;

export function createCard(
  cardData,
  deleteFunction,
  likeFunction,
  openFunction
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => deleteFunction(cardElement));

  cardElement
    .querySelector(".card__image")
    .addEventListener("click", (evt) => openFunction(evt));

  cardElement.addEventListener("click", (evt) => {
    likeFunction(evt);
  });

  return cardElement;
}

export function deleteCard(element) {
  element.remove();
}

export function addLike(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}
