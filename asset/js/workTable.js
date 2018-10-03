$(document).ready(function() {
  $.ajax({
    url: "http://0.0.0.0:5009/api/work/getlist",
    type: "GET",
    dataType: "json",
    success: function(data) {
      $.each(data, function (index, work) {
        var student = ""
        var row = ""
        var btn = ""

        $.each(data[index].students, function (key, students) {
          student = '<tr>'
                    +' <td>' + students.id + '<td/>'
                    +' <td>' + students.exist + '<td/>'
                  + '</tr>'
          row = row.concat(student);
        });
        if(work.allCount == work.existCount){
          btn = '<button id="' +work.workName+ '" type="submit" class="worktable btn btn-primary">보기</button>';
        }
        else{
          btn = '<button id="' +work.workName+ '" type="submit" class="worktable btn btn-primary" disabled>사용불가</button>';
        }

        var workrow = '<tr class="">'
                      + '<td>' + work.workName + '</td>'
                      + '<td>' + work.existCount + "/" + work.allCount + '</td>'
                      + '<td><table><tbody>' + row + '</tbody></table></td>'
                      + '<td>' + btn + '</td>'
                    + '</tr>';
        $('#worktable-list').append(workrow);
      });
    }
  });
  $("table").on("click", "button", function(e) {
    var table = e.target.id
    var data = { worktable: table };
    console.log(data)
    $.ajax({
      url: "http://0.0.0.0:5009/api/work/access",
      type: "post",
      data: data,
      success: function(data) {
        alert("호우")
      },
      error: function(xhr, option, error) {
        alert("?")
      }
    });
  });

});

//TODO: 현재 빠른 제작을 위해 테이블로 구성해놓은 시간표 목록을 카드 혹은 타일 스타일로 바꿔야함