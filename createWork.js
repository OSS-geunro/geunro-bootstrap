var data;

$(document).ready(function() {
  $("#calendar").fullCalendar({
    defaultView: "agendaWeek",
    allDaySlot: false,
    header: false,
    weekends: false,
    columnHeader: true,
    columnHeaderFormat: "dddd",
    slotLabelFormat: "hh:mm",
    minTime: "09:00:00",
    maxTime: "18:00:00",
    slotDuration: "00:05:00",
    slotLabelInterval: "00:30",
    event: data,
    editable: true,
    selectable: true,
    defaultDate: moment("1970-01-05"),

    select: function(startTime, endTime) {
      var start = startTime.format("dddd hh:mm");
      var end = endTime.format("dddd hh:mm");
      $("#start-time").text(start.toString());
      $("#end-time").text(end.toString());
      $("#addModal").modal("show");
      $("#submit").on("click", function() {
      var Title = $("#work-name").val();
        var Minimum = $("#minimum").val();
        var Event = {
          title: Title,
          minimum: Minimum,
          start: startTime,
          end: endTime
        };
        $("#calendar").fullCalendar("renderEvent", Event);
        $("#submit").unbind("click");
        $("#work-name").val("업무");
        $("#minimum").val(1);
        $("#addModal").modal("hide");
      });
    },

    eventClick: function(eventObj) {
      $("#deleteModal").modal("show");
      $("#delete").on("click", function() {
        $("#calendar").fullCalendar("removeEvents", eventObj._id);
        $("#delete").unbind("click");
        $("#deleteModal").modal("hide");
      });
    }
  });
});

// TODO: 서버연동