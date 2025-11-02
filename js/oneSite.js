document.addEventListener("DOMContentLoaded", function () {

    const images = JSON.parse(localStorage.getItem("workImgs"))

    const mainImage = document.getElementById("mainImage");
    const thumbnailsContainer = document.getElementById("thumbnails");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let currentIndex = 0;

    // إنشاء الصور المصغّرة
    images.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.classList.add("thumbnail");
        if (index === currentIndex) img.classList.add("active");
        img.addEventListener("click", () => {
            currentIndex = index;
            updateSlider();
        });
        thumbnailsContainer.appendChild(img);
    });

    // تحديث الصورة الكبيرة
    function updateSlider() {
        mainImage.src = images[currentIndex];
        document.querySelectorAll(".thumbnail").forEach((thumb, i) => {
            thumb.classList.toggle("active", i === currentIndex);
        });
    }

    // أزرار التنقل
    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlider();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlider();
    });

    updateSlider()


    // ==============================================

    const siteName = document.getElementById("siteName")
    const siteLogo = document.getElementById("siteLogo")
    const siteInfo = document.getElementById("siteInfo")
    const usedTech = document.getElementById("usedTech")
    const siteLink = document.getElementById("siteLink")

    const localSiteInfo = JSON.parse(localStorage.getItem("workInfo"))

    console.log(localSiteInfo);

    siteName.innerText = localSiteInfo["site name"]
    siteLogo.src = localSiteInfo["site logo"]
    siteLink.href = localSiteInfo["site link"]

    localSiteInfo["used technologies"].forEach(tech => {
        const oneTechLi = document.createElement("li")
        const spanIcon = document.createElement("span")
        spanIcon.innerHTML = ' <i class="fas fa-laptop-code"></i>'
        const spanTech = document.createElement("span")
        spanTech.innerText = tech

        oneTechLi.appendChild(spanIcon)
        oneTechLi.appendChild(spanTech)

        usedTech.appendChild(oneTechLi)
    })

})