let headerTab = document.querySelectorAll(".headerTab");

// new customer form
let headerTitle = document.querySelectorAll(".cheaderTitle");
let newCustomerForm = document.getElementById("newCustomerForm");
let nextBtn = document.getElementById("cNext");
let currentPage = 0;
let nCInputs = document.querySelectorAll(".cInput>input");
nextBtn.addEventListener("click", function () {
  checkEmptyInput();
  if (inputIsFilled) {
    currentPage = 1;
    moveNewCustomerForm();
  }
});

let inputIsFilled = true;
function checkEmptyInput() {
  nCInputs.forEach((elem) => {
    if (inputIsFilled) {
      if (elem.value != "") {
        inputIsFilled = true;
      } else {
        inputIsFilled = false;
      }
    }
  });
  if (inputIsFilled == false) {
    alert("Please fill the form before continuing");
  }
  console.log(inputIsFilled);
}

function moveNewCustomerForm() {
  newCustomerForm.style.transform = `translateX(-${currentPage * 50}%)`;
  activeHeaderTitle();
}
moveNewCustomerForm();

function activeHeaderTitle() {
  headerTitle.forEach((elem) => elem.classList.remove("active"));
  headerTitle[currentPage].classList.add("active");
}

headerTitle.forEach((elem, index) => {
  elem.addEventListener("click", function () {
    if (currentPage == 1) {
      currentPage = index;
      moveNewCustomerForm();
    }
  });
});
