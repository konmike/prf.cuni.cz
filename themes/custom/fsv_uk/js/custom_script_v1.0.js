(function ($) {
  $(document).ready(function () {
    $(".no-dropdown").removeClass("dropdown");
    let megaMenu = $(".no-dropdown").siblings(".nav__megamenu");
    megaMenu.remove();

    const btnCookieChange = document.getElementById("cookie-change");

    if (btnCookieChange) {
      btnCookieChange.addEventListener("click", () => {
        document.cookie = "cookieConsentStatus=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "cookieConsentStatus-categories=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "cookieConsentStatus-version=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        location.reload();
      });
    }

    $(".no-dropdown").click(function (e) {
      // let href = $(this);
      let href = $(this).attr("href");
      // console.log(href);
      window.location.href = href;
      e.stopPropagation();
    });

    if ($(".layout-content--viewnabidka-pracipage-1").length > 0) {
      let rows = document.querySelectorAll(".views-col .views-row");
      let countItems = document.createElement("span");
      countItems.classList.add("counter");
      countItems.innerHTML = "Nalezených nabídek: " + rows.length;

      if (rows.length) {
        document.querySelector(".views-exposed-form").after(countItems);
        addButton("button");
        showItems();
      }
    }

    $(".osoby--carousel .osoby__list").slick();

    if (
      $(".layout-content--basic-page").length &&
      $(".layout-aside .side-nav__list li").length === 0
    ) {
      $(".layout-aside").css("display", "none");
      $(".main-content").css({ float: "none", "margin-inline": "auto" });
    }

    $(".btn--show-more").click(function () {
      showItems();
    });

    if ($(".section-menu").length) {
      let menus = $(".section-menu");
      menus.each(function () {
        // console.log(index);
        let title_id = $(this)
          .closest("[class^='js-view']")
          .next(".section-title")
          .attr("id");
        $("#" + title_id).addClass(title_id);

        $(this)
          .find("[href*='" + title_id + "']")
          .addClass("active");
      });
      // let title_id = $(".section-menu")
      //   .closest("[class^='js-view']")
      //   .next(".section-title")
      //   .attr("id");

      // $("#" + title_id).addClass("succes");
    }

    //Pokud je youtube iframe prekryt obrazkem, pak skryj obrazek
    //a zacni prehravat video
    $(".youtube--with-cover .image").click(function (e) {
      e.preventDefault();
      $(this).hide();
      let wrapperAndIframe = $(this).siblings(".iframe");
      let src = wrapperAndIframe.attr("src");
      src += "?autoplay=1";
      // console.log(src);
      wrapperAndIframe.attr("src", src).show();

      $(this).parent().css("padding-bottom", "56.25%");
    });

    /*
     * Prida tridu pro aktivni odkazy v menu,
     * nejprve se podiva na nejniz zanorene
     * a prida tridu vyssimu linku v menu,
     * az to probubla uplne nahoru
     */
    if ($(".side-nav__link--active").length > 0) {
      let lactive = $(".side-nav__link--active");
      let link = lactive.closest(".side-nav__link--active").attr("href");
      $(".header__nav").find(`[href="${link}"]`).addClass("is-active");
    }
    if ($(".nav__link-lvl2.is-active").length > 0) {
      let it = $(".nav__link-lvl2.is-active");
      it.closest(".nav__item").addClass("is-active");
    }
    if ($(".nav__link.is-active").length > 0) {
      let it = $(".nav__link.is-active");
      it.closest(".nav__item").addClass("is-active");
    }
    /* ******** */

    $('a[href$="#"]').click(function (e) {
      e.preventDefault();
    });
  });

  $('.nav__megamenu__featured__item a[href*="/node"]').each(function () {
    $(this).parent().hide();
  });

  if ($("#fullmenu").length) {
    $(".layout-aside").addClass("fullwidth");
    $("h1").hide();
    $("#jq_side-nav-toggle")
      .addClass("side-nav__mobile-toggle working")
      .css("display", "block");
    $("#block-mainnavigation-2").css("display", "block");
    $(".side-nav__item").css("display", "none");
    $(".side-nav__item--active").css("display", "block");
  }

  // $('.nav__item > a[href*="/node"]').each(function() {
  //        $(this).parent().hide();
  //        $(this).parent().prev('.nav__separator').hide();
  //    });

  $(".input.form-radio").on("click", function () {
    $(this).parent().toggleClass("checked");
  });

  $("#jq_side-nav-toggle").click(function () {
    $("#jq_side-nav-toggle").addClass("working");
  });

  // var is_opera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  //    var is_Edge = navigator.userAgent.indexOf("Edge") > -1;
  //    var is_chrome = !!window.chrome && !is_opera && !is_Edge;
  //    var is_explorer= typeof document !== 'undefined' && !!document.documentMode && !is_Edge;
  //    var is_firefox = typeof window.InstallTrigger !== 'undefined';
  //    var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  //    if (is_safari) alert('Safari');

  // $("div#edit-abc .form-item label").on('click', function(){
  //      $(this).toggleClass("exposed-checked");
  // });

  var selected = $("div#edit-abc .form-item input:checked");
  $(selected).next("label").addClass("exposed-checked");

  var selectedli = $(
    "#views-exposed-form-news-page-block-homepage-news-feed input:checked"
  );
  $(selectedli).parent().addClass("checked-white");

  var selectedlicourses = $(
    ".form-item-field-taxonomy-general-tags-target-id input:checked"
  );
  $(selectedlicourses).parent().addClass("checked-white");

  $(document).ajaxComplete(function () {
    var selectedli = $(
      "#views-exposed-form-news-page-block-homepage-news-feed input:checked"
    );
    $(selectedli).parent().addClass("checked-white");
    var selectedlicourses = $(
      ".form-item-field-taxonomy-general-tags-target-id input:checked"
    );
    $(selectedlicourses).parent().addClass("checked-white");
  });

  $("#edit-cat-102").addClass("makrela");

  //zajisti, spravne html rozlozeni tabulky
  const elAside = document.querySelector('aside[data-url^="/en"]');
  if (elAside !== null) {
    const maskStyle = 'linear-gradient(to left, transparent, black 20%, black 100%)';
    const tables = document.querySelectorAll('table');

    tables.forEach((table) => {
      const tableCells = table.querySelectorAll('td');
      tableCells.forEach((cell) => {
        cell.style.display = 'table-cell';
        cell.style.textWrap = 'pretty';
      });

      const wrapper = document.createElement('div');
      wrapper.style.overflowX = 'auto';
      table.style.width = '100%';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);

      const checkScrollable = () => {
        if (wrapper.scrollWidth > wrapper.clientWidth) {
          wrapper.style.maskImage = maskStyle;
          wrapper.style.webkitMaskImage = maskStyle;
        } else {
          wrapper.style.maskImage = 'none';
          wrapper.style.webkitMaskImage = 'none';
        }
      };

      checkScrollable();
      window.addEventListener('resize', checkScrollable);
    });
  } else {
    var count = $("table:not(.no-head)").length;

    for (q = 0; q < count; q++) {
      if ($("table:eq(" + q + ") thead").length > 0) {
        var firstR = $("table:eq(" + q + ") thead tr:first-child");
        var others = $("table:eq(" + q + ") thead tr").not(":first");
        $("table:eq(" + q + ") thead tr").remove();
        $("table:eq(" + q + ")").append("<tbody>");
      } else {
        var firstR = $("table:eq(" + q + ") tbody tr:first-child");
        var others = $("table:eq(" + q + ") tbody tr").not(":first");

        $("table:eq(" + q + ") tbody tr").remove();
        $("table:eq(" + q + ") tbody").before("<thead>");
      }

      $("table:eq(" + q + ") thead").append(firstR);

      var d_l1 = $("table:eq(" + q + ") thead tr th:eq(0)").html();
      var d_l2 = $("table:eq(" + q + ") thead tr th:eq(1)").html();
      var d_l3 = $("table:eq(" + q + ") thead tr th:eq(2)").html();
      var d_l4 = $("table:eq(" + q + ") thead tr th:eq(3)").html();

      $("table:eq(" + q + ") tbody").append(others);

      for (let index = 0; index < others.length; index++) {
        $("table:eq(" + q + ") tbody tr:eq(" + index + ") td:eq(0)").attr(
          "data-label",
          d_l1
        );
        $("table:eq(" + q + ") tbody tr:eq(" + index + ") td:eq(1)").attr(
          "data-label",
          d_l2
        );
        $("table:eq(" + q + ") tbody tr:eq(" + index + ") td:eq(2)").attr(
          "data-label",
          d_l3
        );
        $("table:eq(" + q + ") tbody tr:eq(" + index + ") td:eq(3)").attr(
          "data-label",
          d_l4
        );
      }
    }
  }


  //Odstrani prazdne bunky z tabulky v mobilnim rezimu
  //Prida tridu, ktera zajisti odstraneni prazdnych bunek
  $("tbody tr td").each(function () {
    if ($(this).text() == "\xa0" || $(this).text() == "") {
      $(this).addClass("mobile-hide");
    }
  });

  $('a[href^="#"').click(function (event) {
    var addressValue = $(this).attr("href");
    var pos = $(addressValue).position();
    $("html").scrollTop(pos.top);
    event.preventDefault();
  });

  document.querySelectorAll(".osoby__show-detail").forEach(function (detail) {
    detail.addEventListener("click", () => {
      const dialog = detail.parentNode.nextElementSibling;
      dialog.showModal();
    });
  });

  document.querySelectorAll(".close-dialog").forEach(function (btn) {
    btn.addEventListener("click", () => {
      const dialog = btn.parentNode;
      dialog.close();
    });
  });

  document.querySelectorAll(".akordeon__header").forEach(function (akordeon) {
    akordeon.addEventListener("click", () => {
      openAkordeonTab(akordeon);
    });
  });
})(jQuery);

