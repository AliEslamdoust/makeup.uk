// bread crumb
let breadCrumbContainer = document.getElementById("breadCrumb");
let breadCrumb = [
  "MAKEUP",
  "Makeup",
  "Makeup Removers ",
  "Bielenda Professional Program Face Soothing Micellar Liquid",
];
for (let i = 0; i <= breadCrumb.length - 1; i++) {
  let newCrumb = document.createElement("li");
  if (i == breadCrumb.length - 1) {
    let CrumbSpan = document.createElement("span");
    CrumbSpan.innerHTML = breadCrumb[i];
    newCrumb.appendChild(CrumbSpan);
  } else {
    let CrumbLink = document.createElement("a");
    CrumbLink.innerHTML = breadCrumb[i];
    CrumbLink.href = "#";
    newCrumb.appendChild(CrumbLink);
    newCrumb.innerHTML += "&nbsp;/&nbsp;";
  }
  breadCrumbContainer.appendChild(newCrumb);
}

// second bread crumb
let secBradCrumbContainer = document.getElementById("secBredCrumb");
let secBradCrumb = ["Bielenda Professional", "Face Program"];

for (let i = 0; i <= secBradCrumb.length - 1; i++) {
  let newSecCrumb = document.createElement("li");
  if (i == secBradCrumb.length - 1) {
    let newSecSpan = document.createElement("span");
    newSecSpan.innerHTML = secBradCrumb[i];
    newSecCrumb.append(newSecSpan);
  } else {
    let newSecLink = document.createElement("a");
    newSecLink.href = "#";
    newSecLink.innerHTML = secBradCrumb[i];
    newSecLink.innerHTML += "&nbsp;/&nbsp;";
    newSecCrumb.appendChild(newSecLink);
  }
  secBradCrumbContainer.appendChild(newSecCrumb);
}

// product slider on main page
let mSliderContainer = document.getElementById("mSlider");
let mSliders = document.querySelectorAll(".mSlider");
let mSlidersImages = document.querySelectorAll(".mSlider>img");
let mSliderPrevBtn = document.getElementById("mSliderPrev");
let mSliderNextBtn = document.getElementById("mSliderNext");

// creating pagination elemetns
let paginationContainer = document.getElementById("mSliderPagination");
for (let i = 0; i <= mSliders.length - 1; i++) {
  let span = document.createElement("span");
  let img = document.createElement("img");
  paginationContainer.appendChild(span);
  paginationContainer.appendChild(img);
}

let msliderPagination = document.querySelectorAll(".mSliderPagination>img");

msliderPagination.forEach((elem, index) => {
  elem.src = mSlidersImages[index].src;
});

let msliderPaginationSpan = document.querySelectorAll(
  ".mSliderPagination>span"
);
let mSliderCount = 0;

// set sliders width
mSliderContainer.style.width = mSliders.length * 100 + "%";

// moving slider using paginaton
msliderPagination.forEach((elem, index) => {
  elem.addEventListener("click", function () {
    mSliderCount = index;
    movemSlider();
  });
  msliderPaginationSpan[index].addEventListener("click", () => {
    mSliderCount = index;
    movemSlider();
  });
});

// change active mslider pagination
function changeActivemPagination() {
  msliderPagination.forEach((elem) => elem.classList.remove("active"));
  msliderPagination[mSliderCount].classList.add("active");
}
changeActivemPagination();

// slide mSlider with Buttons
mSliderNextBtn.addEventListener("click", mSliderNext);
mSliderPrevBtn.addEventListener("click", mSliderPrev);

function mSliderNext() {
  if (mSliderCount != mSliders.length - 1) {
    mSliderCount++;
  } else {
    mSliderCount = 0;
  }
  movemSlider();
}

function mSliderPrev() {
  if (mSliderCount != 0) {
    mSliderCount--;
  } else {
    mSliderCount = mSliders.length - 1;
  }
  movemSlider();
}

function movemSlider() {
  // simple movement
  mSliderContainer.style.transform = `translateX(-${
    (mSliderCount * 100) / mSliders.length
  }%)`;

  checkmPag();
}

function movemSliderTouch() {
  // moving with touch sliding
  if (movementX > 0) {
    mSliderNext();
  } else {
    mSliderPrev();
  }
}

// change mPagination active Btns after clicked on navgation/pagination btns
function checkmPag() {
  msliderPagination.forEach((elem, index) => {
    elem.classList.remove("active");
    msliderPaginationSpan[index].classList.remove("active");
  });
  msliderPagination[mSliderCount].classList.add("active");
  msliderPaginationSpan[mSliderCount].classList.add("active");
}
checkmPag();

// slider with touch
let startXPosition = 0;
let movementX = 0;
let mSliderIsMoving = false;
mSliderContainer.addEventListener("touchstart", function (e) {
  startXPosition = e.touches[0].clientX;
  mSliderIsMoving = true;

  this.addEventListener("touchmove", (event) => {
    movementX = startXPosition - event.touches[0].clientX;
    if (mSliderIsMoving) {
      this.style.transform = `translateX(calc(-${
        (mSliderCount * 100) / mSliders.length
      }% - ${movementX}px))`;
    }
  });
});

