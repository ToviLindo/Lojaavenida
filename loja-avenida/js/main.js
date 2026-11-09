(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  document.documentElement.classList.add('js');

  /* Menu e cabeçalho */
  var header = $('.site-header'), btn = $('.menu-btn'), nav = $('#menu'), toTop = $('.to-top');
  function setMenu(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
  }
  btn.addEventListener('click', function () { setMenu(btn.getAttribute('aria-expanded') !== 'true'); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { setMenu(false); btn.focus(); }
  });
  window.addEventListener('resize', function () { if (window.innerWidth > 860) setMenu(false); });

  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
    var show = window.scrollY > 700;
    if (show) { toTop.hidden = false; requestAnimationFrame(function () { toTop.classList.add('is-on'); }); }
    else { toTop.classList.remove('is-on'); toTop.hidden = true; }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  var year = $('#ano'); if (year) year.textContent = new Date().getFullYear();

  /* Faixa em loop contínuo: repete o conteúdo até cobrir a tela e duplica o grupo */
  var track = $('.ribbon-track');
  if (track) {
    var base = track.firstElementChild, src = base.innerHTML, ribbonW = 0, rt;
    var buildRibbon = function () {
      while (track.children.length > 1) track.removeChild(track.lastChild);
      base.innerHTML = src;
      for (var n = 0; n < 12 && base.offsetWidth < window.innerWidth; n++) base.insertAdjacentHTML('beforeend', src);
      track.appendChild(base.cloneNode(true));
      track.style.animationDuration = Math.round(base.offsetWidth / 50) + 's'; /* ~50 px por segundo */
    };
    buildRibbon();
    window.addEventListener('resize', function () {
      if (window.innerWidth === ribbonW) return;
      ribbonW = window.innerWidth; clearTimeout(rt); rt = setTimeout(buildRibbon, 200);
    });
    ribbonW = window.innerWidth;
  }

  /* Revelação ao rolar e destaque do menu */
  var reveals = $$('.reveal'), links = $$('.nav a[href^="#"]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (list) {
      list.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { io.observe(el); });
    var spy = new IntersectionObserver(function (list) {
      list.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.dataset.spy || en.target.id;
        links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(function (s) { spy.observe(s); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* FAQ: mantém uma pergunta aberta por vez */
  var items = $$('.faq-list details');
  items.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) items.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* Lightbox da galeria */
  var box = $('#lightbox');
  if (!box || typeof box.showModal !== 'function') return;
  var thumbs = $$('.g-item'), img = $('img', box), cap = $('figcaption', box), cur = 0, opener = null, x0 = null;
  function show(i) {
    cur = (i + thumbs.length) % thumbs.length;
    var t = thumbs[cur];
    img.src = t.dataset.full;
    img.alt = $('img', t).alt;
    cap.textContent = (t.dataset.cap || '') + ' (' + (cur + 1) + '/' + thumbs.length + ')';
  }
  thumbs.forEach(function (t, i) {
    t.addEventListener('click', function () { opener = t; show(i); box.showModal(); });
  });
  $('.lb-close', box).addEventListener('click', function () { box.close(); });
  $('.lb-prev', box).addEventListener('click', function () { show(cur - 1); });
  $('.lb-next', box).addEventListener('click', function () { show(cur + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
  box.addEventListener('close', function () { if (opener) opener.focus(); });
  box.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
  box.addEventListener('touchstart', function (e) { x0 = e.changedTouches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
  });
})();
