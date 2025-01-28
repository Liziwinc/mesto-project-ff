// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
loadCards(initialCards);

function deleteCard(element) {
  element.remove();
}

function loadCards(array) {
  array.forEach(function (element) {
    const cardElement = cardTemplate
      .querySelector(".places__item")
      .cloneNode(true);

    cardElement.querySelector(".card__image").src = element.link;
    cardElement.querySelector(".card__title").textContent = element.name;

    cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => deleteCard(cardElement));

    placesList.append(cardElement);
  });
}
