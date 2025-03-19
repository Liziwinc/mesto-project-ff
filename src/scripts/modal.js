export function openModal(popup) {
  popup.classList.add("popup_is-opened");
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEscPopup);
  document.removeEventListener("click", closeOverlayPopup);
}

function closeEscPopup(e) {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
}

function closeOverlayPopup(event) {
  if (
    event.target.classList.contains("popup") ||
    event.target.classList.contains("popup__close")
  ) {
    closeModal(event.target.closest(".popup"));
  }
}

document.addEventListener("keydown", closeEscPopup);

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", closeOverlayPopup);
});
