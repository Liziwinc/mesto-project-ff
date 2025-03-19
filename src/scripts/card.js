const cardTemplate = document.querySelector("#card-template").content;

export function createCard(
  cardData,
  userId,
  deleteFunction,
  likeFunction,
  openFunction
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const likeCountElement = cardElement.querySelector(".card__like-count");
  if (likeCountElement) {
    likeCountElement.textContent = cardData.likes.length;
  }

  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () =>
      deleteFunction(cardData._id, cardElement)
    );
  }

  if (cardData.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  cardImage.addEventListener("click", openFunction);

  likeButton.addEventListener("click", (evt) =>
    likeFunction(evt, cardData._id, cardElement, userId)
  );

  return cardElement;
}

export function updateLikeState(likeButton, likeCountElement, likes, userId) {
  likeCountElement.textContent = likes.length;
  if (likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }
}

