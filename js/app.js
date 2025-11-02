         
                      
// ضبط عتبة التمرير (قيمة البكسل بعد أيها يتغير الهيدر)
const SCROLL_THRESHOLD = 60; // غيّر الرقم حسب رغبتك

const header = document.getElementById('site-header')
function onScroll() {
  if (window.scrollY > SCROLL_THRESHOLD) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}
// تنفيذ فوري عند التحميل لفحص الحالة إذا كانت الصفحة مفتوحة في منتصفها
onScroll();
// ربط الحدث مع استخدام passive listener لتحسين الأداء
window.addEventListener('scroll', onScroll, { passive: true });

// =================================================================================================================
// app.js — modular vanilla JS for the page
document.addEventListener('DOMContentLoaded', function () {

  /* ----------------------
     Header / Mobile nav
     ---------------------- */
  (function headerModule() {
    const hamb = document.getElementById('hamburger');
    const nav = document.querySelector('.nav-links');
    hamb && hamb.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
    document.getElementById('callNow').addEventListener('click', () => {
      window.location.href = 'tel:+201556000180';
    });
    // close mobile menu on link click
    document.querySelectorAll('.main-nav a').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth < 980 && nav) nav.style.display = 'none';
      });
    });
  })();

  /* ----------------------
     Smooth scroll
     ---------------------- */
  (function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  })();

});

// خلي الكليك على اللينك اللي جوه .dropdown يفتح القايمة
document.querySelectorAll(".dropdown > a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // يمنع الانتقال لصفحة services.html
    const parent = link.parentElement;

    // قفل أي قايمة مفتوحة قبل ما نفتح الجديدة
    document.querySelectorAll(".dropdown.open").forEach(drop => {
      if (drop !== parent) drop.classList.remove("open");
    });

    // فتح/قفل القايمة الحالية
    parent.classList.toggle("open");
  });
});

// إغلاق القايمة لو ضغطت براها
document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown.open").forEach(drop => {
      drop.classList.remove("open");
    });
  }
});

// تمييز اللينك الحالي
const currentLocation = location.href;
const menuItem = document.querySelectorAll('.nav-links a');
menuItem.forEach(link => {
  if (link.href === currentLocation) {
    link.classList.add("active");
  }
});
const hamburger = document.getElementById("hamburger");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active"); // يغير شكل الزرار
  hamburger.classList.toggle("show");    // يفتح/يقفل القائمة
});

// =================================================================================================================


// hero section animation
document.addEventListener('DOMContentLoaded', () => {
  // KPI counter animation
  const nums = document.querySelectorAll('.kpi .num');
  nums.forEach(el => {
    const target = parseInt(el.dataset.count, 10) || 0;
    let current = 0;
    const duration = 1500;
    const stepTime = Math.max(20, duration / target);
    const counter = setInterval(() => {
      current += Math.ceil(target / (duration / stepTime));
      if (current >= target) {
        el.textContent = target + '+';
        clearInterval(counter);
      } else {
        el.textContent = current;
      }
    }, stepTime);
  });
});

// =================================================================================================================

// Optional: simple animation on scroll
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".service-card");
  const reveal = () => {
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        card.classList.add("visible");
      }
    });
  };
  window.addEventListener("scroll", reveal);
  reveal();
});

// =================================================================================================================

// حركة ظهور البطاقات عند التمرير (بسيطة بدون مكتبات)
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.stage-card');

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity .6s ease, transform .6s ease';
    io.observe(card);
  });
});

// =================================================================================================================

// حركة ظهور المشاريع عند التمرير
document.addEventListener('DOMContentLoaded', () => {
  const projects = document.querySelectorAll('.project-card');

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  projects.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity .6s ease, transform .6s ease';
    io.observe(card);
  });
});

