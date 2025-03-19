export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEscPopup);
  document.addEventListener("click", closeOverlayPopup);
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

function closeOverlayPopup(e) {
  if (
    e.target.classList.contains("popup") ||
    e.target.classList.contains("popup__close")
  ) {
    const popup = e.target.closest(".popup");
    closeModal(popup);
  }
}
