const partner_track = document.querySelector(".partners-logos");
const partner_slides = document.querySelectorAll(".partner-logo");

let partnersCurrentIndex = 0;
const partners_slidesPerView = 4; // ✅ 4 شعارات
const totalPartnerSlides = partner_slides.length;

// نعمل نسخة من أول 4 شعارات عشان السلايدر يبقى مستمر
for (let i = 0; i < partners_slidesPerView; i++) {
  const clone_partner = partner_slides[i].cloneNode(true);
  partner_track.appendChild(clone_partner);
}

function showpartnerSlide(index) {
  // ✅ التحريك بمقدار 25% (لأن 4 شعارات = 100 / 4 = 25)
  const offset_partner = (index * 30);
  partner_track.style.transform = `translateX(${offset_partner}%)`;
  partnersCurrentIndex = index;
}

function startpartnerSlider() {
  setInterval(() => {
    partnersCurrentIndex++;
    showpartnerSlide(partnersCurrentIndex);

    if (partnersCurrentIndex === totalPartnerSlides) {
      setTimeout(() => {
        partner_track.style.transition = "none";
        showpartnerSlide(0);
        setTimeout(() => {
          partner_track.style.transition = "transform 1s ease-in-out";
        }, 50);
        partnersCurrentIndex = 0;
      }, 4000);
    }
  }, 2000);
}

startpartnerSlider();
