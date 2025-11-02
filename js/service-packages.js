// script.js — robust desktop hover/click + mobile scroll behaviour
(function(){
  const wrapper = document.querySelector('#expanding-cards .ue_options');
  if (!wrapper) return;

  const options = Array.from(wrapper.querySelectorAll('.ue_option'));
  const BREAKPOINT = 991; // <= this => mobile/tablet behaviour
  const isTouchDevice = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

  let mode = null; // 'desktop' or 'mobile'
  let observer = null;
  const handlersMap = new WeakMap(); // store handlers to remove later

  function setActive(target){
    if (!target) return;
    options.forEach(opt => {
      const active = opt === target;
      opt.classList.toggle('active', active);
      opt.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  // keyboard navigation helper
  function focusAndActivate(index){
    const clamped = (index + options.length) % options.length;
    const target = options[clamped];
    if (!target) return;
    target.focus();
    setActive(target);
  }

  // ----- Desktop handlers -----
  function addDesktopHandlers(){
    options.forEach((opt, idx) => {
      // click: if click on a link inside, allow navigation but setActive first
      const onClick = (e) => {
        // if clicked a link inside, let it navigate; still set active
        setActive(opt);
        // do NOT prevent default; navigation will proceed if it's a link
      };

      const onPointerEnter = () => setActive(opt);

      const onKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActive(opt);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          focusAndActivate(idx - 1);
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          focusAndActivate(idx + 1);
        }
      };

      opt.addEventListener('click', onClick);
      opt.addEventListener('keydown', onKeyDown);
      // pointerenter only for non-touch devices (avoid interfering on touchscreens)
      if (!isTouchDevice) opt.addEventListener('pointerenter', onPointerEnter);

      handlersMap.set(opt, { onClick, onPointerEnter, onKeyDown });
    });
  }

  function removeDesktopHandlers(){
    options.forEach(opt => {
      const h = handlersMap.get(opt);
      if (!h) return;
      if (h.onClick) opt.removeEventListener('click', h.onClick);
      if (h.onKeyDown) opt.removeEventListener('keydown', h.onKeyDown);
      if (h.onPointerEnter) opt.removeEventListener('pointerenter', h.onPointerEnter);
      handlersMap.delete(opt);
    });
  }

  // ----- Mobile / Tablet observer -----
  function addMobileObserver(){
    if (observer) return;
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // when item becomes visible enough, activate it
          setActive(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.55 // adjust: ~55% visible to activate
    });

    options.forEach(opt => observer.observe(opt));
  }

  function removeMobileObserver(){
    if (!observer) return;
    observer.disconnect();
    observer = null;
  }

  // ----- Mode switching -----
  function updateMode() {
    const want = (window.innerWidth <= BREAKPOINT) ? 'mobile' : 'desktop';
    if (want === mode) return; // no change

    if (want === 'mobile') {
      // switch to mobile
      removeDesktopHandlers();
      addMobileObserver();
    } else {
      // switch to desktop
      removeMobileObserver();
      addDesktopHandlers();
    }
    mode = want;
  }

  // ----- Initialization -----
  // set initial active (existing .active or first)
  const pre = options.find(o => o.classList.contains('active'));
  setActive(pre || options[0]);

  // initial mode and attach appropriate handlers
  updateMode();

  // handle resize (debounced)
  let rTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(rTimer);
    rTimer = setTimeout(updateMode, 120);
  });

  // if user navigates between pages or dynamic content is inserted, you can call updateMode() again
})();
