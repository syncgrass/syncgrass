(function () {
  'use strict';

  var body = document.body;
  var header = document.querySelector('.sg-header');
  var nav = document.querySelector('.sg-nav__links');
  var navToggle = document.querySelector('.sg-nav-toggle');
  var menuTriggers = document.querySelectorAll('.sg-menu__trigger');
  var search = document.querySelector('.sg-search');
  var searchInput = document.querySelector('#site-search');
  var searchResults = document.querySelector('.sg-search__results');

  function setHeaderState() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 18);
  }
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
  }

  menuTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (event) {
      if (window.innerWidth <= 1100) {
        event.preventDefault();
        var menu = trigger.closest('.sg-menu');
        var open = menu.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded', String(open));
      }
    });
  });

  document.addEventListener('click', function (event) {
    if (nav && nav.classList.contains('is-open') && !event.target.closest('.sg-nav')) {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  var searchIndex = [
    { title: 'GeoBunkerTrace Enterprise', meta: 'Critical infrastructure intelligence', href: '/geobunkertrace.html', terms: 'pipeline illegal bunkering incident drone satellite ai iot oil gas' },
    { title: 'GeoLandTrace', meta: 'Land administration and cadastre', href: '/geolandtrace.html', terms: 'property registry survey gis land cadastre title' },
    { title: 'HotelSync', meta: 'Hospitality operations platform', href: '/hotelsync.html', terms: 'hotel reservation finance housekeeping pos crm' },
    { title: 'StateHIS', meta: 'State health information platform', href: '/statehis.html', terms: 'hospital phc patient pharmacy health analytics gis' },
    { title: 'GIS Consulting', meta: 'Spatial strategy and implementation', href: '/gis-consulting.html', terms: 'gis consulting spatial strategy' },
    { title: 'Software Development', meta: 'Enterprise platforms and integration', href: '/software-development.html', terms: 'software development api cloud enterprise' },
    { title: 'Land Administration', meta: 'Cadastre, registry and surveying', href: '/land-administration.html', terms: 'land administration cadastre survey registry' },
    { title: 'Contact SyncGrass', meta: 'Book an executive technology briefing', href: '/#contact', terms: 'contact demo sales meeting' }
  ];

  function renderSearch(query) {
    if (!searchResults) return;
    var cleaned = query.trim().toLowerCase();
    var items = cleaned ? searchIndex.filter(function (item) {
      return (item.title + ' ' + item.meta + ' ' + item.terms).toLowerCase().indexOf(cleaned) !== -1;
    }).slice(0, 6) : searchIndex.slice(0, 4);

    searchResults.innerHTML = '';
    if (!items.length) {
      var empty = document.createElement('p');
      empty.className = 'sg-search__empty';
      empty.textContent = 'No exact result. Try “pipeline”, “land”, “hotel”, or “health”.';
      searchResults.appendChild(empty);
      return;
    }
    items.forEach(function (item) {
      var link = document.createElement('a');
      link.className = 'sg-search__result';
      link.href = item.href;
      var text = document.createElement('span');
      var title = document.createElement('strong');
      var meta = document.createElement('small');
      title.textContent = item.title;
      meta.textContent = item.meta;
      text.appendChild(title);
      text.appendChild(meta);
      var arrow = document.createElement('span');
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '→';
      link.appendChild(text);
      link.appendChild(arrow);
      searchResults.appendChild(link);
    });
  }

  function openSearch() {
    if (!search) return;
    search.classList.add('is-open');
    search.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';
    renderSearch('');
    window.setTimeout(function () { if (searchInput) searchInput.focus(); }, 50);
  }
  function closeSearch() {
    if (!search) return;
    search.classList.remove('is-open');
    search.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';
  }

  document.querySelectorAll('[data-search-open]').forEach(function (button) { button.addEventListener('click', openSearch); });
  document.querySelectorAll('[data-search-close]').forEach(function (button) { button.addEventListener('click', closeSearch); });
  if (searchInput) searchInput.addEventListener('input', function () { renderSearch(searchInput.value); });
  if (search) search.addEventListener('click', function (event) { if (event.target === search) closeSearch(); });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeSearch();
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openSearch();
    }
  });

  document.querySelectorAll('.faq-question').forEach(function (button) {
    button.addEventListener('click', function () {
      var item = button.closest('.faq-item');
      var open = item.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(open));
    });
  });

  document.querySelectorAll('.sg-screen').forEach(function (screen) {
    screen.setAttribute('tabindex', '0');
    screen.setAttribute('role', 'button');
    screen.setAttribute('aria-label', 'Expand product interface preview');
    function openPreview() {
      var overlay = document.createElement('div');
      overlay.className = 'sg-lightbox is-open';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-label', 'Expanded product interface preview');
      var dialog = document.createElement('div');
      dialog.className = 'sg-lightbox__dialog';
      var clone = screen.cloneNode(true);
      clone.removeAttribute('tabindex');
      clone.removeAttribute('role');
      clone.removeAttribute('aria-label');
      var close = document.createElement('button');
      close.className = 'sg-lightbox__close';
      close.type = 'button';
      close.setAttribute('aria-label', 'Close expanded preview');
      close.textContent = '×';
      dialog.appendChild(close);
      dialog.appendChild(clone);
      overlay.appendChild(dialog);
      document.body.appendChild(overlay);
      body.style.overflow = 'hidden';
      close.focus();
      function dismiss() { overlay.remove(); body.style.overflow = ''; }
      close.addEventListener('click', dismiss);
      overlay.addEventListener('click', function (event) { if (event.target === overlay) dismiss(); });
      overlay.addEventListener('keydown', function (event) { if (event.key === 'Escape') dismiss(); });
    }
    screen.addEventListener('click', openPreview);
    screen.addEventListener('keydown', function (event) { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openPreview(); } });
  });

  var revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }

  document.querySelectorAll('[data-year]').forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });
})();
