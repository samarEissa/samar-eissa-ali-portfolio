const menuBtn = document.querySelector('.menu-btn'); 
const mobileMenu = document.getElementById('main-menu');
const menuOverlay = document.getElementById('menu-overlay');

// فتح المنيو
// menuBtn.addEventListener('click', function(e){
//     e.preventDefault();
//     mobileMenu.classList.add('active');
//     menuOverlay.classList.add('active');
// });

// إغلاق عند الضغط على الـ overlay
// menuOverlay.addEventListener('click', function(){
//     mobileMenu.classList.remove('active');
//     menuOverlay.classList.remove('active');
// });
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownList = document.querySelector('.dropdown-list');

// فتح/إغلاق المنيو عند الضغط
// dropdownBtn.addEventListener('click', function(e){
//     e.preventDefault();
//     dropdownList.classList.toggle('active');
// });

// إغلاق عند الضغط برة المنيو
document.addEventListener('click', function(e){
    if (!dropdownBtn.contains(e.target) && !dropdownList.contains(e.target)) {
        dropdownList.classList.remove('active');
    }
});
