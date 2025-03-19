import "./pages/index.css";
import { createCard, updateLikeState } from "./scripts/card.js";
import { openModal, closeModal } from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import {
  getInitialCards,
  getUserInfo,
  editUserInfo,
  addNewCard,
  deleteUserCard,
  changeLikeCardStatus,
  updateUserAvatar,
} from "./scripts/api.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const cardsContainer = document.querySelector(".places__list");

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupDelete = document.querySelector(".popup_type_delete");
const popupAvatar = document.querySelector(".popup_type_edit_avatar");
const popupsArr = [
  popupEdit,
  popupImage,
  popupNewCard,
  popupAvatar,
  popupDelete,
];

const imageFromPopup = popupImage.querySelector(".popup__image");
const captionFromImage = popupImage.querySelector(".popup__caption");

const buttonOpenFormProfile = document.querySelector(".profile__edit-button");
const buttonOpenFormNewCard = document.querySelector(".profile__add-button");
const buttonOpenFormAvatar = document.querySelector(".profile__avatar-button");

const titleProfile = document.querySelector(".profile__title");
const descriptionProfile = document.querySelector(".profile__description");
const imageProfile = document.querySelector(".profile__image_avatar");

const formEditProfile = document.querySelector('form[name="edit-profile"]');
const formAddCard = document.querySelector('form[name="new-place"]');
const formUpdateAvatar = document.querySelector('form[name="new-avatar"]');
const formDeleteCard = document.querySelector('form[name="card-delete"]');

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const popupEditInputName = popupEdit.querySelector(".popup__input_type_name");
const popupEditInputDescription = popupEdit.querySelector(
  ".popup__input_type_description"
);

let userId;
let cardIdToDelete;
let cardElementToDelete;

enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    titleProfile.textContent = user.name;
    descriptionProfile.textContent = user.about;
    imageProfile.src = user.avatar;
    userId = user._id;

    cards.forEach((cardData) => {
      cardsContainer.append(
        createCard(cardData, userId, openDeletePopup, addLike, openPopupImage)
      );
    });
  })
  .catch((err) => {
    console.error(err);
  });

function openPopupImage(event) {
  imageFromPopup.src = event.target.src;
  imageFromPopup.alt = event.target.alt;
  captionFromImage.textContent = event.target.alt;
  openModal(popupImage);
}

function openPopupProfile() {
  popupEditInputName.value = titleProfile.textContent;
  popupEditInputDescription.value = descriptionProfile.textContent;
  clearValidation(popupEdit, validationConfig);
  openModal(popupEdit);
}

function openPopupNewCard() {
  openModal(popupNewCard);
}

function openPopupAvatar() {
  openModal(popupAvatar);
}

function openDeletePopup(cardId, cardElement) {
  cardIdToDelete = cardId;
  cardElementToDelete = cardElement;
  openModal(popupDelete);
}

function addLike(evt, cardId, cardElement, currentUserId) {
  const likeButton = evt.target;
  const likeCountElement = cardElement.querySelector(".card__like-count");
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  changeLikeCardStatus(cardId, isLiked)
    .then((updatedCard) => {
      updateLikeState(likeButton, likeCountElement, updatedCard.likes, currentUserId);
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleFormEditProfileSubmit(event) {
  event.preventDefault();
  const originalText = event.submitter.textContent;
  event.submitter.textContent = "Сохранение...";

  const newName = nameInput.value;
  const newDescription = jobInput.value;

  editUserInfo(newName, newDescription)
    .then((user) => {
      titleProfile.textContent = user.name;
      descriptionProfile.textContent = user.about;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      event.submitter.textContent = originalText;
    });
}

function handleFormAddCardSubmit(event) {
  event.preventDefault();
  const originalText = event.submitter.textContent;
  event.submitter.textContent = "Сохранение...";

  const cardName = formAddCard.elements["place-name"].value;
  const cardLink = formAddCard.elements.link.value;

  addNewCard(cardName, cardLink)
    .then((cardData) => {
      const newCardElement = createCard(
        cardData,
        userId,
        openDeletePopup,
        addLike,
        openPopupImage
      );
      cardsContainer.prepend(newCardElement);
      closeModal(popupNewCard);
      formAddCard.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      event.submitter.textContent = originalText;
    });
}

function handleFormAvatarSubmit(event) {
  event.preventDefault();
  const originalText = event.submitter.textContent;
  event.submitter.textContent = "Сохранение...";
  const avatarLink = formUpdateAvatar.elements.link.value;

  updateUserAvatar(avatarLink)
    .then((data) => {
      imageProfile.src = data.avatar;
      closeModal(popupAvatar);
      formUpdateAvatar.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      event.submitter.textContent = originalText;
    });
}

function handleFormCardDeleteSubmit(event) {
  event.preventDefault();
  const originalText = event.submitter.textContent;
  event.submitter.textContent = "Удаление...";
  if (cardIdToDelete) {
    deleteUserCard(cardIdToDelete)
      .then(() => {
        cardElementToDelete.remove();
        closeModal(popupDelete);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        event.submitter.textContent = originalText;
      });
  }
}

popupsArr.forEach((el) => {
  el.classList.add("popup_is-animated");
});

buttonOpenFormProfile.addEventListener("click", openPopupProfile);
buttonOpenFormNewCard.addEventListener("click", openPopupNewCard);
buttonOpenFormAvatar.addEventListener("click", openPopupAvatar);

formEditProfile.addEventListener("submit", handleFormEditProfileSubmit);
formAddCard.addEventListener("submit", handleFormAddCardSubmit);
formUpdateAvatar.addEventListener("submit", handleFormAvatarSubmit);
formDeleteCard.addEventListener("submit", handleFormCardDeleteSubmit);
