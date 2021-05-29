// select
let selectHeader = document.querySelectorAll(".course__convert-select-header");
let selectItem = document.querySelectorAll(".course__convert-select-item");

function select() {
  selectHeader.forEach((item) => {
    item.addEventListener("click", toggleOpen);
  });

  selectItem.forEach((item) => {
    item.addEventListener("click", selectChoose);
  });

  function toggleOpen() {
    this.parentElement.classList.toggle("active");
    selectHeader.forEach((item) => {
      if (item !== this) item.parentElement.classList.remove("active");
    });
  }

  function selectChoose() {
    let selectText = this.innerText;
    let select = this.closest(".course__convert-other");
    let currentText = select.querySelector(".course__convert-select-current");
    currentText.classList.add("course__convert-select-current--active");
    currentText.innerText = selectText;
    select.classList.remove("active");
  }
}

select();

