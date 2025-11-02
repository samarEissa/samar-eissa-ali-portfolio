const cursor1 = document.querySelector(".cursor1");
const cursor2 = document.querySelector(".cursor2");

document.addEventListener("mousemove", e => {
    let x = e.clientX;
    let y = e.clientY;

    cursor1.style.transform = `translate(${x}px, ${y}px)`;
    cursor2.style.transform = `translate(${x}px, ${y}px)`;
});

/////////////////////////////////////////////////////
// 03. Scroll Top
let scroll_top = document.getElementById("scroll_top");
if (scroll_top) {
    window.onscroll = function () {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            scroll_top.style.display = "block";
        } else {
            scroll_top.style.display = "none";
        }
    };

    scroll_top.addEventListener('click', function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
}
////////////////////////////////////////////////

