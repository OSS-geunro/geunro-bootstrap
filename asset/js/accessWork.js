$(document).ready(function() {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var id = url.searchParams.get("id");

  $.ajax({
    url: "http://0.0.0.0:5009/api/work/access",
    type: "POST",
    data: {
      worktable_id: id
    },
    dataType: "json",
    success: function(data) {
      $("#calendar").fullCalendar({
        //calendar 설정
        defaultView: "listWeek",
        height: "auto",
        header: false,
        columnHeader: true,
        columnHeaderFormat: "dddd",
        slotLabelFormat: "hh:mm",
        events: data,
        listDayAltFormat: false,
        defaultDate: moment("1970-01-05"),
        timezone: false,
        eventRender: function(event, element) {
          var students = "";
          $.each(data, function() {
            if (this["id"] == event.id) {
              students = this["studentid"];
              $.each(students, function(index, student) {
                element.find(".fc-list-item-title")
                  .append("<br> " + student.id);
              });
            }
          });
        }
      });
    }
  });
});
