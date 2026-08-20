/* Unified header/footer + comments + video injection. Bilingual (zh/en) via body[data-lang]. Offline, no deps. */
(function () {
  var LANG = (document.body && document.body.getAttribute('data-lang')) || 'zh';
  var year = new Date().getFullYear();
  var brandSVG = '<svg class="brand-mark" viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><path d="M16 3 L9.5 15 L22.5 15 Z" fill="currentColor"/><path d="M2 28 L9.5 15 L16 28 Z" fill="currentColor"/><path d="M16 28 L22.5 15 L30 28 Z" fill="currentColor"/></svg>';

  var I18N = {
    zh: {
      brand: '王国之泪 · 攻略站',
      nav: [['index.html#categories', '攻略库'], ['index.html#featured', '精选'], ['map.html', '地图'], ['beginner.html', '新手']],
      searchPH: '搜索攻略…',
      footerNote: '本站为《塞尔达传说：王国之泪》粉丝向非官方攻略站，与任天堂官方无关。内容持续完善中。',
      footerCopy: '© ' + year + ' 海拉鲁攻略志 · 用爱与肝共建',
      other: { label: 'EN', href: 'en/index.html' },
      cmTitle: '评论区', cmSub: '留言保存在你的浏览器本地，不会上传或共享。',
      cmNamePH: '昵称（可选）', cmTextPH: '分享你的心得、疑问或补充分享…', cmSubmit: '发表评论',
      cmEmpty: '还没有评论，来抢沙发～', cmDel: '删除',
      vidTitle: '视频攻略', vidSub: '粘贴 B 站或 YouTube 视频链接，可嵌入播放（链接仅保存在本地）。',
      vidPH: 'https://www.bilibili.com/video/BV… 或 YouTube 链接', vidAdd: '嵌入视频',
      vidEmpty: '暂无嵌入视频。', vidCap: '视频链接', vidRm: '移除',
      vidAlert: '暂仅支持 B 站（bilibili.com/video/BV…）或 YouTube 链接。'
    },
    en: {
      brand: 'Tears of the Kingdom · Guide',
      nav: [['index.html#categories', 'Guides'], ['index.html#featured', 'Featured'], ['map.html', 'Map'], ['beginner.html', 'Beginner']],
      searchPH: 'Search guides…',
      footerNote: 'An unofficial fan-made guide for The Legend of Zelda: Tears of the Kingdom. Not affiliated with Nintendo. Content is a work in progress.',
      footerCopy: '© ' + year + ' Hyrule Codex · Built with love & grind',
      other: { label: '中文', href: '../index.html' },
      cmTitle: 'Comments', cmSub: 'Comments are saved in your browser locally and are never uploaded or shared.',
      cmNamePH: 'Nickname (optional)', cmTextPH: 'Share your tips, questions, or extra findings…', cmSubmit: 'Post comment',
      cmEmpty: 'No comments yet — be the first!', cmDel: 'Delete',
      vidTitle: 'Video Guides', vidSub: 'Paste a Bilibili or YouTube link to embed it (link is stored locally only).',
      vidPH: 'https://www.bilibili.com/video/BV… or YouTube link', vidAdd: 'Embed video',
      vidEmpty: 'No embedded video yet.', vidCap: 'video link', vidRm: 'Remove',
      vidAlert: 'Only Bilibili (bilibili.com/video/BV…) or YouTube links are supported for now.'
    }
  };
  var T = I18N[LANG] || I18N.zh;

  var headerEl = document.getElementById('site-header');
  if (headerEl) {
    var navLinks = T.nav.map(function (n) { return '<a href="' + n[0] + '">' + n[1] + '</a>'; }).join('');
    headerEl.innerHTML =
      '<header class="nav"><div class="nav-inner">' +
        '<a class="brand" href="index.html">' + brandSVG + '<span>' + T.brand + '</span></a>' +
        '<nav class="nav-links" id="navLinks">' + navLinks +
          '<a class="lang-switch" href="' + T.other.href + '">' + T.other.label + '</a>' +
        '</nav>' +
        '<form class="nav-search" id="navSearch" role="search" onsubmit="return false">' +
          '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M21 21l-4.3-4.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
          '<input id="navSearchInput" type="search" placeholder="' + T.searchPH + '" aria-label="' + T.searchPH + '">' +
        '</form>' +
        '<button class="nav-toggle" id="navToggle" aria-label="打开菜单" aria-expanded="false"><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>' +
      '</div></header>';

    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
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

    var navInput = document.getElementById('navSearchInput');
    function goSearch() {
      var q = navInput.value.trim();
      if (q) location.href = 'index.html?q=' + encodeURIComponent(q);
    }
    navInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') goSearch(); });
  }

  var footerEl = document.getElementById('site-footer');
  if (footerEl) {
    footerEl.innerHTML =
      '<div class="footer-inner">' +
        '<div class="footer-brand">' + brandSVG + '<span>' + T.brand + '</span></div>' +
        '<p class="footer-note">' + T.footerNote + '</p>' +
        '<p class="footer-copy">' + T.footerCopy + '</p>' +
        '<p class="footer-lang"><a href="' + T.other.href + '">' + T.other.label + '</a></p>' +
      '</div>';
  }

  /* ---------- Comments (local, isolated per page + language) ---------- */
  function initComments() {
    var root = document.getElementById('comments-root');
    if (!root) return;
    var page = root.dataset.page || location.pathname.split('/').pop();
    var key = 'totk_comments_' + LANG + '_' + page;
    function load() { try { return JSON.parse(localStorage.getItem(key) || '[]') || []; } catch (e) { return []; } }
    function save(arr) { try { localStorage.setItem(key, JSON.stringify(arr)); } catch (e) {} }

    root.innerHTML =
      '<h2>' + T.cmTitle + '</h2><p class="sub">' + T.cmSub + '</p>' +
      '<form class="comment-form" id="cmForm">' +
        '<div class="row"><input id="cmName" type="text" placeholder="' + T.cmNamePH + '" maxlength="20"></div>' +
        '<textarea id="cmText" rows="3" placeholder="' + T.cmTextPH + '" maxlength="600"></textarea>' +
        '<button type="submit">' + T.cmSubmit + '</button>' +
      '</form>' +
      '<div class="comment-list" id="cmList"></div>';

    var form = root.querySelector('#cmForm');
    var nameEl = root.querySelector('#cmName');
    var textEl = root.querySelector('#cmText');
    var listEl = root.querySelector('#cmList');

    function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function fmt(ts) {
      var d = new Date(ts);
      if (isNaN(d)) return '';
      var p = function (n) { return (n < 10 ? '0' : '') + n; };
      return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
    }
    function render() {
      var arr = load();
      if (!arr.length) { listEl.innerHTML = '<p class="comment-empty">' + T.cmEmpty + '</p>'; return; }
      listEl.innerHTML = arr.map(function (c, i) {
        return '<div class="comment-item"><div class="cmeta"><span class="cname">' + esc(c.name || (LANG === 'en' ? 'Anonymous Player' : '匿名玩家')) +
          '</span><button class="cdel" data-i="' + i + '">' + T.cmDel + '</button></div><div class="ctext">' + esc(c.text) +
          '</div><div class="cmeta"><span>' + fmt(c.ts) + '</span></div></div>';
      }).join('');
      listEl.querySelectorAll('.cdel').forEach(function (b) {
        b.addEventListener('click', function () {
          var arr2 = load(); arr2.splice(+b.dataset.i, 1); save(arr2); render();
        });
      });
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var t = textEl.value.trim();
      if (!t) { textEl.focus(); return; }
      var arr = load();
      arr.unshift({ name: nameEl.value.trim(), text: t, ts: Date.now() });
      save(arr); textEl.value = ''; render();
    });
    render();
  }

  /* ---------- Video embed (Bilibili / YouTube, local) ---------- */
  function initVideo() {
    var root = document.getElementById('video-root');
    if (!root) return;
    var page = root.dataset.page || location.pathname.split('/').pop();
    var key = 'totk_video_' + LANG + '_' + page;
    function load() { try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { return null; } }
    function save(v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) {} }

    root.innerHTML =
      '<h2>' + T.vidTitle + '</h2><p class="sub">' + T.vidSub + '</p>' +
      '<div class="video-box"><div class="video-add">' +
        '<input id="vidUrl" type="text" placeholder="' + T.vidPH + '">' +
        '<button id="vidAdd" type="button">' + T.vidAdd + '</button>' +
      '</div><div id="vidMount"></div></div>';

    var urlEl = root.querySelector('#vidUrl');
    var addBtn = root.querySelector('#vidAdd');
    var mount = root.querySelector('#vidMount');

    function parse(src) {
      if (!src) return null;
      src = src.trim();
      var m;
      if ((m = src.match(/bilibili\.com\/video\/(BV[\w]+)/i))) {
        return { url: 'https://player.bilibili.com/player.html?bvid=' + m[1] + '&page=1&high_quality=1&danmaku=0', cap: 'B 站视频 · ' + m[1] };
      }
      if ((m = src.match(/youtu\.be\/([\w-]+)/i)) || (m = src.match(/youtube\.com\/watch\?v=([\w-]+)/i)) || (m = src.match(/youtube\.com\/embed\/([\w-]+)/i))) {
        return { url: 'https://www.youtube.com/embed/' + m[1], cap: 'YouTube · ' + m[1] };
      }
      if (/player\.bilibili\.com|youtube\.com\/embed/.test(src)) return { url: src, cap: T.vidCap };
      return null;
    }
    function render() {
      var v = load();
      if (!v) { mount.innerHTML = '<p class="comment-empty">' + T.vidEmpty + '</p>'; return; }
      mount.innerHTML = '<div class="video-frame"><iframe src="' + v.url + '" allowfullscreen allow="autoplay; encrypted-media"></iframe></div>' +
        '<p class="video-cap">' + v.cap + ' · <a href="#" id="vidRm">' + T.vidRm + '</a></p>';
      var rm = mount.querySelector('#vidRm');
      if (rm) rm.addEventListener('click', function (e) { e.preventDefault(); save(null); render(); });
    }
    addBtn.addEventListener('click', function () {
      var p = parse(urlEl.value);
      if (!p) { alert(T.vidAlert); return; }
      save(p); urlEl.value = ''; render();
    });
    render();
  }

  initComments();
  initVideo();
})();
