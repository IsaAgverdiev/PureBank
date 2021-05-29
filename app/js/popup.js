// pop
let popOverlay = document.querySelector(".popup");
let popContent = document.querySelector(".popup__content");
let popText = document.querySelector(".popup__text");

popOverlay.addEventListener("click", (e) => {
  e.stopPropagation();
  closeModal(e);
});

function openModal(message) {
  popText.textContent = message;
  popOverlay.classList.remove("hidden");
}

function closeModal(e) {
  if (e.target.classList.contains("popup__close-btn")) {
    popOverlay.classList.add("hidden");
  } else if (e.target.classList.contains("popup")) {
    popOverlay.classList.add("hidden");
  }
}