// ==============================================testimonials===================================================================
document.addEventListener('DOMContentLoaded', () => {
  const slider_testimonials = document.querySelector('#testimonials .slider-testimonials');
  const viewport = slider_testimonials.querySelector('.viewport');
  const track = slider_testimonials.querySelector('.track');
  const slidesOriginal = Array.from(track.children);
  const prevBtn = slider_testimonials.querySelector('.nav.prev');
  const nextBtn = slider_testimonials.querySelector('.nav.next');
  const dotsWrap = slider_testimonials.querySelector('.dots');

  let perView = 3;
  let index = 0;
  let slideW = 0;
  let gapPx = 18;

  // RTL: نخلي التراك يمشي بالعكس
  track.style.flexDirection = "row-reverse";

  function computePerView() {
    const w = viewport.clientWidth;
    if (w <= 600) return 1;
    if (w <= 992) return 2;
    return 3;
  }

  function buildClones() {
    // مسح أي نسخ قديمة
    track.querySelectorAll('.clone').forEach(c => c.remove());

    const clonesStart = slidesOriginal.slice(-perView).map(s => {
      const c = s.cloneNode(true);
      c.classList.add('clone');
      return c;
    });
    const clonesEnd = slidesOriginal.slice(0, perView).map(s => {
      const c = s.cloneNode(true);
      c.classList.add('clone');
      return c;
    });

    // ترتيب RTL (نضيف نسخ البداية قبل الأصلية)
    clonesStart.forEach(c => track.insertBefore(c, track.firstChild));
    clonesEnd.forEach(c => track.appendChild(c));
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    slidesOriginal.forEach((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', `انتقال إلى المهارة ${i + 1}`);
      b.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(b);
    });
  }

  function syncDots() {
    const btns = dotsWrap.querySelectorAll('button');
    btns.forEach((b, i) => b.setAttribute('aria-selected', i === index ? 'true' : 'false'));
  }

  function measure() {
    perView = computePerView();
    buildClones();
    const slideEl = track.querySelector('.slide');
    slideW = slideEl.getBoundingClientRect().width + gapPx;
    setTranslate((index + perView) * slideW, false);
  }

  function setTranslate(x, animate = true) {
    track.style.transition = animate ? 'transform .45s cubic-bezier(.22,.61,.36,1)' : 'none';
    track.style.transform = `translateX(${-x}px)`; // RTL: بالسالب
  }

  function currentOffset() {
    return (index + perView) * slideW; // موجب
  }

  function goTo(newIndex) {
    index = ((newIndex % slidesOriginal.length) + slidesOriginal.length) % slidesOriginal.length;
    setTranslate(currentOffset(), true);
    syncDots();
  }
  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  // سحب/لمس
  let isDown = false, startX = 0, startOffset = 0, delta = 0;
  function onPointerDown(clientX) {
    isDown = true;
    track.classList.add('is-dragging');
    startX = clientX;
    startOffset = currentOffset();
  }
  function onPointerMove(clientX) {
    if (!isDown) return;
    delta = clientX - startX;
    const newOffset = startOffset - delta;
    setTranslate(newOffset, false);
  }
  function onPointerUp() {
    if (!isDown) return;
    isDown = false;
    track.classList.remove('is-dragging');
    const threshold = slideW * 0.25;
    if (Math.abs(delta) > threshold) {
      if (delta > 0) { prev(); }
      else { next(); }
    } else {
      setTranslate(currentOffset(), true);
      syncDots();
    }
    delta = 0;
  }

  viewport.addEventListener('mousedown', e => onPointerDown(e.clientX));
  window.addEventListener('mousemove', e => onPointerMove(e.clientX));
  window.addEventListener('mouseup', onPointerUp);
  viewport.addEventListener('touchstart', e => onPointerDown(e.touches[0].clientX), { passive: true });
  window.addEventListener('touchmove', e => onPointerMove(e.touches[0].clientX), { passive: true });
  window.addEventListener('touchend', onPointerUp);

  viewport.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { next(); }
    if (e.key === 'ArrowRight') { prev(); }
  });

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  track.addEventListener('transitionend', () => {
    const maxIndex = slidesOriginal.length - 1;
    if (index < 0) index = maxIndex;
    if (index > maxIndex) index = 0;
    setTranslate(currentOffset(), false);
  });

  window.addEventListener('resize', () => {
    const oldIndex = index;
    measure();
    index = oldIndex;
    setTranslate(currentOffset(), false);
    syncDots();
  });

  buildDots();
  measure();
  syncDots();
});


