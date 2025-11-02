const items = document.querySelectorAll(".service__item");
        const images = document.querySelectorAll(".service__img");
        const spans = document.querySelectorAll(".service__img-wrapper span");


        items.forEach(item => {
            item.addEventListener("mouseenter", () => {
                const imgId = item.getAttribute("data-img");

                // الصور
                images.forEach(img => img.classList.remove("active"));
                document.querySelector(`.img-${imgId}`).classList.add("active");

                // الخدمات
                items.forEach(el => el.classList.remove("active"));
                item.classList.add("active");
            
                
                // الأشكال (span)
        spans.forEach(span => span.classList.remove("current"));
        document.querySelector(`.shape-box-${imgId}`).classList.add("current");
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".service__item");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
  
    items.forEach((item, index) => {
      // الرقم يظهر الأول
      const number = item.querySelector(".service__number");
      number.style.transitionDelay = `${index * 0.2}s`;
  
      // النصوص بعد الرقم بشوية
      item
        .querySelectorAll(".service__title-wrapper, .service__text, .service__link")
        .forEach((el, i) => {
          el.style.transitionDelay = `${index * 0.2 + (i + 1) * 0.2}s`;
        });
  
      observer.observe(item);
    });
  });
  
  