function showItems() {
  let items = document.querySelectorAll(".views-col .views-row");
  let count = 0;
  let last = items[items.length - 1];

  items.forEach(function (r) {
    if (r.style.display === "" && count < 8) {
      // console.log(r + " " + i);
      r.style.display = "flex";
      count++;
    }
    // console.log(r.style.display);
  });

  // console.log("Last: " + last);
  if (last.style.display === "flex") {
    removeButton();
    if (!isFilterRunning()) addButton("a");
  }
}

function addButton(type) {
  let newNode = document.createElement(type);
  if (type === "a") {
    newNode.href = "/jobs-old-2020";
    newNode.innerHTML = "Přejít na starší nabídky";
  } else {
    newNode.innerHTML = "Načíst další";
  }
  newNode.classList.add("btn", "btn--show-more");

  document.querySelector(".views-col").append(newNode);
}

function removeButton() {
  let btn = document.querySelector(".btn--show-more");
  btn.parentNode.removeChild(btn);
}

function isFilterRunning() {
  if (
    document.getElementById("edit-field-koho-hledame-list-value").value ===
    "All" &&
    document.getElementById("edit-field-kraj-value").value === "All" &&
    document.getElementById("edit-field-uvazek-list-value").value === "All"
  ) {
    return false;
  }

  return true;
}

function openAkordeonTab(tab) {
  tab.classList.toggle("akordeon__header--active");
  let content = tab.nextElementSibling;
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + 32 + "px";
  }
}
