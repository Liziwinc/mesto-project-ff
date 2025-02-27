import "./pages/index.css";
import { createCards } from "./scripts/cards.js";
import { openModal, closeModal, popupAnimated } from "./scripts/modal.js";

const cardsContainer = document.querySelector(".places__list");

createCards(cardsContainer);
popupAnimated();

document.addEventListener("click", (event) => {
  openModal(event, cardsContainer);
});

document.addEventListener("click", (event) => {
  closeModal(event);
});
