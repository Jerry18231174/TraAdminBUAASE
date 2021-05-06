baseUrl = "http://114.115.170.135/user/";


$(document).ready(function() {
  if (!localStorage) {
    alert("No localStorage!");
    return;
  }
  let tra_id = localStorage.getItem("examineId");

  let getContentUrl = baseUrl + "get_tra_content?" +
      "id=" + tra_id;

  console.log("Current id: " + tra_id);

  $.ajax({
    url: getContentUrl,
    async: true,
    success: function(data, status) {
      data = eval("(" + data + ")");

      $("#tra-title").text("游记名称：" + data.title);
      $("#tra-full-content").html("游记内容：<p>" + data.content + "</p>");
      $("#tra-author").text("作者ID：" + data.user_id);
      $("#tra-publish-time").text("发布时间：" + data.time);
      $("#tra-publish-site").text("发布地点：(" + Math.floor(data.latitude) + ", " + Math.floor(data.longitude) + ")");
    }
  });

  $("#logout").click(function(){
    window.location.href = "../html/tra_admin_login.html";
  });

  $("#journal-list").click(function(){
    window.location.href = "../html/tra_admin_home.html";
  });

  $("#last-tra").click(function() {
    localStorage.setItem("examineId", (parseInt(tra_id) - 1).toString());
    location.reload();
  });

  $("#next-tra").click(function() {
    localStorage.setItem("examineId", (parseInt(tra_id) + 1).toString());
    location.reload();
  });
});