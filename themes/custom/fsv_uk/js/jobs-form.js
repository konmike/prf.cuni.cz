(function ($) {
  $(document).ready(function () {
    let addText = "<span>Mám zájem o službu TOPJob</span>";

    $(".form-item-field-topovat-value").prepend(addText);
    $("#edit-title-0-value").attr("maxlength", "80");

    if ($(".layout-content--add-job-offer").length > 0) {
      //   console.log("Pridat nabidku");
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
      //   console.log(summary);
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

    $("#edit-field-topovat-value").click(function () {
      let fieldToggle = [
        "div[id^='ajax-wrapper']",
        ".form-item-field-spolecnost-0-value",
        ".form-item-field-name-0-value",
        ".form-item-field-surname-0-value",
        ".form-item-field-ico-0-value",
        ".form-item-field-dic-0-value",
      ];

      let fieldRequired = [
        "#edit-field-name-0-value",
        "#edit-field-surname-0-value",
        "#edit-field-ico-0-value",
      ];

      if ($(this).is(":checked")) {
        let spolVal = $("#edit-field-nazev-spolecnosti-0-value").val();
        $("#edit-field-spolecnost-0-value").val(spolVal);

        fieldRequired.forEach((el) => {
          $(el).prop("required", true);
          $(el)
            .siblings("label")
            .append("<span class='required-star'> *</span>");
        });
      } else {
        $("#edit-field-spolecnost-0-value").val("");
        fieldRequired.forEach((el) => {
          $(el).prop("required", false);
        });

        $(".required-star").remove();
      }

      fieldToggle.forEach((el) => {
        $(el).toggle();
      });
    });
  });
})(jQuery);

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function animateShow(field, displayType) {
  field.css("display", displayType).hide().fadeIn();
}
