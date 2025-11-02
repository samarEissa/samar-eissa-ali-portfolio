// ================== فريق العمل ==================
const oursiteTrack = document.querySelector(".our-site-track");
const oursiteSlides = document.querySelectorAll(".our-site-track .our-site-slide");

let oursiteIndex = 0;

// دالة تحدد عدد الكروت في الصف حسب حجم الشاشة
function getSlidesPerView() {
  const width = window.innerWidth;
  if (width <= 600) return 1;
  if (width <= 1024) return 2;
  return 3;
}

// دالة لحساب عرض الكرت + gap + padding
function getSlideWidth() {
  const slide = oursiteSlides[0];
  const slideStyle = getComputedStyle(slide);
  const marginRight = parseFloat(slideStyle.marginRight) || 0;

  const trackStyle = getComputedStyle(oursiteTrack);
  const trackPaddingLeft = parseFloat(trackStyle.paddingLeft) || 0;
  const trackPaddingRight = parseFloat(trackStyle.paddingRight) || 0;

  return slide.offsetWidth + marginRight + (trackPaddingLeft + trackPaddingRight) / getSlidesPerView();
}

// نسخ أول العناصر عشان الانتقال السلس
function cloneSlides() {
  const slidesPerView = getSlidesPerView();
  for (let i = 0; i < slidesPerView; i++) {
    const clone = oursiteSlides[i].cloneNode(true);
    oursiteTrack.appendChild(clone);
  }
}

cloneSlides();

// دالة عرض السلايدر
function showOursiteSlide(index) {
  const slideWidth = getSlideWidth();
  const offset = index * slideWidth; // موجب للتحرك لليمين
  oursiteTrack.style.transform = `translateX(${offset}px)`;
  oursiteTrack.style.transition = "transform 0.5s ease-in-out";
}

// بدء السلايدر
function startOursiteSlider() {
  const slidesPerView = getSlidesPerView();
  const totalSlides = oursiteSlides.length;

  setInterval(() => {
    oursiteIndex++;
    showOursiteSlide(oursiteIndex);

    if (oursiteIndex >= totalSlides) {
      setTimeout(() => {
        oursiteTrack.style.transition = "none";
        oursiteIndex = 0;
        showOursiteSlide(oursiteIndex);
        setTimeout(() => {
          oursiteTrack.style.transition = "transform 0.5s ease-in-out";
        }, 50);
      }, 500);
    }
  }, 5000);
}

// إعادة ضبط عند تغير حجم الشاشة
window.addEventListener("resize", () => {
  showOursiteSlide(oursiteIndex);
});

startOursiteSlider();
