document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".stat-number");
    let started = false; // علشان ميعدش كل مرة تعمل Scroll
  
    const startCounting = () => {
      counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        const increment = target / 200; // سرعة العد
        let current = 0;
  
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = "+" + Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = "+" + target;
          }
        };
  
        updateCounter();
      });
    };
  
    // مراقبة العناصر (IntersectionObserver)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
          startCounting();
          started = true;
        }
      });
    }, { threshold: 0.5 });
  
    observer.observe(document.querySelector(".stats-container"));
  });