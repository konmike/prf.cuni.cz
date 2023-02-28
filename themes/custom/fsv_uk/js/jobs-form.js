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

    let inpDate = document.getElementById("edit-unpublish-on-0-value-date");
    inpDate.value = addDaysToDate();

    inpDate.addEventListener("change", () => {
      let val = inpDate.value;
      if (!checkDate(val)) {
        inpDate.value = addDaysToDate();
      }
    });

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
function checkDate(date) {
  const today = new Date();
  const inputDate = new Date(date);
  const timeDiff = inputDate.getTime() - today.getTime(); // rozdíl času v milisekundách
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // převod milisekund na dny a zaokrouhlení nahoru
  return diffDays <= 30 && diffDays >= 0 ? true : false;
}

//Funkce pripocte 30 dnu k aktualnimu datu.
function addDaysToDate() {
  const today = new Date(); // aktuální datum a čas
  const futureDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000); // nové datum přičtením 30 dnů
  const year = futureDate.getFullYear();
  const month = ("0" + (futureDate.getMonth() + 1)).slice(-2); // měsíc začíná na indexu 0
  const day = ("0" + futureDate.getDate()).slice(-2); // číslo dne v měsíci
  const formattedDate = year + "-" + month + "-" + day; // sestavení datumu ve formátu "YYYY-MM-DD"
  return formattedDate; // vrácení nového data
}
