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

function labelUp() {
  let input = document.querySelectorAll(".form__input");
  let label = document.querySelectorAll(".form__label");

  for (let i = 0; i < input.length; i++) {
    const inputReq = input[i];
    let labelReq = inputReq.nextElementSibling;

    inputReq.oninput = () => {
      if (inputReq.value !== "") {
        labelReq.style.fontSize = "11px";
        labelReq.style.color = "#CA48F6";
        labelReq.style.top = "14px";
      } else {
        labelReq.style.fontSize = "18px";
        labelReq.style.color = "#302d42";
        labelReq.style.top = "50%";
        inputReq.blur();
      }
    };
  }
}
labelUp();

let form = document.querySelector(".form");
form.addEventListener("submit", formSend);

async function formSend(e) {
  e.preventDefault();

  let error = formValidate(form);

  let formData = new FormData(form);

  if (error === 0) {
    form.classList.add("_sending");
    let response = await fetch("sendmail.php", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      let result = await response.json();
      alert(result.message);
      form.reset();
    } else {
      alert("Ошибка");
    }
  } else {
    alert("Заполните обязательные поля");
  }
}

function formValidate(form) {
  let error = 0;
  let formReq = document.querySelectorAll("._req");
  let label = document.querySelectorAll(".form__label");
  for (let i = 0; i < formReq.length; i++) {
    const input = formReq[i];
    formRemoveError(input);

    if (input.classList.contains("_email")) {
      if (emailTest(input)) {
        formAddError(input);
        error++;
      }
    } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
      formAddError(input);
      error++;
    } else {
      if (input.value === "") {
        formAddError(input);
        error++;
      }
    }
  }
  return error;
}

function formAddError(input) {
  input.parentElement.classList.add("_error");
  input.classList.add("_error");
}

function formRemoveError(input) {
  input.parentElement.classList.remove("_error");
  input.classList.remove("_error");
}
function emailTest(input) {
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
