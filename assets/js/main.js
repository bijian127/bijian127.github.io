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

    // 精选文章：只显示匹配当前分类的那一个
    var featuredPosts = document.querySelectorAll(".featured-post");
    var firstFp = null;
    featuredPosts.forEach(function (fp) {
      var fpCat = fp.getAttribute("data-cat");
      var show = fpCat === cat;
      if (show && !firstFp) firstFp = fp;
      fp.style.display = show ? "" : "none";
    });
    // 如果当前分类没有专属 featured-post，显示第一个（全部模式下）
    if (!firstFp && cat === "all" && featuredPosts.length > 0) {
      featuredPosts[0].style.display = "";
    }

    // 普通文章卡：匹配当前分类或全部
    var postCards = document.querySelectorAll(".post-card");
    postCards.forEach(function (post) {
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
