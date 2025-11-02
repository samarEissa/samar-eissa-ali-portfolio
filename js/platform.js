const platforms_track = document.querySelector(".platforms-logos");
const platforms_slides = document.querySelectorAll(".platform-logo");

let platformsCurrentIndex = 0;
let platforms_slidesPerView = 3;


// 🔹 نحدد عدد العناصر الظاهرة حسب حجم الشاشة
function updateSlidesPerView_platforms() {
  if (window.innerWidth <= 600) {
    platforms_slidesPerView = 1;
  } else if (window.innerWidth <= 991) {
    platforms_slidesPerView = 2;
  } else {
    platforms_slidesPerView = 3;
  }
}

updateSlidesPerView_platforms();
window.addEventListener("resize", updateSlidesPerView_platforms);

const totalplatformSlides = platforms_slides.length;

for (let i = 0; i < platforms_slidesPerView; i++) {
  const clone_platform = platforms_slides[i].cloneNode(true);
  platforms_track.appendChild(clone_platform);
}

function showplatformSlide(index) {
  const offset_platform = (index * (100 / platforms_slidesPerView)+10);
  platforms_track.style.transform = `translateX(${offset_platform}%)`;
}

function startplatformSlider() {
  setInterval(() => {
    platformsCurrentIndex++;
    showplatformSlide(platformsCurrentIndex);

    if (platformsCurrentIndex === totalplatformSlides) {
      setTimeout(() => {
        platforms_track.style.transition = "none";
        showplatformSlide(0);
        setTimeout(() => {
          platforms_track.style.transition = "transform 1s ease-in-out";
        }, 50);
        platformsCurrentIndex = 0;
      }, 4000);
    }
  }, 3000);
}


platforms_track.style.transition = "transform 1s ease-in-out";
startplatformSlider();