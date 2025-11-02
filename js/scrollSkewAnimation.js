const scrollSkewAnimation = () => {
    const items = document.querySelectorAll(".portfolio__item-5");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    items.forEach(item => observer.observe(item));


    const portfolioItems = document.querySelectorAll(".portfolio__item-5");
    let lastScrollTop = 0;
    let ticking = false;

    // مراقبة السكروول
    window.addEventListener("scroll", function () {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const scrollDir = scrollTop > lastScrollTop ? "down" : "up"; // تحديد الاتجاه

                portfolioItems.forEach(item => {
                    if (scrollDir === "down") {
                        item.style.transform = "skewY(6deg)";
                    } else {
                        item.style.transform = "skewY(-6deg)";
                    }
                });

                // استرجاع الشكل الطبيعي بعد 300 مللي ثانية
                clearTimeout(window.resetSkewTimeout);
                window.resetSkewTimeout = setTimeout(() => {
                    portfolioItems.forEach(item => {
                        item.style.transform = "skewY(0deg)";
                    });
                }, 200);

                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
                ticking = false;
            });
            ticking = true;
        }
    });
}