const filteration = () => {

    // === الفلترة ===
    const buttons = document.querySelectorAll(".tab-button");
    const items = document.querySelectorAll(".portfolio__item-5");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            // شيل active من الكل
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const category = button.getAttribute("data-category");

            items.forEach(item => {
                if (category === "all" || item.dataset.category.includes(category)) {
                    item.style.display = "block";
                    setTimeout(() => item.classList.add("visible"), 100); // تشغيل أنيميشن
                } else {
                    item.classList.remove("visible");
                    setTimeout(() => item.style.display = "none", 300);
                }
            });
        });
    });

}