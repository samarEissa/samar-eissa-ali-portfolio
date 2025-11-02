document.addEventListener("DOMContentLoaded", async function () {
    const allWorksContainer = document.querySelector(".portfolio__list-1")
    const fillPreviousWorks = async () => {
        try {
            const res = await fetch('./js/data.json');
            const data = await res.json();

            const previousWorks = data.previousWorks
            const previousWorksCat = Object.keys(previousWorks)
            previousWorksCat.forEach(category => {
                previousWorks[category].forEach(item => {

                    const workContainer = document.createElement("div")
                    const goToInfoPage = document.createElement("a")
                    const workHomeImg = document.createElement("img")
                    const workNameContainer = document.createElement("div")
                    const workName = document.createElement("h3")
                    const iconSpan = document.createElement("span")
                    const moreSpan = document.createElement("span")
                    goToInfoPage.href = "./site.html"
                    workHomeImg.src = item['site home page images']
                    workHomeImg.classList.add("mover")
                    goToInfoPage.appendChild(workHomeImg)

                    workName.classList.add("portfolio__title")
                    workName.innerText = item['site name']
                    iconSpan.innerHTML = '<i class="fa-solid fa-eye"></i>'
                    iconSpan.style.color = 'white'
                    moreSpan.innerHTML = `more about ${item['site name']}`
                    moreSpan.style.marginLeft = "10px"

                    workNameContainer.classList.add("portfolio__info")
                    workNameContainer.appendChild(workName)
                    workNameContainer.appendChild(iconSpan)
                    workNameContainer.appendChild(moreSpan)

                    workContainer.classList.add("portfolio__item")
                    workContainer.appendChild(goToInfoPage)
                    workContainer.appendChild(workNameContainer)
                    workContainer.addEventListener("click", () => {
                        localStorage.setItem("workImgs", JSON.stringify(item["other images"]));
                        localStorage.setItem("workInfo", JSON.stringify(item));
                        window.location.href = "/site.html"
                    });

                    allWorksContainer.appendChild(workContainer)

                })
            })
            return true
        } catch (error) {
            console.log(error);
            return false
        }

    }
    const load = await fillPreviousWorks()

    if (load) {
        const portfolioItems = document.querySelectorAll('.portfolio__item');
        const portfolioText = document.querySelector('.portfolio__text');

        // تجهيز الكروت: مخفية ومصغّرة في الأول
        portfolioItems.forEach(item => {
            item.style.opacity = '0.1';
            item.style.transform = 'perspective(4000px) rotateX(90deg) scale(0.5, 0.5) translate3d(0,50px,0)';
            item.style.transition = 'transform 2s ease, opacity 2s ease';
        });

        function isInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top < window.innerHeight - 100 &&
                rect.bottom > 100
            );
        }

        function scrollAnimations() {
            const windowHeight = window.innerHeight;

            portfolioItems.forEach((item, index) => {
                const rect = item.getBoundingClientRect();
                const itemTop = rect.top;
                const itemHeight = rect.height;
                // نسبة دخول الكارت في الفيو (0 إلى 1)
                let progress = 1.1 - (itemTop + itemHeight) / (windowHeight + itemHeight);

                // ضبط progress بحيث يكتمل قبل نهاية الفيو (مثلاً 0.85 بدلاً من 1)
                if (progress < 0) progress = 0;
                if (progress > 0.6) progress = 0.85; // هكذا التعديل النهائي يحصل قبل نهاية الفيو
                progress = progress / .85;





                // تحديد offset لكل كارت حسب موقعه في الصف (حتى/فردي)
                if (window.innerWidth > 1024) {
                    offsetY = (index % 2 === 0) ? 500 : 0; // ديسكتوب
                } else if (window.innerWidth > 768) {
                    offsetY = (index % 2 === 0) ? 180 : 0; // تابلت
                } else {
                    offsetY = (index % 2 === 0) ? 40 : 0; // موبايل
                }

                // تطبيق التحولات
                const rotateX = 90 - progress * 90;
                const scale = 0.5 + progress * 0.5;
                const translateY = 50 - progress * 50 - offsetY;
                const opacity = 0.1 + progress * 0.85;





                item.style.transform = `perspective(4000px) rotateX(${rotateX}deg) scale(${scale}, ${scale}) translate3d(0,${translateY}px,0)`;
                item.style.opacity = opacity;
                item.style.transition = 'transform 0.1s linear, opacity 0.1s linear';
            });

            // Text scale effect
            if (window.innerWidth > 767) {
                const scrollTop = window.scrollY || window.pageYOffset;
                const area = document.querySelector('.portfolio__area');
                const portfolioText = document.querySelector('.portfolio__text');

                const areaTop = area.offsetTop;
                const areaHeight = area.offsetHeight;
                const areaBottom = areaTop + areaHeight;


                // نحسب progress بين 0 → 0.85 قبل نهاية السكشن
                let progress = (scrollTop - areaTop) / areaHeight;
                if (progress < 0) progress = 0;
                if (progress > 0.55) progress = 0.55; // يكتمل قبل نهاية السكشن

                // آخر موضع للنص
                const maxMoveY = areaHeight - portfolioText.offsetHeight - 50;
                const moveY = (progress / 0.55) * maxMoveY; // نرفع progress لنسبة 0→1

                const maxScale = 2;
                const scale = 1 + (progress / 0.55) * (maxScale - 1);

                portfolioText.style.transform = `translate3d(0, ${moveY}px, 0) scale(${scale},${scale})`;

            }


        }

        window.addEventListener('scroll', scrollAnimations);
        scrollAnimations();
    }
})