(function ($) {
  $(document).ready(function () {
    $(".form-select").select2({
      placeholder: "Klikněte pro výběr",
      width: "style",
    });

    if ($(".uni:target").length) {
      let content = $(".uni:target .uni__content");
      let button = $(".uni:target .show-more");
      button.toggleClass("show");
      content.toggleClass("full-height");
    }

    $("#btn-map-filter").click(function () {
      // console.log("test");
      // field.css("display", displayType).hide().fadeIn();
      $(".paragraph--partnerske-univerzity-teaser .views-exposed-form")
        .css("display", "flex")
        .hide()
        .fadeIn();
    });

    $(".show-more").click(function () {
      let content = $(this).parent().next();
      $(this).toggleClass("show");
      content.toggleClass("full-height");
    });

    $("#select-map li").each(function (index, item) {
      let id = $(item).attr("id");
      $("#" + id).click(function () {
        changeMap(id);
      });
    });
  });

  // Select the target node.
  var target = document.querySelector(
    ".paragraph--partnerske-univerzity-teaser"
  );

  // Create an observer instance.
  var observer = new MutationObserver(function (mutations) {
    // console.log(mutations);
    // console.log("Zmena");
    $(".form-select").select2({
      placeholder: "Klikněte pro výběr",
      width: "style",
    });

    $(".show-more").click(function () {
      let content = $(this).parent().next();
      //   console.log(content);
      $(this).toggleClass("show");
      content.toggleClass("full-height");
      //   content.fadeT("hide", "1000");
      //   content.slideToggle("slow");
    });
  });

  // Pass in the target node, as well as the observer options.
  observer.observe(target, {
    attributes: true,
    childList: true,
    characterData: true,
  });

  function changeMap(id) {
    let active = $("#select-map").attr("data-active");
    let show = $("#" + id).attr("data-show-map");

    if (active !== show) {
      $("." + active).css("display", "none");
      $("." + show).css("display", "block");

      $("#select-map").attr("data-active", show);
    }
  }
})(jQuery);
