document.addEventListener("DOMContentLoaded", async function () {
    const allLanguagesContainer = document.querySelector(".portfolio__inner-5")
    const fillLanguages = async () => {
        try {
            const res = await fetch('./js/data.json');
            const data = await res.json();


            const technologies = data.technologies

            Object.keys(technologies).forEach(category => {
                technologies[category].forEach(item => {
                    const languageDivContainer = document.createElement("div");
                    const languageImage = document.createElement("img");
                    const languageCategory = document.createElement("h4");
                    const languageName = document.createElement("p");
                    const containerOfCatWithName = document.createElement("div");

                    languageDivContainer.dataset.category = category
                    languageDivContainer.classList.add("portfolio__item-5")
                    languageImage.src = item.image
                    languageImage.classList.add("portfolio-img-tab")
                    languageDivContainer.appendChild(languageImage)

                    // --------------------------------------------

                    languageCategory.classList.add("portfolio__name-5")
                    languageCategory.innerText = category

                    languageName.classList.add("portfolio__title-5")
                    languageName.innerText = item.name

                    containerOfCatWithName.classList.add("portfolio__content-5")
                    containerOfCatWithName.appendChild(languageCategory)
                    containerOfCatWithName.appendChild(languageName)

                    languageDivContainer.appendChild(containerOfCatWithName)
                    allLanguagesContainer.appendChild(languageDivContainer)
                });
            });

            return true
        } catch (error) {
            console.log(error);
            return false
        }


    }

    const loaded = await fillLanguages();

    if (loaded) {

        // === الفلترة ===

        filteration()

        // === الأنيميشن وقت السكروول ===
        scrollSkewAnimation()
    }
})