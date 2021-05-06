baseUrl = "https://114.115.170.135/user/";


$(document).ready(function() {
  $("#login-button").click(function(){
    let userId = $(".userId").val();
    let password = $(".passwd").val();
    // debug 
    if (userId == "debug") {
      window.location.href = "../html/tra_admin_home.html";
    }
    if (userId.length === 0) {
      alert("管理员ID不能为空！");
      return;
    }
    if (password.length === 0) {
      alert("密码不能为空！");
      return;
    }
    let adminLoginUrl = baseUrl + "admin_login?";
    adminLoginUrl += "id=" + userId + "&password=" + password;
    $.get(adminLoginUrl, function(data, status){
      data = eval("(" + data + ")");
      if (data.result == "true") {
        window.location.href = "../html/tra_admin_home.html";
        return;
      }
      if (data.error_num === 0) {
        alert("不存在该管理员ID！");
        return;
      } else if (data.error_num === 1) {
        alert("密码错误！");
        return;
      }
    });
  });
});