// =================================================slider================================================================
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('#skills-slider .slider');
  const viewport = slider.querySelector('.viewport');
  const track = slider.querySelector('.track');
  const slidesOriginal = Array.from(track.children);
  const prevBtn = slider.querySelector('.nav.prev');
  const nextBtn = slider.querySelector('.nav.next');
  const dotsWrap = slider.querySelector('.dots');

  let perView = 3;
  let index = 0;
  let slideW = 0;
  let gapPx = 18;

  // RTL: نخلي التراك يمشي بالعكس
  track.style.flexDirection = "row-reverse";

  function computePerView() {
    const w = viewport.clientWidth;
    if (w <= 600) return 1;
    if (w <= 992) return 2;
    return 3;
  }

  function buildClones() {
    // مسح أي نسخ قديمة
    track.querySelectorAll('.clone').forEach(c => c.remove());

    const clonesStart = slidesOriginal.slice(-perView).map(s => {
      const c = s.cloneNode(true);
      c.classList.add('clone');
      return c;
    });
    const clonesEnd = slidesOriginal.slice(0, perView).map(s => {
      const c = s.cloneNode(true);
      c.classList.add('clone');
      return c;
    });

    // ترتيب RTL (نضيف نسخ البداية قبل الأصلية)
    clonesStart.forEach(c => track.insertBefore(c, track.firstChild));
    clonesEnd.forEach(c => track.appendChild(c));
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    slidesOriginal.forEach((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', `انتقال إلى المهارة ${i + 1}`);
      b.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(b);
    });
  }

  function syncDots() {
    const btns = dotsWrap.querySelectorAll('button');
    btns.forEach((b, i) => b.setAttribute('aria-selected', i === index ? 'true' : 'false'));
  }

  function measure() {
    perView = computePerView();
    buildClones();
    const slideEl = track.querySelector('.slide');
    slideW = slideEl.getBoundingClientRect().width + gapPx;
    setTranslate((index + perView) * slideW, false);
  }

  function setTranslate(x, animate = true) {
    track.style.transition = animate ? 'transform .45s cubic-bezier(.22,.61,.36,1)' : 'none';
    track.style.transform = `translateX(${-x}px)`; // RTL: بالسالب
  }

  function currentOffset() {
    return (index + perView) * slideW; // موجب
  }

  function goTo(newIndex) {
    index = ((newIndex % slidesOriginal.length) + slidesOriginal.length) % slidesOriginal.length;
    setTranslate(currentOffset(), true);
    syncDots();
  }
  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  // سحب/لمس
  let isDown = false, startX = 0, startOffset = 0, delta = 0;
  function onPointerDown(clientX) {
    isDown = true;
    track.classList.add('is-dragging');
    startX = clientX;
    startOffset = currentOffset();
  }
  function onPointerMove(clientX) {
    if (!isDown) return;
    delta = clientX - startX;
    const newOffset = startOffset - delta;
    setTranslate(newOffset, false);
  }
  function onPointerUp() {
    if (!isDown) return;
    isDown = false;
    track.classList.remove('is-dragging');
    const threshold = slideW * 0.25;
    if (Math.abs(delta) > threshold) {
      if (delta > 0) { prev(); }
      else { next(); }
    } else {
      setTranslate(currentOffset(), true);
      syncDots();
    }
    delta = 0;
  }

  viewport.addEventListener('mousedown', e => onPointerDown(e.clientX));
  window.addEventListener('mousemove', e => onPointerMove(e.clientX));
  window.addEventListener('mouseup', onPointerUp);
  viewport.addEventListener('touchstart', e => onPointerDown(e.touches[0].clientX), { passive: true });
  window.addEventListener('touchmove', e => onPointerMove(e.touches[0].clientX), { passive: true });
  window.addEventListener('touchend', onPointerUp);

  viewport.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { next(); }
    if (e.key === 'ArrowRight') { prev(); }
  });

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  track.addEventListener('transitionend', () => {
    const maxIndex = slidesOriginal.length - 1;
    if (index < 0) index = maxIndex;
    if (index > maxIndex) index = 0;
    setTranslate(currentOffset(), false);
  });

  window.addEventListener('resize', () => {
    const oldIndex = index;
    measure();
    index = oldIndex;
    setTranslate(currentOffset(), false);
    syncDots();
  });

  buildDots();
  measure();
  syncDots();
});


