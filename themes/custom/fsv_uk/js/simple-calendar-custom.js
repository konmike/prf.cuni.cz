(function ($) {
  $(document).ready(function () {
    var events = [];
    $("#calendar-container").simpleCalendar({
      months: [
        "leden",
        "únor",
        "březen",
        "duben",
        "květen",
        "červen",
        "červenec",
        "srpen",
        "září",
        "říjen",
        "listopad",
        "prosinec",
      ],
      days: ["ne", "po", "út", "st", "čt", "pá", "so"],
      displayYear: true, // Display year in header
      fixedStartDay: true, // Week begin always by monday or by day set by number 0 = sunday, 7 = saturday, false = month always begin by first day of the month
      displayEvent: true, // Display existing event
      disableEventDetails: false, // disable showing event details
      disableEmptyDetails: true, // disable showing empty date details
      events: [], // List of events
      onInit: function (calendar) {
        let thisMonth = "0" + Number(new Date().getMonth() + 1);
        $("[data-month='" + thisMonth + "']")
          .closest(".events__item")
          .css("display", "flex")
          .hide()
          .fadeIn();
        $(".events__list .events__item").each(function (index, item) {
          let start_date = $(item)
            .find(".events__date")
            .attr("data-start-date");
          let end_date = $(item).find(".events__date").attr("data-end-date");
          let text = $(item)
            .find(".views-field-title > .field-content > a")
            .text();
          let link = $(item)
            .find(".views-field-title > .field-content > a")
            .attr("href");
          // console.log(link);
          let description = '<a href="' + link + '">' + text + "</a>";

          console.log(start_date);
          console.log(end_date);
          console.log(text);
          console.log(link);
          console.log(description);

          let event = {
            startDate: start_date,
            endDate: end_date,
            summary: description,
          };

          events.push(event);
        });

        calendar.setEvents(events);
      }, // Callback after first initialization
      onMonthChange: function (month, year) {
        // console.log(month);
        $(".events__item").hide();
        $("[data-month='" + "0" + (Number(month) + 1) + "']")
          .closest(".events__item")
          .css("display", "flex")
          .hide()
          .fadeIn();
      }, // Callback on month change
      onDateSelect: function (date, events) {}, // Callback on date selection
      onEventSelect: function () {}, // Callback on event selection - use $(this).data('event') to access the event
      onEventCreate: function ($el) {}, // Callback fired when an HTML event is created - see $(this).data('event')
      onDayCreate: function ($el, d, m, y) {}, // Callback fired when an HTML day is created   - see $(this).data('today'), .data('todayEvents')
    });
  });
})(jQuery);
