$(document).ready(function() {
  $("#submit").click(function() {
    $(".alert").hide();
    var _id = $("#KTISID").val();
    var _pw = $("#Password").val();
    if (_id == "" || _pw == "") {
      alert("아이디와 비밀번호를 입력하세요");
      return;
    }

    var data = { id: _id, pw: _pw };
    $.ajax({
      url: "http://0.0.0.0:5009/api/ktis/toDB",
      type: "post",
      data: data,
      success: function(xhr, option, error) {},
      error: function(xhr, option, error) {
        if (xhr.status == 409) $("#warning").show();
        else if (xhr.status == 401) $("#danger").show();
        else if (xhr.status == 201) $("#success").show();
        else alert("...?");
      }
    });
  });
});
