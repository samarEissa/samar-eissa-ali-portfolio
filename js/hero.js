// تقسيم السطور لكل .text-anim
document.querySelectorAll(".text-anim p,.text-anim").forEach(p => {
  const lines = p.innerHTML.split("<br>");
  p.innerHTML = lines
    .map(line => `<span class="text-anim-line">${line}</span>`)
    .join("<br>");
});

// مراقبة العناصر
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const lines = entry.target.querySelectorAll(".text-anim-line");
      lines.forEach((line, i) => {
        setTimeout(() => {
          line.classList.add("visible");
        }, i * 5000); // تأخير تدريجي 0.2s
      });
      observer.unobserve(entry.target); // يشتغل مرة واحدة
    }
  });
}, { threshold: 0.3 });

// ربط الأنيميشن بكل .text-anim
document.querySelectorAll(".text-anim").forEach(el => observer.observe(el));