document.addEventListener("DOMContentLoaded", () => {
    const all_btns = document.querySelectorAll("#btn_wrapper");
    const all_btn_circle = document.querySelectorAll(".btn-item");

    all_btns.forEach((btn, i) => {
        const circle = all_btn_circle[i];
        const span = circle.querySelector("span");

        let animFrame = null;
        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;

        function animate() {
            currentX += (targetX - currentX) * 0.1;
            currentY += (targetY - currentY) * 0.1;

            circle.style.setProperty("--mouse-transform", `translate(${currentX}px, ${currentY}px)`);

            // لو لسه بعيد عن النقطة الأصلية أو فيه حركة → كمل
            if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
                animFrame = requestAnimationFrame(animate);
            } else {
                cancelAnimationFrame(animFrame); // وقف اللوب
                animFrame = null; // 🟢 هنا بنصفره
            }
        }

        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const relX = e.clientX - rect.left;
            const relY = e.clientY - rect.top;

            const movement = 200;
            targetX = ((relX - rect.width / 2) / rect.width) * movement;
            targetY = ((relY - rect.height / 2) / rect.height) * movement;

            // حركة span مع الماوس مباشرة
            span.style.left = `${relX}px`;
            span.style.top = `${relY}px`;
            span.style.transform = "translate(-50%, -50%) scale(1)";

            if (!animFrame) animate();
        });

        btn.addEventListener("mouseleave", () => {
            targetX = 0;
            targetY = 0;
            if (!animFrame) animate(); // شغلها عشان ترجع براحه
            span.style.transform = "translate(-50%, -50%) scale(0)";

        });
    });


    // مراقبة العناصر
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        all_btn_circle.forEach((line, i) => {
          setTimeout(() => {
            line.classList.add("visible");
          }, i * 5000); // تأخير تدريجي 0.2s
        });
        observer.unobserve(entry.target); // يشتغل مرة واحدة
      }
    });
  }, { threshold: 0.3 });
  
  // ربط الأنيميشن بكل .text-anim
  document.querySelectorAll(".btn-item").forEach(el => observer.observe(el));
});

