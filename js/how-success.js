document.addEventListener("DOMContentLoaded", function () {
    const cols = document.querySelectorAll(".row2 .col");
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slideInDown");
          entry.target.style.animationDelay = `${index * 1}s`; // يزود التأخير بين الأعمدة
          observer.unobserve(entry.target); // يشيل المراقبة بعد ما يبان
        }
      });
    }, { threshold: 0.2 }); // يظهر لما 20% منه يدخل الشاشة
  
    cols.forEach(col => observer.observe(col));
  });
  