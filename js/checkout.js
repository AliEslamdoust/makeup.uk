let headerTab = document.querySelectorAll(".headerTab");

// new customer form
let headerTitle = document.querySelectorAll(".cheaderTitle");
let newCustomerForm = document.getElementById("newCustomerForm");
let nextBtn = document.getElementById("cNext");
let currentPage = 0;
nextBtn.addEventListener("click", function () {
  if (inputIsFilled) {
    currentPage = 1;
    moveNewCustomerForm();
  } else {
    alert("Please fill the form before continuing");
  }
});

let nCInputs = document.querySelectorAll(".newCustomerInput");
let inputIsFilled = true;
let checkedInputs = 0;

nCInputs.forEach((elem) => elem.addEventListener("input", checkEmptyInput));

function checkEmptyInput() {
  if (checkedInputs < nCInputs.length) {
    if (nCInputs[checkedInputs].value != "") {
      inputIsFilled = true;
      checkedInputs++;
      checkEmptyInput();
    } else {
      inputIsFilled = false;
      checkedInputs = 0;
    }
  } else {
    checkedInputs = 0;
  }
}
checkEmptyInput();

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
    if (inputIsFilled) {
      currentPage = index;
      moveNewCustomerForm();
    }
  });
});

// login/new customer tabs buttons
let formsContainer = document.getElementById("formsContainer");
let tabBtns = document.querySelectorAll(".headerTab");
let tabBorder = document.getElementById("headerTabBar");
let currentTab = 0;
let checkoutTitle = document.getElementById("checkoutTitle");

tabBtns.forEach((elem, index) => {
  elem.addEventListener("click", function () {
    activeTab(elem, index);
  });
});

function activeTab(element, index) {
  tabBtns.forEach((elem) => elem.classList.remove("active"));
  element.classList.add("active");
  tabBorder.style.width = element.getBoundingClientRect().width - 10 + "px";
  tabBorder.style.left =
    element.getBoundingClientRect().left -
    tabBtns[0].getBoundingClientRect().left + 5 +
    "px";
  formsContainer.style.transform = `translateX(-${66 * index}%)`;
  if (index == 1) {
    checkoutTitle.classList.add("active");
  } else {
    checkoutTitle.classList.remove("active");
  }
}
activeTab(tabBtns[currentTab], currentTab);

// forgot password and login section
let cForgotPass = document.querySelectorAll(".cForgotPass");
let cLoginContainer = document.querySelectorAll(".login-ForgotPass");
let cLoginBtnContainer = document.querySelectorAll(".cLoginContainer");

cForgotPass.forEach((elem) => {
  elem.addEventListener("click", function () {
    cLoginBtnContainer.forEach((element, index) => {
      element.classList.toggle("active");
      cLoginContainer[index].classList.toggle("active");
    });
  });
});

// shop list
let cartItemCount = 1;
let cartItemCountSpan = document.getElementById("orderCount");

function printCount() {
  cartItemCountSpan.innerHTML = cartItemCount;
  totalPrice = itemPrice * cartItemCount;
  totalPrice /= 100;
  printTotal();
  checkShipping();
}

let addCartItem = document.querySelectorAll(".orderIncrease");
addCartItem.forEach((elem) => elem.addEventListener("click", addItem));

function addItem() {
  cartItemCount++;
  printCount();
}

let delCartItem = document.querySelectorAll(".orderDecrease");
delCartItem.forEach((elem) => elem.addEventListener("click", delItem));

function delItem() {
  if (cartItemCount > 1) {
    cartItemCount--;
    printCount();
  }
}

let itemPrice = 683;
let totalPrice = itemPrice;

let totalPriceSpan = document.querySelectorAll(".orderPrice");

function printTotal() {
  totalPriceSpan.forEach((elem) => (elem.innerHTML = totalPrice));
}

let shipping;
let shippingContainer = document.getElementById("shippingPrice");
let grandTotal;
let grandTotalContainer = document.getElementById("grandTotal");

function checkShipping() {
  if (totalPrice > 19) {
    shipping = 0;
  } else {
    shipping = 3.9;
  }
  grandTotal = totalPrice + shipping;
  shippingContainer.innerHTML = shipping;
  grandTotalContainer.innerHTML = grandTotal;
}

printCount();