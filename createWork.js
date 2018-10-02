var data;

$(document).ready(function() {
  $("#calendar").fullCalendar({
    defaultView: "agendaWeek",
    allDaySlot: false,
    height: "auto",
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

    // 시간 지정시 업무 추가 modal
    select: function(startTime, endTime) {
      var start = startTime.format("dddd hh:mm");
      var end = endTime.format("dddd hh:mm");
      $("#start-time").text(start.toString());
      $("#end-time").text(end.toString());
      $("#addModal").modal("show");
      $("#add").on("click", function() {
        var Title = $("#work-name").val();
        var Minimum = $("#minimum").val();
        var Event = {
          title: Title,
          minimum: Minimum,
          start: startTime,
          end: endTime
        };
        $("#calendar").fullCalendar("renderEvent", Event);
        $("#add").unbind("click");
        $("#work-name").val("업무");
        $("#minimum").val(1);
        $("#addModal").modal("hide");
      });
      $(".cancle").on("click", function() {
        $("#add").unbind("click");
      });
    },

    // 업무 클릭시 삭제 modal
    eventClick: function(eventObj) {
      $("#deleteModal").modal("show");
      $("#delete").on("click", function() {
        $("#calendar").fullCalendar("removeEvents", eventObj._id);
        $("#delete").unbind("click");
        $("#deleteModal").modal("hide");
      });
      $(".cancle").on("click", function() {
        $("#delete").unbind("click");
      });
    }
  });

  // 저장 버튼 클릭시 제출
  $("#save").on("click", function() {
    $("#submitModal").modal("show");
    $("#submit").on("click", function() {
      var json = JSON.stringify(
        $("#calendar")
          .fullCalendar("clientEvents")
          .map(function(e) {
            var worktable = $("#table_name").val();;
            var startTime = e.start.format("HH:mm");
            var endTime = e.end.format("HH:mm");
            var day = e.start.format("ddd");
            return {
              start: startTime,
              end: endTime,
              day: day,
              worktable: worktable,
              minimum: e.minimum,
              name: e.title
            };
          })
      );
      $.ajax({
        url: "http://0.0.0.0:5009/api/work/add",
        type: "post",
        data: json,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        success: function(xhr, option, error) {
          if (xhr.status == 201) $("#success").show();
        },
        error: function(xhr, option, error) {
          if (xhr.status == 409) $("#warning").show();
          else if (xhr.status == 401) $("#danger").show();
          else alert("...?");
        }
      });
      $("#save").unbind("click");
      $("#submitModal").modal("hide");
      
    });
    $(".cancle").on("click", function() {
      $("#submit").unbind("click");
    });
  });
});

// TODO: 저장기능, 서버연동
