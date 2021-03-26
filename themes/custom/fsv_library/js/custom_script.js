(function ($) {
  $(document).ready(function () {
    if ($("#ebscohostsearchtext").attr("placeholder") === "Hledat") {
      $("#ebscohostsearchtext").attr("placeholder", "Zadejte svůj dotaz");
      $("#ebscohostsearchtext").addClass("visible-placeholder");
    }
    if ($("#ebscohostsearchtext").attr("placeholder") === "Search") {
      $("#ebscohostsearchtext").attr("placeholder", "Search term");
      $("#ebscohostsearchtext").addClass("visible-placeholder");
    }
  });

  $(".tabframe input[type=radio][name=param_textSearchType_licence]").change(
    function () {
      if (this.value == "licence") {
        $(this)
          .closest("form")
          .attr("action", "http://sfx.is.cuni.cz/sfxlcl3/azbook/ukall");
      } else if (this.value == "free") {
        $(this)
          .closest("form")
          .attr("action", "http://sfx.is.cuni.cz/sfxlcl3/azbook/default");
      } else if (this.value == "licence_magazines") {
        $(this)
          .closest("form")
          .attr("action", "http://sfx.is.cuni.cz/sfxlcl3/journalsearch/ukall");
      } else if (this.value == "free_magazines") {
        $(this)
          .closest("form")
          .attr(
            "action",
            "http://sfx.is.cuni.cz/sfxlcl3/journalsearch/default"
          );
      }
    }
  );

  //pocet polozek v seznamu
  let countItem = 0;
  countItem = $("#oteviracidoba").children().length;
  let list = $("#oteviracidoba").children();
  //console.log(list);
  let days = [];
  let hours = [];
  for (let q = 0; q < countItem / 2; q++) {
    days.push(list[q]);
  }
  for (let q = countItem / 2; q < countItem; q++) {
    hours.push(list[q]);
  }

  //    console.log(days);
  //    console.log(hours);

  $("#oteviracidoba").empty();

  for (let q = 0; q < countItem / 2; q++) {
    $("#oteviracidoba").append(days[q]);
    $("#oteviracidoba").append(hours[q]);
  }

  $("#oteviracidoba").css(
    "grid-template-rows",
    "repeat(" + countItem / 2 + ", auto)"
  );
})(jQuery);
