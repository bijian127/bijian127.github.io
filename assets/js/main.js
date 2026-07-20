/* 不庸AI — 交互脚本 */
(function () {
  "use strict";

  // 当前页导航高亮
  var page = document.body.getAttribute("data-page");
  if (page) {
    var links = document.querySelectorAll(".nav-links a[data-nav]");
    links.forEach(function (a) {
      if (a.getAttribute("data-nav") === page) a.classList.add("active");
    });
  }

  // 移动端菜单
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") navLinks.classList.remove("open");
    });
  }

  // 博客筛选
  var filters = document.querySelectorAll(".filter-pill");
  var posts = document.querySelectorAll(".post-card, .featured-post");

  function activateFilter(cat) {
    if (!filters.length) return;
    filters.forEach(function (p) { p.classList.remove("active"); });
    var target = document.querySelector('.filter-pill[data-cat="' + cat + '"]');
    if (target) {
      target.classList.add("active");
    } else {
      // fallback to "all"
      var allPill = document.querySelector('.filter-pill[data-cat="all"]');
      if (allPill) allPill.classList.add("active");
      cat = "all";
    }
    posts.forEach(function (post) {
      var postCat = post.getAttribute("data-cat");
      var show = cat === "all" || !postCat || postCat === cat;
      post.style.display = show ? "" : "none";
    });
  }

  if (filters.length) {
    filters.forEach(function (pill) {
      pill.addEventListener("click", function () {
        activateFilter(pill.getAttribute("data-cat"));
      });
    });

    // 读取 URL ?cat= 参数
    var params = new URLSearchParams(window.location.search);
    var urlCat = params.get("cat");
    if (urlCat) {
      activateFilter(decodeURIComponent(urlCat));
    }
  }

  // 标签云点击 → 高亮（演示用）
  var tags = document.querySelectorAll(".tag");
  if (tags.length) {
    tags.forEach(function (t) {
      t.addEventListener("click", function () {
        tags.forEach(function (x) { x.style.borderColor = ""; x.style.color = ""; });
        t.style.borderColor = "var(--violet-1)";
        t.style.color = "var(--kicker)";
      });
    });
  }
})();
