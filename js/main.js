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

// swiper
let swipersCount = document.querySelectorAll(".productSlider");

for (index in swipersCount) {
  var swiper = new Swiper(`.mySwiper${index}`, {
    slidesPerView: 2,
    spaceBetween: 5,
    navigation: {
      nextEl: `.swiper-button-next${index}`,
      prevEl: `.swiper-button-prev${index}`,
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
}

// reviews slider
var swiper = new Swiper(`.rSwiper`, {
  slidesPerView: 1,
  spaceBetween: 10,
  navigation: {
    nextEl: `.rswiper-button-next`,
    prevEl: `.rswiper-button-prev`,
  },
  breakpoints: {
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
  keyboard: true,
});

// special offers timing
let specialTimes = [
  120, 24, 56, 93, 24, 90, 24, 24, 48, 24, 72, 48, 124, 100, 98, 48,
];
let specialMin = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let specialSec = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let specialOfferTiming = document.querySelectorAll(".specialOfferTime");
specialOfferTiming.forEach((elem, index) => {
  callSpecialOffer();
  function callSpecialOffer() {
    if (specialSec[index] == 0) {
      specialSec[index] = 59;
      changeSOInnerHTML();

      if (specialMin[index] == 0) {
        specialMin[index] = 59;
        changeSOInnerHTML();
        if (specialTimes[index] == 0) {
          changeSOInnerHTML();
        } else {
          specialTimes[index]--;
          changeSOInnerHTML();
        }
      } else {
        specialMin[index]--;
        changeSOInnerHTML();
      }
    } else {
      specialSec[index]--;
      changeSOInnerHTML();
    }
    setTimeout(callSpecialOffer, 1000);
  }
  function changeSOInnerHTML() {
    let timeHour = specialTimes[index];
    let timeMin = specialMin[index];
    let timeSec = specialSec[index];
    if (timeHour < 10) {
      timeHour = `0${timeHour}`;
    }
    if (timeMin < 10) {
      timeMin = `0${timeMin}`;
    }
    if (timeSec < 10) {
      timeSec = `0${timeSec}`;
    }
    elem.innerHTML = timeHour + ":" + timeMin + ":" + timeSec;
  }
});
