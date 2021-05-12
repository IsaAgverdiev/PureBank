const accordionItems = document.querySelector(".qa__accordion-items");
// calc Currencies
const rates = {};
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');
const inputRub = document.querySelector("#input-rub");
const inputOther = document.querySelector("#input-other");
const selectCount = document.querySelectorAll(".course__convert-select-current");
// select
let selectHeader = document.querySelectorAll(".course__convert-select-header");
let selectItem = document.querySelectorAll(".course__convert-select-item");

// VanillaTilt.init(document.querySelector(".card-item"), {
//   max: 20,
//   speed: 100,
// });

accordionItems.addEventListener("click", showAccordion);

getCurrencies();
select();

function showAccordion(e) {
  if (e.target.tagName.toLowerCase() === "div") {
    const accordionHeader = e.target;
    accordionHeader.nextElementSibling.classList.toggle("qa__accordion-body--active");
    accordionHeader.children[1].classList.toggle("qa__accordion-icon--minus");
  }
}

async function getCurrencies() {
  const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
  const data = await response.json();
  const result = await data;

  rates.USD = result.Valute.USD;
  rates.EUR = result.Valute.EUR;
  rates.GBP = result.Valute.GBP;

  elementUSD.textContent = rates.USD.Value.toFixed(1);
  elementEUR.textContent = rates.EUR.Value.toFixed(1);
  elementGBP.textContent = rates.GBP.Value.toFixed(1);
}

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

inputRub.oninput = () => {
  inputOther.value = (parseFloat(inputRub.value) / rates.USD.Value).toFixed(2);
};
