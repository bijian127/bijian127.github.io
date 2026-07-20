/* 云笺 · Aurora — 交互脚本 */
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
  if (filters.length) {
    filters.forEach(function (pill) {
      pill.addEventListener("click", function () {
        filters.forEach(function (p) { p.classList.remove("active"); });
        pill.classList.add("active");
        var cat = pill.getAttribute("data-cat");
        posts.forEach(function (post) {
          var postCat = post.getAttribute("data-cat");
          var show = cat === "all" || !postCat || postCat === cat;
          post.style.display = show ? "" : "none";
        });
      });
    });
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