window.addEventListener("touchend", () => {
  if (Math.abs(movementX) > 100) {
    movemSliderTouch();
  } else {
    mSliderContainer.style.transform = `translateX(-${
      (mSliderCount * 100) / mSliders.length
    }%)`;
  }
  mSliderIsMoving = false;
});

// zoom in on product for desktop
window.addEventListener("resize", changeWindowWidth);
function changeWindowWidth() {
  windowWidth = window.innerWidth;
}
let windowWidth = window.innerWidth;

function sliderZooming() {
  let sliderZoom = document.getElementById("sliderZoom");

  mSliderContainer.addEventListener("mouseenter", () => {
    sliderZoom.style.backgroundImage = `url(${msliderPagination[mSliderCount].src})`;
  });

  mSliderContainer.addEventListener("mousemove", (e) => {
    let mSliderHeight = mSliderContainer.getBoundingClientRect().height;
    let mSliderWidth = mSliderContainer.getBoundingClientRect().width;

    let xPosition = e.offsetX;
    let yPosition = e.offsetY;

    sliderZoom.style.backgroundPosition = `${-Math.floor(
      (xPosition / mSliderWidth) * 100
    )}% ${Math.floor((yPosition / mSliderHeight) * 100)}%`;
  });
}

// product description height
let descriptionContainer = document.getElementById(
  "productDescriptionContainer"
);
let descriptions = document.querySelectorAll("#productDescriptions>li");

let descriptionsHeight = new Array();
function setpDescriptionContainerSize() {
  if (windowWidth > 1024) {
    descriptionContainer.style.height =
      descriptions[dSldierCount].getBoundingClientRect().height + 100 + "px";
  } else {
    descriptionContainer.style.height =
      descriptions[dSldierCount].getBoundingClientRect().height +
      descriptionBtnContainer.getBoundingClientRect().height +
      100 +
      "px";
  }
}

// description vertical slider
let descriptionBtnContainer = document.getElementById(
  "descriptionBtnContainer"
);
let descriptionsContainer = document.getElementById("productDescriptions");
let dSldierCount = 0;

let dBtnBorder = document.getElementById("dBtnBorder");
let dBtn = document.querySelectorAll("#descriptionBtn>li");

// description slider buttons
dBtn.forEach((elem, index) => {
  elem.addEventListener("click", function () {
    dSldierCount = index;
    movedSlider();
  });
});

function movedSlider() {
  if (windowWidth > 1024) {
    descriptions.forEach((elem) => {
      elem.classList.remove("hideX");
      elem.classList.add("hideY");
    });
    descriptions[dSldierCount].classList.remove("hideY");
  } else {
    descriptions.forEach((elem) => {
      elem.classList.remove("hideY");
      elem.classList.add("hideX");
    });
    descriptions[dSldierCount].classList.remove("hideX");
  }
  setpDescriptionContainerSize();
  activatedSliderBtn();
  movedSliderBorder();
  setdSliderBorderSize();
}

function activatedSliderBtn() {
  dBtn.forEach((elem) => elem.classList.remove("active"));
  dBtn[dSldierCount].classList.add("active");
}

function movedSliderBorder() {
  if (windowWidth > 1024) {
    dBtnBorder.style.left = "unset";
    dBtnBorder.style.bottom = "unset";
    dBtnBorder.style.top = `${dSldierCount * (100 / descriptions.length)}%`;
    dBtnBorder.style.right = "-2px";
  } else {
    dBtnBorder.style.left = `${
      dBtn[dSldierCount].getBoundingClientRect().left - 24
    }px`;
    dBtnBorder.style.bottom = "-2px";
    dBtnBorder.style.top = "unset";
    dBtnBorder.style.right = "unset";
  }
}

function setdSliderBorderSize() {
  if (windowWidth > 1024) {
    dBtnBorder.style.width = "2px";
    dBtnBorder.style.height = 100 / descriptions.length + "%";
  } else {
    dBtnBorder.style.width =
      dBtn[dSldierCount].getBoundingClientRect().width + "px";
    dBtnBorder.style.height = "2px";
  }
}

// fix errors with window resize
window.addEventListener("resize", fixAfterResize);

function fixAfterResize() {
  setpDescriptionContainerSize();
  movedSlider();
}

fixAfterResize();

// relted items slider
var swiper = new Swiper(`.dmySwiper`, {
  slidesPerView: 2,
  spaceBetween: 5,
  navigation: {
    nextEl: `.dswiper-button-next`,
    prevEl: `.dswiper-button-prev`,
  },
  breakpoints: {
    1024: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1440: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  },
  keyboard: true,
});

// post comment
let commentBtn = document.querySelectorAll(".toggleComment");
let commentFallBack = document.getElementById("commentFallBack");
let commentContainer = document.getElementById("addCommentContainer");

commentBtn.forEach((elem, index) => {
  elem.addEventListener("click", function () {
    commentFallBack.classList.toggle("hide");
    commentContainer.classList.toggle("active");
  });
});

// comment rating btns
let commentStars = document.querySelectorAll(".commentRatingStars>span");