// ===============================================projects=================================================================

// Select buttons and projects
const filterButtons = document.querySelectorAll(".filters button");
const projects = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove("active-filter"));
    button.classList.add("active-filter");

    const filter = button.getAttribute("data-filter");

    projects.forEach(project => {
      const category = project.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        project.classList.remove("hidden");
      } else {
        project.classList.add("hidden");
      }
    });
  });
});

// ===============================================projects Gallery=================================================================


 // Gallery Slider function
// Gallery Slider function
document.addEventListener("DOMContentLoaded", () => {
  const mainImg = document.getElementById("projectMainImg");
  const track = document.querySelector(".gallerySlider .owl-stage");
  const imgs = document.querySelectorAll(".gallerySlider .img img");
  const prevBtn = document.querySelector(".gallerySlider .owl-prev");
  const nextBtn = document.querySelector(".gallerySlider .owl-next");

  let index = 0;

  // عند الضغط على أي صورة → تعرضها في الرئيسية
  imgs.forEach((img, i) => {
    img.addEventListener("click", () => {
      mainImg.innerHTML = `<img src="${img.src}" alt="Main Image">`;
      document.querySelectorAll(".gallerySlider .img").forEach(i => i.classList.remove("active"));
      img.parentElement.classList.add("active");
      index = i; // تحديث الفهرس
    });
  });

  // حساب العرض الفعلي للصورة (مع الهامش)
  const slideWidth = document.querySelector(".gallerySlider .owl-item").offsetWidth + 10;

  // زر السابق (يمين)
  prevBtn.addEventListener("click", () => {
    index--;
    if (index < 0) index = imgs.length - 1; // لو أول صورة → يرجع لآخر صورة
    track.style.transform = `translateX(${slideWidth * index/3}px)`;
    updateMainImage();
  });

  // زر التالي (يسار)
  nextBtn.addEventListener("click", () => {
    index++;
    if (index >= imgs.length) index = 0; // لو آخر صورة → يرجع لأول صورة
    track.style.transform = `translateX(${slideWidth * index/3}px)`;
    updateMainImage();
  });

  // تحديث الصورة الرئيسية والـ active
  function updateMainImage() {
    const img = imgs[index];
    mainImg.innerHTML = `<img src="${img.src}" alt="Main Image">`;
    document.querySelectorAll(".gallerySlider .img").forEach(i => i.classList.remove("active"));
    img.parentElement.classList.add("active");
  }
});








// ===============================================modal==================================================================

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalLink = document.getElementById("modal-link");

  modal.style.display = "none";

  const projects = document.querySelectorAll(".project");

  projects.forEach((project) => {
    project.addEventListener("click", function () {
      console.log("project", project);
      const imageSrc = this.getAttribute("data-src");
      const title = this.getAttribute("data-title");
      const description = this.getAttribute("data-desc");
      const link = this.getAttribute("data-link");

      modalImg.src = imageSrc;
      modalTitle.innerText = title;
      modalDesc.innerText = description;
      modalLink.href = link;
      modal.style.display = "flex"; //  المودال
    });
  });

  // قفل
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  function closeModal() {
    modal.style.display = "none";
  }

  document.querySelector(".close").addEventListener("click", closeModal);
});