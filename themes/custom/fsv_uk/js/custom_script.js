(function ($) {
  $(document).ready(function () {
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

    $(".btn--show-more").click(function () {
      showItems();
    });

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

    let addText = "<span>Zvýraznit</span>";

    // let buttonUploadImage = "<div class='upload-button'><span class='upload-button__text'>Nahrát soubor</span></div>";
    // $('#edit-field-logo-0--label').append(buttonUploadImage);
    $(".form-item-field-topovat-value").prepend(addText);
    $("#edit-title-0-value").attr("maxlength", "80");

    if ($(".layout-content--add-job-offer").length > 0) {
      console.log("Pridat nabidku");
      $(
        "#node-nabidka-prace-nova-form #edit-scheduler-settings #edit-unpublish-on-0-value"
      )
        .get(0)
        .nextSibling.remove();
      $("#node-nabidka-prace-nova-form #edit-scheduler-settings h4").text(
        "Nabídka bude skryta dne:"
      );
      let h4 = $("#node-nabidka-prace-nova-form #edit-scheduler-settings h4")[0]
        .outerHTML;
      let date = $(
        "#node-nabidka-prace-nova-form #edit-scheduler-settings #edit-unpublish-on-0-value"
      )[0].outerHTML;
      let summary = $(
        "#node-nabidka-prace-nova-form #edit-scheduler-settings summary"
      )[0].outerHTML;
      console.log(summary);
      $("#node-nabidka-prace-nova-form #edit-scheduler-settings").empty();
      $("#node-nabidka-prace-nova-form #edit-scheduler-settings").prepend(
        "<div class='wrapper wrapper--end-date-of-publish'></div>"
      );
      $("#node-nabidka-prace-nova-form #edit-scheduler-settings").prepend(
        summary
      );
      $(
        "#node-nabidka-prace-nova-form #edit-scheduler-settings .wrapper"
      ).after("<p></p>");
      $("#node-nabidka-prace-nova-form .wrapper--end-date-of-publish").append(
        h4
      );
      $("#node-nabidka-prace-nova-form .wrapper--end-date-of-publish").append(
        date
      );
    }
    // $(
    //   "#node-nabidka-prace-nova-form #edit-scheduler-settings #edit-unpublish-on-0-value"
    // ).after(
    //   "<p>Tady může být vhodný text pro skrývání inzerátu. Nebo taky ne.</p>"
    // );

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
  var count = $("table").length;

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
    //console.log(pos);
    //console.log(addressValue);
    $("html").scrollTop(pos.top);
    event.preventDefault();
  });

  let wrapper = "";
  $("#edit-field-topovat-value").click(function () {
    if ($(this).is(":checked")) {
      $("div[id^='ajax-wrapper']").show();
      $(".form-item-field-pocet-dnu-0-value").show();
      wrapper = $("div[id='ajax-wrapper']");
      // if( $("#edit-field-logo-0-upload").get(0).files.length === 0 ){
      //     console.log("no files selected");
      // }
    } else {
      //$("div[id^='ajax-wrapper']").remove();
      //console.log(wrapper);
      $("input[data-drupal-selector=edit-field-logo-0-fids").val("");
      //$("input[name='field_logo_0_remove_button']").click();
      // $('.form-item-field-topovat-value').after(wrapper);
      $("div[id^='ajax-wrapper']").hide();
      $(".form-item-field-pocet-dnu-0-value").hide();
      // $('#ajax-wrapper').hide();
    }
  });

  $(".form-item-field-pocet-dnu-0-value").append(
    '<span class="cena-label">Cena: </span><span id="cena-zvyrazneni">100 Kč</span>'
  );
  $("#edit-field-pocet-dnu-0-value").change(function () {
    let hodnota = $(this).val();
    //console.log(hodnota);
    $("#cena-zvyrazneni").text(hodnota * 100 + " Kč");
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