commentStars.forEach((elem, index) => {
  elem.addEventListener("click", function () {
    for (let i = 0; i < commentStars.length; i++) {
      if (i <= index) {
        commentStars[i].classList.add("active");
      } else {
        commentStars[i].classList.remove("active");
      }
    }
  });
});

// shopping cart
let toggleShopingCart = document.querySelectorAll(".toggleShopingCart");
let cartContainer = document.getElementById("cartContainer");
let shoppingCartFallBack = document.getElementById("shoppingCartFallBack");

toggleShopingCart.forEach((elem) => {
  elem.addEventListener("click", toggleCart);
});

function toggleCart() {
  cartContainer.classList.toggle("active");
  shoppingCartFallBack.classList.toggle("hide");
}

let cartItemCount = 1;
let cartItemCountSpan = document.getElementById("cartItemCount");

function printCount() {
  cartItemCountSpan.innerHTML = cartItemCount;
  totalPrice = itemPrice * cartItemCount;
  totalPrice /= 100;
  printTotal();
  freeDelivery();
}

let addCartItem = document.getElementById("addCartItem");
addCartItem.addEventListener("click", addItem);

function addItem() {
  cartItemCount++;
  printCount();
}

let delCartItem = document.getElementById("delCartItem");
delCartItem.addEventListener("click", delItem);

function delItem() {
  if (cartItemCount > 1) {
    cartItemCount--;
    printCount();
  }
}

let itemPrice = 683;

let totalPrice = itemPrice;
let totalPriceSpan = document.querySelectorAll(".totalItemPrice");

function printTotal() {
  totalPriceSpan.forEach((elem) => (elem.innerHTML = totalPrice));
}

// free delivery
let freeDeliveryPrice = 19;
let freeDeliverySpan = document.getElementById("freeDelivery");
let freeDeliveryContainer = document.getElementById("freeDeliveryContainer");

function freeDelivery() {
  if (freeDeliveryPrice - totalPrice > 0) {
    freeDeliveryContainer.classList.remove("hide");
    freeDeliverySpan.innerHTML = freeDeliveryPrice - totalPrice;
  } else {
    freeDeliveryContainer.classList.add("hide");
  }
}

// removeItem
let removelCartItem = document.getElementById("removelCartItem");
removelCartItem.addEventListener("click", function () {
  cartItemCount = 1;
  printCount();
});

printCount();

// add / del item with sliding in phones

let isMovingItems = false;
let cMovementX = 0;
let cFirstX = 0;
let cartItemContent = document.querySelectorAll(".cartItemContent");

function slideCart() {
  cartItemContent.forEach((element, index) => {
    element.addEventListener("touchstart", function (event) {
      this.style.transition = "none !important";
      cFirstX = event.touches[0].clientX;
      isMovingItems = true;
    });

    element.addEventListener("touchmove", function (event) {
      if (isMovingItems) {
        document.documentElement.style.setProperty("--transition", "none");
        cMovementX = cFirstX - event.touches[0].clientX;
        element.style.transform = `translateX(calc(0px - ${cMovementX}px))`;

        if (
          Math.abs(cMovementX) >
          (this.getBoundingClientRect().width / 10) * 4
        ) {
          isMovingItems = false;
          document.documentElement.style.setProperty(
            "--transition",
            "all .25s ease"
          );
          this.style.transform = "translateX(0px)";
          changeItemCount();
        }

        if (cMovementX < 0) {
          checkAddingItem(index);
        } else {
          checkRemovingItem(index);
        }
      }
    });
  });

  window.addEventListener("touchend", function () {
    isMovingItems = false;
    cartItemContent.forEach((elem) => {
      document.documentElement.style.setProperty(
        "--transition",
        "all .25s ease"
      );
      elem.style.transform = "translateX(0px)";
    });
  });
}

let remItemDivs = document.querySelectorAll(".remItem");
let addItemDivs = document.querySelectorAll(".addItem");
let delItemDivs = document.querySelectorAll(".delItem");

function checkRemovingItem(index) {
  addItemDivs.forEach((elem) => elem.classList.remove("active"));
  remItemDivs.forEach((elem) => elem.classList.remove("active"));
  delItemDivs.forEach((elem) => elem.classList.remove("active"));
  if (cartItemCount > 1) {
    delItemDivs[index].classList.add("active");
  } else {
    remItemDivs[index].classList.add("active");
  }
}
function checkAddingItem(index) {
  remItemDivs.forEach((elem) => elem.classList.remove("active"));
  delItemDivs.forEach((elem) => elem.classList.remove("active"));
  addItemDivs.forEach((elem) => elem.classList.remove("active"));
  addItemDivs[index].classList.add("active");
}

function changeItemCount() {
  if (cMovementX < 0) {
    addItem();
  } else {
    if (cartItemCount == 1) {
      toggleCart();
    } else {
      delItem();
    }
  }
}

// check window width for mobile only/ desktop only functions and re-call them
window.addEventListener("resize", checkWindowWidth);

function checkWindowWidth() {
  sliderZooming();
  slideCart();
}
checkWindowWidth();
