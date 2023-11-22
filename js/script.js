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
