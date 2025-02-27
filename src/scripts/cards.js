export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

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

export function createCards(cardsContainer) {
  initialCards.forEach((element) => {
    cardsContainer.append(
      createCard(element, deleteCard, addLike, openModalImage)
    );
  });
}

export function openModalImage(event) {
  const popup = document.querySelector(".popup_type_image");
  const image = popup.querySelector(".popup__image");
  const caption = popup.querySelector(".popup__caption");

  image.src = event.target.src;
  image.alt = event.target.alt;
  caption.textContent = event.target.alt;

  popup.classList.add("popup_is-opened");
}
