// search box activation
let searchBtn = document.getElementById("searchBtn");
let searchElements = [
  document.getElementById("searchFallBack"),
  document.getElementById("searchContainer"),
  document.getElementById("searchInput"),
  document.getElementById("searchClose"),
];

function closeSearch() {
  searchElements.forEach((elem) => {
    elem.classList.add("hide");
  });
}

function openSearch() {
  searchElements.forEach((elem) => {
    elem.classList.remove("hide");
  });
  searchElements[2].value = "";
}

searchElements[0].addEventListener("click", closeSearch);
searchElements[3].addEventListener("click", closeSearch);
searchBtn.addEventListener("click", openSearch);

// login box
let loginBtn = document.getElementById("loginBtn");
let loginFallBack = document.getElementById("loginFallBack");
let loginContainer = document.getElementById("loginContainer");
let loginInputs = document.querySelectorAll(".loginInput");
let loginLabels = document.querySelectorAll(".loginLabel");
let loginInputContainers = document.querySelectorAll(".inputContainer");
loginBtn.addEventListener("click", function () {
  loginContainer.classList.toggle("show");
  loginFallBack.classList.toggle("hide");
});

loginFallBack.addEventListener("click", function () {
  loginContainer.classList.remove("show");
  this.classList.add("hide");
});

loginInputs.forEach((elem, index) => {
  elem.addEventListener("focus", function () {
    loginInputContainers[index].classList.add("activeAfter");
    loginLabels[index].classList.add("focused");
  });
  elem.addEventListener("blur", function () {
    if (elem.value == "") {
      loginInputContainers[index].classList.remove("activeAfter");
      loginLabels[index].classList.remove("focused");
    }
  });
});

// show password
let showPass = document.getElementById("showPass");
let passInput = document.getElementById("passInput");
showPass.addEventListener("click", function () {
  this.classList.toggle("fa-eye-slash");
  this.classList.toggle("fa-eye");
  passInput.type = passInput.type == "password" ? "text" : "password";
});

// sub sub menu activator
let ssMenuActivators = document.querySelectorAll(".ssMenuActive");
let ssMenu = document.querySelectorAll(".ssMenu");
let ssMenuHeight;
let currentssMenu;

ssMenuActivators.forEach((elem, index) => {
  elem.addEventListener("click", function () {
    ssMenu[index].classList.toggle("isActive");
    let liItemsCount = ssMenu[index].childElementCount;
    ssMenuHeight = liItemsCount * 28;
    currentssMenu = index;

    if (ssMenu[index].classList.contains("isActive")) {
      currentHeight = 0;
    } else {
      currentHeight = ssMenu[index].getBoundingClientRect().height / 10;
    }

    callSMenu();

    if (ssMenuActivators[index].classList.contains("active")) {
      ssMenuActivators[index].classList.remove("active");
    } else {
      ssMenuActivators[index].classList.add("active");
    }
  });
});

function callSMenu() {
  openSSMenu(ssMenuHeight, currentssMenu);
}

let currentHeight = 0;
function openSSMenu(height, index) {
  if (ssMenu[index].classList.contains("isActive")) {
    if (currentHeight * 10 < height) {
      ssMenu[index].style.height = currentHeight * 10 + "px";
      currentHeight++;
      setTimeout(callSMenu, 10);
    } else {
      ssMenu[index].removeAttribute("style");
      ssMenu[index].classList.add("active");
    }
  } else {
    ssMenu[index].classList.remove("active");
    if (currentHeight * 10 > 0) {
      ssMenu[index].style.height = currentHeight * 10 + "px";
      currentHeight--;
      setTimeout(callSMenu, 10);
    } else {
      ssMenu[index].removeAttribute("style");
    }
  }
}

// slider with opacity

let sliderContainer = document.getElementById("sliderContainer");
let sliders = document.querySelectorAll(".slider");

// pagination
let paginationContainer = document.getElementById("sliderPagination");

for (let i = 0; i < sliders.length; i++) {
  paginationContainer.appendChild(document.createElement("span"));
}

let paginationBtn = document.querySelectorAll("#sliderPagination>span");
function changePagination() {
  clearPagination();
  paginationBtn[currentSlide].classList.add("active");
}

// move slider
let currentSlide = 0;
let sliderDelay = 5000;

function callSlider() {
  sliderTimeout = setTimeout(moveSlider, sliderDelay);
}

function clearSliderTimeout() {
  clearTimeout(sliderTimeout);
}

function moveSlider() {
  if (currentSlide < sliders.length) {
    changePagination();
    clearSliders();
    sliders[currentSlide].classList.add("active");
    currentSlide++;
    callSlider();
  } else {
    currentSlide = 0;
    moveSlider();
  }
}

function clearSliders() {
  sliders.forEach((elem) => elem.classList.remove("active"));
}

moveSlider();

// navigation slider
let nextBtn = document.getElementById("sliderNext");
let prevBtn = document.getElementById("sliderPrev");

function prevSlide() {
  clearSliderTimeout();
  if (currentSlide > 1) {
    currentSlide -= 2;
  } else {
    currentSlide = sliders.length - 1;
  }
  moveSlider();
}

function nextSlide() {
  clearSliderTimeout();
  if (currentSlide == sliders.length) {
    currentSlide = 0;
  }
  moveSlider();
}

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// move with pagination
paginationBtn.forEach((elem, index) => {
  elem.addEventListener("click", function () {
    clearPagination();
    this.classList.add("active");
    currentSlide = index;
    clearSliderTimeout();
    moveSlider();
  });
});

function clearPagination() {
  paginationBtn.forEach((elem) => elem.classList.remove("active"));
}
