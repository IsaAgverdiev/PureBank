VanillaTilt.init(document.querySelector(".card-item"), {
	max: 20,
	speed: 100
});

function showAccordion() {
	const accordionHeader = document.querySelectorAll('.qa__accordion-header');
	for (i = 0; i < accordionHeader.length; i++) {
		accordionHeader[i].addEventListener('click', function () {
			this.nextElementSibling.classList.toggle('qa__accordion-body--active')
			this.children[1].classList.toggle('qa__accordion-icon--minus')
		})
	}
}

showAccordion();