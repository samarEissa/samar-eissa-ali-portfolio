
const items = document.querySelectorAll(".accordion-item");

items.forEach(item => {
  const btn = item.querySelector(".accordion-button");
  btn.addEventListener("click", () => {
    // نقفل الكل
    items.forEach(i => i.classList.remove("active"));
    // نفتح العنصر اللي اتضغط عليه
    item.classList.add("active");
  });
});