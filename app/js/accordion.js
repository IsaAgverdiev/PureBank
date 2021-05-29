const accordionItems = document.querySelector(".qa__accordion-items");

accordionItems.addEventListener("click", showAccordion);


function showAccordion(e) {
  if (e.target.tagName.toLowerCase() === "div") {
    const accordionHeader = e.target;
    accordionHeader.nextElementSibling.classList.toggle("qa__accordion-body--active");
    accordionHeader.children[1].classList.toggle("qa__accordion-icon--minus");
  }
}