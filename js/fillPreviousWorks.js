document.addEventListener("DOMContentLoaded", async function () {
    const allWorksContainer = document.querySelector(".portfolio__inner-5")
    const filterationBtnsDiv = document.getElementById("filterationBtnsDiv")
    const fillPreviousWorks = async () => {
        try {
            const res = await fetch('./js/data.json');
            const data = await res.json();


            const previousWorks = data.previousWorks
            const previousWorksCat = Object.keys(previousWorks)
            const allCatBtn = document.createElement("button")
            allCatBtn.classList.add("tab-button")
            allCatBtn.classList.add("active")
            allCatBtn.innerText = "All"
            allCatBtn.dataset.category = "all"

            // Temporary arrays to store created elements
            const buttons = [];
            const works = [];

            // Loop once
            previousWorksCat.forEach(category => {
                // Create button
                const filtrationBtn = document.createElement("button");
                filtrationBtn.classList.add("tab-button");
                filtrationBtn.innerText = category;
                filtrationBtn.dataset.category = category;
                buttons.push(filtrationBtn); // store instead of appending

                // Create works for this category
                previousWorks[category].forEach(item => {
                    const workDivContainer = document.createElement("div");
                    const workImage = document.createElement("img");
                    const workCategory = document.createElement("h4");
                    const workName = document.createElement("p");
                    const containerOfCatWithName = document.createElement("div");

                    const iconSpan = document.createElement("span")
                    const moreSpan = document.createElement("span")


                    workDivContainer.dataset.category = category;
                    workDivContainer.classList.add("portfolio__item-5");

                    workImage.src = item["site home page images"];
                    workImage.classList.add("portfolio-img-height");
                    workDivContainer.appendChild(workImage);

                    workCategory.classList.add("portfolio__name-5");
                    workCategory.innerText = category;

                    workName.classList.add("portfolio__title-5");
                    workName.innerText = item["site name"];
                    iconSpan.innerHTML = '<i class="fa-solid fa-eye"></i>'
                    iconSpan.style.color = 'white'
                    moreSpan.innerHTML = `more about ${item['site name']}`
                    moreSpan.style.marginLeft = "10px"

                    containerOfCatWithName.classList.add("portfolio__content-5");
                    containerOfCatWithName.appendChild(workCategory);
                    containerOfCatWithName.appendChild(workName);
                    containerOfCatWithName.appendChild(iconSpan);
                    containerOfCatWithName.appendChild(moreSpan);

                    workDivContainer.appendChild(containerOfCatWithName);

                    workDivContainer.addEventListener("click", () => {
                        localStorage.setItem("workImgs", JSON.stringify(item["other images"]));
                        localStorage.setItem("workInfo", JSON.stringify(item));
                        window.location.href = "/site.html"
                    });

                    works.push(workDivContainer); // store instead of appending
                });
            });

            // ✅ Now append everything after the loop
            filterationBtnsDiv.appendChild(allCatBtn)
            buttons.forEach(btn => filterationBtnsDiv.appendChild(btn));
            works.forEach(work => allWorksContainer.appendChild(work));

            return true
        } catch (error) {
            console.log(error);
            return false
        }


    }

    const worksLoad = await fillPreviousWorks()
    if (worksLoad) {

        // === الفلترة ===

        filteration()

        // === الأنيميشن وقت السكروول ===
        scrollSkewAnimation()
    }

})