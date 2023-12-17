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
let loginCloseBtn = document.getElementById("loginCloseBtn");

loginCloseBtn.addEventListener("click", () => {
  loginContainer.classList.toggle("show");
  loginFallBack.classList.toggle("hide");
});

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

// sub sub menu activator in desktop
let ssMenuActivators = document.querySelectorAll(".ssMenuActive");
let ssMenu = document.querySelectorAll(".ssMenu");
let ssMenuHeight;
let currentssMenu;

console.log("ok");
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

// sub menu in mobile
console.log("nok");
let menuBtn = document.querySelectorAll(".hB-Menu>li");
let subMenu = document.querySelectorAll(".submenu");
let menuChevron = document.querySelectorAll(".menuChevron");
let headerBottom = document.getElementById("headerBottom");
let mobileMenu = document.getElementById("mobileMenu");

mobileMenu.addEventListener("click", function () {
  menuBtn.forEach((element, i) => {
    if (this.classList.contains("active")) {
      subMenu[i].classList.remove("active");
      menuChevron[i].classList.remove("active");
    }

    this.classList.toggle("active");
    headerBottom.classList.toggle("active");
  });
});

menuBtn.forEach((elem, index) => {
  elem.addEventListener("click", function () {
    menuBtn.forEach((element, i) => {
      if (i != index) {
        subMenu[i].classList.remove("active");
        menuChevron[i].classList.remove("active");
      }
    });
    subMenu[index].classList.toggle("active");
    menuChevron[index].classList.toggle("active");
  });
});

// fill likes heart after mouse over
let likes = document.querySelectorAll(".like");
let heart = document.querySelectorAll(".like>i");
likes.forEach((elem, index) => {
  elem.addEventListener("mouseover", function () {
    heart[index].classList.toggle("fa-solid");
    heart[index].classList.toggle("fa-light");
  });
  elem.addEventListener("mouseout", function () {
    heart[index].classList.toggle("fa-solid");
    heart[index].classList.toggle("fa-light");
  });
});

// back to top button
let previousX = 0;
let backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  if (document.querySelector("body").getBoundingClientRect().y < 0) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", function () {
  scrollTo(0, 0);
});
