var data;
var IDs = [];
var worktable;
$(document).ready(function() {
  $("#calendar").fullCalendar({
    //calendar 설정
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
    slotEventOverlap: false,
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
    }
  });

  // 저장 버튼 클릭
  $("#save").on("click", function() {
    $(".alert").hide();
    $("#submitModal").modal("show");

    //등록 버튼 클릭
    $("#submit").on("click", function() {
      IDs = [];
      $("#idlist li").each(function() {
        IDs.push($(this).text());
      });
      //json에 현제 모든 이벤트 저장
      var json = JSON.stringify(
        $("#calendar")
          .fullCalendar("clientEvents")
          .map(function(e) {
            worktable = $("#table_name").val();
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
      if (json == "[]") {
        alert("한 개 이상의 업무를 추가해주세요!");
      } else {
        // 서버 전송
        alert(IDs);
        $.ajax({
          url: "http://0.0.0.0:5009/api/work/add",
          type: "post",
          data: {
            IDs: IDs,
            events: json,
            worktable: worktable
          },
          success: function(xhr, option, error) {},
          error: function(xhr, option, error) {
            if (xhr.status == 409) $("#danger").show();
            else if (xhr.status == 201) {
              $("#submit").unbind("click");
              $("#submitModal").modal("hide");
            }
          }
        });
      }
    });
  });

  $(".cancle").on("click", function() {
    $("#submit").unbind("click");
    $("#delete").unbind("click");
    IDs = [];
  });

  $("#addbutton").click(function() {
    var studentID = $("input[name=StudentID]").val();
    $("input[name=StudentID]").val("");
    $("#idlist").append("<li class='list-group-item'>" + studentID + "</li>");
  });
  $("#idlist").on("dblclick", "li", function() {
    $(this).remove();
  });
});

//TODO: 다음날로 넘어가는 업무 필터링
