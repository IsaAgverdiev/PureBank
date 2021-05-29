// calc Currencies
const rates = {};
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');
const inputRub = document.querySelector("#input-rub");
const inputOther = document.querySelector("#input-other");
const selectCount = document.querySelectorAll(".course__convert-select-current");

getCurrencies();

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

inputRub.oninput = () => {
  inputOther.value = (parseFloat(inputRub.value) / rates.USD.Value).toFixed(2);
};



