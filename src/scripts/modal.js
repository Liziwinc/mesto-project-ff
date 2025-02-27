import {
  initialCards,
  createCard,
  deleteCard,
  openModalImage,
  addLike,
} from "./cards.js";

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupsArr = [popupEdit, popupImage, popupNewCard];

export function popupAnimated() {
  popupsArr.forEach((el) => {
    el.classList.add("popup_is-animated");
  });
}

export function openModal(event, cardsContainer) {
  if (event.target.classList.contains("profile__edit-button")) {
    // редактирование профиля
    popupEdit.classList.add("popup_is-opened");

    const profileTitle = document.querySelector(".profile__title").textContent;
    const profileDescription = document.querySelector(
      ".profile__description"
    ).textContent;

    popupEdit.querySelector(".popup__input_type_name").value = profileTitle;
    popupEdit.querySelector(".popup__input_type_description").value =
      profileDescription;

    const formElement = document.querySelector(".popup__form");

    function handleFormSubmit(evt) {
      evt.preventDefault();

      const name = formElement.elements.name.value;
      const description = formElement.elements.description.value;

      document.querySelector(".profile__title").textContent = name;
      document.querySelector(".profile__description").textContent = description;
      popupEdit.classList.remove("popup_is-opened");
    }

    formElement.addEventListener("submit", handleFormSubmit, { once: true });
  } else if (event.target.classList.contains("profile__add-button")) {
    // добавление карточки
    popupNewCard.classList.add("popup_is-opened");

    const formElement = popupNewCard.querySelector(".popup__form");

    function handleFormSubmit(evt) {
      evt.preventDefault();

      const newCard = {
        name: formElement.elements["place-name"].value,
        link: formElement.elements.link.value,
      };

      initialCards.unshift(newCard);

      const newCardElement = createCard(
        newCard,
        deleteCard,
        addLike,
        openModalImage
      );
      cardsContainer.prepend(newCardElement);

      popupNewCard.classList.remove("popup_is-opened");
      formElement.reset();
    }

    formElement.addEventListener("submit", handleFormSubmit, { once: true });
  }
}

export function closeModal(event) {
  if (
    event.target.classList.contains("popup__close") ||
    event.target.classList.contains("popup")
  ) {
    const popup = event.target.closest(".popup");
    if (popup) {
      popup.classList.remove("popup_is-opened");

      const formElement = popup.querySelector(".popup__form");
      if (formElement) {
        formElement.reset();
      }
    }
  }

  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_is-opened");
      if (openedPopup) {
        openedPopup.classList.remove("popup_is-opened");

        const formElement = openedPopup.querySelector(".popup__form");
        if (formElement) {
          formElement.reset();
        }
      }
    }
  });
}
