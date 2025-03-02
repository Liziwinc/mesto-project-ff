import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, addLike } from "./scripts/card.js";
import { openModal, closeModal } from "./scripts/modal.js";

const cardsContainer = document.querySelector(".places__list");

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupsArr = [popupEdit, popupImage, popupNewCard];

const imageFromPopup = popupImage.querySelector(".popup__image");
const captionFromImage = popupImage.querySelector(".popup__caption");

const buttonOpenFormProfile = document.querySelector(".profile__edit-button");
const buttonOpenFormNewCard = document.querySelector(".profile__add-button");

let titleProfile = document.querySelector(".profile__title");
let descriptionProfile = document.querySelector(".profile__description");

const formEditProfile = document.querySelector('form[name="edit-profile"]');
const formAddCard = document.querySelector('form[name="new-place"]');

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const popupEditInputName = popupEdit.querySelector(".popup__input_type_name");
const popupEditInputDescription = popupEdit.querySelector(
  ".popup__input_type_description"
);

function createCards() {
  initialCards.forEach((element) => {
    cardsContainer.append(
      createCard(element, deleteCard, addLike, openPopupImage)
    );
  });
}

function openPopupImage(event) {
  imageFromPopup.src = event.target.src;
  imageFromPopup.alt = event.target.alt;
  captionFromImage.textContent = event.target.alt;
  openModal(popupImage);
}

function openPopupProfile() {
  popupEditInputName.value = titleProfile.textContent;
  popupEditInputDescription.value = descriptionProfile.textContent;
  openModal(popupEdit);
}

function openPopupNewCard() {
  openModal(popupNewCard);
}

function handleFormEditProfileSubmit(event) {
  event.preventDefault();
  const name = nameInput.value;
  const description = jobInput.value;
  titleProfile.textContent = name;
  descriptionProfile.textContent = description;
  closeModal(popupEdit);
}

function handleFormAddCardSubmit(event) {
  event.preventDefault();
  const newCard = {
    name: formAddCard.elements["place-name"].value,
    link: formAddCard.elements.link.value,
  };
  const newCardElement = createCard(
    newCard,
    deleteCard,
    addLike,
    openPopupImage
  );
  cardsContainer.prepend(newCardElement);
  closeModal(popupNewCard);
  formAddCard.reset();
}

createCards();
popupsArr.forEach((el) => {
  el.classList.add("popup_is-animated");
});

buttonOpenFormProfile.addEventListener("click", openPopupProfile);
buttonOpenFormNewCard.addEventListener("click", openPopupNewCard);

formEditProfile.addEventListener("submit", handleFormEditProfileSubmit);
formAddCard.addEventListener("submit", handleFormAddCardSubmit);
