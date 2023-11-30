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

if (windowWidth >= 1024) {
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
