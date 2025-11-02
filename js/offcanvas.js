        // زرار الفتح
        document.getElementById("open_offcanvas").addEventListener("click", function () {
            const offcanvas = document.querySelector(".offcanvas__area");
            offcanvas.style.display = "block";
            offcanvas.style.visibility = "visible";
          });
          
          // زرار الغلق
          document.getElementById("close_offcanvas").addEventListener("click", function () {
            const offcanvas = document.querySelector(".offcanvas__area");
            offcanvas.style.display = "none";
            offcanvas.style.visibility = "hidden";
          });
          
          
          
//////////////////////////////////////////////////////////////////////////////
// دوال slideUp / slideDown
function slideUp(element, duration = 300) {
    element.style.transition = `height ${duration}ms ease`;
    element.style.overflow = "hidden";
    element.style.height = element.scrollHeight + "px";
    requestAnimationFrame(() => {
      element.style.height = "0";
    });
    setTimeout(() => {
      element.style.display = "none";
      element.style.height = "";
    }, duration);
  }
  
  function slideDown(element, duration = 300) {
    element.style.display = "block";
    element.style.overflow = "hidden";
    element.style.height = "0";
    requestAnimationFrame(() => {
      element.style.transition = `height ${duration}ms ease`;
      element.style.height = element.scrollHeight + "px";
    });
    setTimeout(() => {
      element.style.height = "";
    }, duration);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    // هات كل القوائم اللي فيها dropdown
    document.querySelectorAll(".mean-nav li").forEach(li => {
      const subMenu = li.querySelector("ul");
      if (subMenu) {
        subMenu.style.display = "none";
        // إضافة زر +
        const expandBtn = document.createElement("a");
        expandBtn.href = "#";
        expandBtn.className = "mean-expand";
        expandBtn.textContent = "+";
        li.insertBefore(expandBtn, subMenu);
  
        expandBtn.addEventListener("click", e => {
          e.preventDefault();
          if (subMenu.style.display === "block") {
            slideUp(subMenu, 300);
            expandBtn.textContent = "+";
          } else {
            slideDown(subMenu, 300);
            expandBtn.textContent = "–";
          }
        });
      }
    });
  
    // آخر li ياخد mean-last
    const liList = document.querySelectorAll(".mean-nav ul li");
    if (liList.length) {
      liList[liList.length - 1].classList.add("mean-last");
    }
  });          