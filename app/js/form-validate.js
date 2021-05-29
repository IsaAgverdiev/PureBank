// form
let input = document.querySelectorAll(".form__input");
let formWrap = document.querySelector(".form");
let form = document.querySelector(".form__area");
let inputTel = document.querySelectorAll('input[type="tel"]');

let im = new Inputmask({
  mask: "+7(999) 999-99-99",
  showMaskOnHover: false,
  showMaskOnFocus: false,
});
im.mask(inputTel);

form.addEventListener("submit", formSend);

async function formSend(e) {
  e.preventDefault();

  let error = formValidate(form);

  if (error === 0) {
    popText.style.color = "rgb(0, 202, 118)";
    popContent.style.top = "50%";
    openModal("Успешно отправлено");
    form.reset();
    labelUp();
  } else {
    popText.style.color = "rgb(202, 0, 0)";
    popContent.style.top = "20%";
    openModal("Заполните обязательные поля");
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

function labelUp() {
  for (let i = 0; i < input.length; i++) {
    const inputReq = input[i];
    let labelReq = inputReq.nextElementSibling;
    inputReq.oninput = () => getStyle();

    if (inputReq.value == "") {
      getStyle();
    }
    function getStyle() {
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
    }
  }
}

labelUp();
