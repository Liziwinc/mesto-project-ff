const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

initialCards.forEach((element) => {
  cardsContainer.append(createCard(element, deleteCard));
});

function createCard(cardData, deleteFunction) {
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

  return cardElement;
}

function deleteCard(element) {
  element.remove();
}
