// ===== 移动端菜单 =====
(function () {
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // ===== 搜索过滤 =====
  var input = document.getElementById('search');
  var catGrid = document.getElementById('catGrid');
  var guideGrid = document.getElementById('guideGrid');
  var catEmpty = document.getElementById('catEmpty');
  var guideEmpty = document.getElementById('guideEmpty');

  function filterGroup(grid, empty, q) {
    if (!grid) return;
    var items = grid.querySelectorAll('[data-keywords]');
    var shown = 0;
    items.forEach(function (el) {
      var hay = (el.textContent + ' ' + (el.getAttribute('data-keywords') || '')).toLowerCase();
      var match = !q || hay.indexOf(q) !== -1;
      el.style.display = match ? '' : 'none';
      if (match) shown++;
    });
    if (empty) empty.classList.toggle('show', q !== '' && shown === 0);
  }

  function apply(q) {
    filterGroup(catGrid, catEmpty, q);
    filterGroup(guideGrid, guideEmpty, q);
  }

  if (input) {
    input.addEventListener('input', function () {
      apply(input.value.trim().toLowerCase());
    });
    // 支持从详情页带 ?q= 跳转回来
    var params = new URLSearchParams(location.search);
    var q = params.get('q');
    if (q) {
      input.value = q;
      apply(q.trim().toLowerCase());
      var cat = document.getElementById('categories');
      if (cat) cat.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // ===== 首页 Hero 收集进度（读取本地勾选） =====
  var hp = document.getElementById('heroProgress');
  if (hp) {
    var lang = document.body.getAttribute('data-lang') || 'zh';
    var parts = [];
    try {
      var sp = JSON.parse(localStorage.getItem('totk_shrines_progress') || '{}');
      var sc = 0; for (var k in sp) if (sp[k]) sc++;
      if (sc > 0) parts.push(lang === 'en' ? 'Lit <b>' + sc + '/152</b> shrines' : '已点亮 <b>' + sc + '/152</b> 座神庙');
      var kp = parseInt(localStorage.getItem('totk_koroks_progress') || '0', 10);
      if (kp > 0) parts.push(lang === 'en' ? 'Collected <b>' + kp + '/900</b> Korok seeds' : '已收集 <b>' + kp + '/900</b> 个呀哈哈');
    } catch (e) {}
    if (parts.length) {
      hp.innerHTML = (lang === 'en' ? 'Progress · ' : '收集进度 · ') + parts.join(' · ') + ' — <a href="shrines.html">'
        + (lang === 'en' ? 'Continue &rarr;' : '继续 &rarr;') + '</a>';
    } else {
      hp.innerHTML = lang === 'en'
        ? 'Covering <b>152</b> shrines · <b>900</b> Korok seeds, with progress saved locally.'
        : '收录 <b>152</b> 座神庙 · <b>900</b> 个呀哈哈，进度自动保存在本机。';
    }
  }
})();
