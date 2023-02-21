"use strict";

// elements
const inputBill = document.getElementById("bill-amount");
const inputPeople = document.getElementById("num-people__input");
const inputCustom = document.querySelector(".custom-percentage");
const btn_5 = document.querySelector(".btn_5");
const btn_10 = document.querySelector(".btn_10");
const btn_15 = document.querySelector(".btn_15");
const btn_25 = document.querySelector(".btn_25");
const btn_50 = document.querySelector(".btn_50");
const btnReset = document.querySelector(".reset-btn");
const showTip = document.querySelector(".show-tip");
const showTotal = document.querySelector(".show-total");
const showWarning = document.querySelector("label span");

let numPeople = 1;
console.log(numPeople);
let billAmount, tipPercent, tipAmount, totalAmount;
const percentBtns = [btn_5, btn_10, btn_15, btn_25, btn_50, inputCustom];

//event handlers -->
btn_5.addEventListener("pointerdown", calculateBtn);
btn_10.addEventListener("pointerdown", calculateBtn);
btn_15.addEventListener("pointerdown", calculateBtn);
btn_25.addEventListener("pointerdown", calculateBtn);
btn_50.addEventListener("pointerdown", calculateBtn);

inputCustom.addEventListener("input", calculateBtn);
inputBill.addEventListener("input", calculate);
inputPeople.addEventListener("input", calculate);

btnReset.addEventListener("click", resetBtn);

////functions --->
function calculateBtn(e) {
  percentBtns.forEach((e) => e.classList.remove("click"));
  e.target.classList.add("click");
  calculate();
}

function getPercentage() {
  if (btn_5.classList.contains("click")) {
    inputCustom.value = "";
    return Number(btn_5.textContent);
  }
  if (btn_10.classList.contains("click")) {
    inputCustom.value = "";
    return Number(btn_10.textContent);
  }
  if (btn_15.classList.contains("click")) {
    inputCustom.value = "";
    return Number(btn_15.textContent);
  }
  if (btn_25.classList.contains("click")) {
    inputCustom.value = "";
    return Number(btn_25.textContent);
  }
  if (btn_50.classList.contains("click")) {
    inputCustom.value = "";
    return Number(btn_50.textContent);
  }
  if (Number(inputCustom.value) !== 0) {
    return Number(inputCustom.value);
  } else {
    return 0;
  }
}

function calculate() {
  billAmount = getBill();
  tipPercent = getPercentage();
  numPeople = getPeople();

  tipAmount = calcTip(billAmount, tipPercent, numPeople);
  totalAmount = calcTotal(billAmount, tipPercent, numPeople);

  displayResults(tipAmount, totalAmount);
  warnPpl();
}

function getBill() {
  if (inputBill.value === "") {
    return 0;
  } else {
    return Number(inputBill.value);
  }
}

function getPeople() {
  if (inputPeople.value === "" || Number(inputPeople.value) === 0) {
    return 0;
  } else {
    return Number(inputPeople.value);
  }
}

function calcTip(bill, tip, people) {
  if (tip === 0 || bill === 0 || people === 0) {
    return 0;
  } else {
    return (bill * tip) / 100 / people;
  }
}

function calcTotal(bill, tip, people) {
  if (bill === 0 || people === 0) {
    return 0;
  } else if (tip === 0 && bill !== 0) {
    return bill / people;
  } else {
    return ((bill * tip) / 100 + bill) / people;
  }
}

function displayResults(tip, total) {
  showTip.textContent = "$" + tip.toFixed(2);
  showTotal.textContent = "$" + total.toFixed(2);
}

function resetBtn() {
  inputBill.value = "";
  inputPeople.value = "";
  inputPeople.classList.remove("empty");
  inputCustom.value = "";
  percentBtns.forEach(function (btn) {
    btn.classList.remove("click");
  });
  showTip.textContent = "$0.00";
  showTotal.textContent = "$0.00";
  showWarning.classList.remove("empty");
}

function warnPpl() {
  console.log(numPeople);
  if (numPeople === 0) {
    console.log(numPeople);
    showWarning.classList.add("empty");
    inputPeople.classList.add("empty");
  } else {
    showWarning.classList.remove("empty");
    inputPeople.classList.remove("empty");
  }
}

//// Activate Reset button ---->
inputBill.addEventListener("change", function () {
  if (billAmount !== 0) {
    btnReset.removeAttribute("disabled");
  }
});
