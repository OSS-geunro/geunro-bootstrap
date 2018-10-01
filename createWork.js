var data;
// {
//   title: '업무 이름',
//   start: '2015-03-17T13:13:55-0400',
//   end: '2015-03-19T13:13:55-0400'
// }

$(document).ready(function() {
  // page is now ready, initialize the calendar...

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
      
      $('#addModal').modal('show');

      $('#submit').on('click',function(){
          var Title = $('#work-name').val();
          var Event = {
            title: Title,
            minimum:123131,
            start:startTime, 
            end:endTime
          };
          $('#calendar').fullCalendar('renderEvent', Event);
          $('#submit').unbind('click');
          $('#work-name').val("");
          $('#addModal').modal('hide');
      });
    },


  });
});
